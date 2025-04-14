import { useState } from "react";
import { PRODUCT_CONFIG, SHIPPING_CONFIG, TAX_CONFIG, getItemPrice } from "../../constants/product";
import { useCart } from "../../context/CartContext";
import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
import { load } from '@cashfreepayments/cashfree-js';


interface buyButtonProps {
  selectedSize: string;
  handleAddToCart: () => void;
}

export default function BuyButton({
  selectedSize,
}: buyButtonProps) {
  const { cartItems, getCartTotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { shippingAddress } = useCart();
  // const router = useRouter(); // Will be used for navigation after payment

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getCartTotal();
  const shipping = SHIPPING_CONFIG.cost;
  const taxes = subtotal * TAX_CONFIG.rate;
  const totalAmount = subtotal + shipping + taxes;

  const handlePayment = async () => {
    // Validation checks
    if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address ||
        !shippingAddress.postalCode || !shippingAddress.city || !shippingAddress.state ||
        !shippingAddress.email || !shippingAddress.phone) {
      toast.error('Please fill in all the shipping address fields');
      return;
    }

    if (totalQuantity > 20) {
      toast.error('You can only buy 20 items at a time');
      return;
    }

    if (shippingAddress.postalCode.length !== 6) {
      toast.error('Please enter a valid 6-digit postal code');
      return;
    }

    if (shippingAddress.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    if (!shippingAddress.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!['9', '8', '7', '6'].some(digit => shippingAddress.phone.startsWith(digit))) {
      toast.error('Please enter a valid Indian phone number');
      return;
    }

    if (shippingAddress.phone.startsWith('0') || shippingAddress.phone.includes(' ')) {
      toast.error('Please enter a valid phone number without spaces or leading zeros');
      return;
    }

    if (totalQuantity === 0) {
      toast.error('Please add items to your cart');
      return;
    }

    if (totalAmount < PRODUCT_CONFIG.payment.amount) {
      toast.error('Minimum order amount not met');
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Submit shipping address to verify
      try {
        const formResponse = await fetch('/api/formSubmit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(shippingAddress),
        });

        const formResult = await formResponse.json();
        if (formResult.success) {
          console.log('Shipping address submitted  successfully');
        } else {
          console.warn('Failed to submit shipping address to verify:', formResult.message);
        }
      } catch (formError) {
        console.warn('Error submitting shipping address to verify:', formError);
        // Don't stop the payment process if form submission fails
      }

      // Step 2: Create order on backend
      const orderPayload = {
        order_amount: totalAmount,
        order_currency: "INR",
        customer_details: {
          customer_id: `customer_${Date.now()}`,
          customer_phone: shippingAddress.phone,
          customer_email: shippingAddress.email,
          customer_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        },
        order_meta: {
          // Additional metadata can be added here
        },
        order_note: `Chorus Salary Series Pre-order - ${cartItems.map(item => `${item.name} (${item.variant})`).join(', ')}`,
      };


      const orderResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await orderResponse.json();

      if (!orderData.success || !orderData.data?.payment_session_id) {
        throw new Error('Payment session ID not received from server');
      }

      const { payment_session_id, order_id } = orderData.data;

      // Step 3: Initialize Cashfree JS SDK
      const cashfree = await load({
        mode: process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox',
      });


      // Step 4: Initiate checkout
      const checkoutOptions = {
        paymentSessionId: payment_session_id,
        redirectTarget: '_self' as const,
      };


      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) {
        console.error('Cashfree checkout error:', result.error);
        toast.error(result.error.message || 'Payment failed at checkout initialization');
        return;
      }

      if (result.redirect) {
        // Store order data for success page
        const receiptData = {
          orderId: order_id,
          paymentId: '', // Will be filled after payment
          amount: totalAmount,
          currency: 'INR',
          customerName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          phone: shippingAddress.phone,
          shippingAddress: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            state: shippingAddress.state,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country || 'India'
          },
          cartItems: cartItems.map(item => ({
            name: item.name,
            variant: item.variant,
            quantity: item.quantity,
            price: getItemPrice(item.id)
          })),
          orderDate: new Date().toISOString()
        };

        sessionStorage.setItem('receiptData', JSON.stringify(receiptData));
        // The browser will automatically redirect to Cashfree's payment page
      }

    } catch (error: unknown) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment initialization failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>

      <button
        onClick={handlePayment}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 font-manrope min-h-[56px] ${(selectedSize)
          ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} `}
        disabled={!selectedSize || isLoading}
      >
        {isLoading ? 'Loading...' : selectedSize ? 'pre-order' : 'SELECT SIZE FIRST'}
      </button>
    </>
  );
}
