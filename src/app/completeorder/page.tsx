'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BuyButton from '../components/ui/BuyButton';
import { SHIPPING_CONFIG, TAX_CONFIG, getItemPrice, getItemOriginalPrice } from '../constants/product';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast'
import Footer from '../components/layout/Footer-1';
import DeliveryComponent from '../components/ui/DeliveryComponent';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  company: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  billingAddressSame: boolean;
}

export default function CompleteOrder() {
  const { cartItems, shippingAddress, setShippingAddress } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (getItemPrice(item.id) * item.quantity), 0);
  const shipping = SHIPPING_CONFIG.cost;
  const taxes = subtotal * TAX_CONFIG.rate;

  const handleAddToCart = () => {
    console.log('Proceeding to payment...');
  };

  const handleAddress = () =>{
    if(!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || !shippingAddress.postalCode || !shippingAddress.city || !shippingAddress.state || !shippingAddress.email || !shippingAddress.phone){
      toast.error('Please fill in all the fields');
      return;
    }
    if(shippingAddress.postalCode.length !== 6){
      toast.error('Please enter a valid postal code');
      return;
    }
    if(shippingAddress.phone.length !== 10){
      toast.error('Please enter a valid phone number');
      return;
    }
    if(!shippingAddress.email.includes('@')){
      toast.error('Please enter a valid email');
      return;
    }
    if(!shippingAddress.phone.startsWith('9') && !shippingAddress.phone.startsWith('8') && !shippingAddress.phone.startsWith('7') && !shippingAddress.phone.startsWith('6')){
      toast.error('Please enter a valid phone number');
      return;
    }
    if(shippingAddress.phone.startsWith('0')){
      toast.error('Please enter a valid phone number');
      return;
    }
    if(shippingAddress.phone.includes(' ')){
      toast.error('Please enter a valid phone number');
      return;
    }
    if(shippingAddress.address.length < 8){
      toast.error('Please enter a valid address');
      return;
    }

    else{
      toast.success('Address Confirmed!');
      //toScroll
      
    }

  }

  const handleInputChange = (field: keyof ShippingAddress, value: string | boolean) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add this state and effect at the top of your component
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen is mobile size
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile); // Listen for resize

    return () => window.removeEventListener('resize', checkMobile); // Cleanup
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Column - Forms */}
            <div className="space-y-8">

              {/* Shipping Address Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 text-black manrope-regular-600">
                <h2 className="text-2xl font-koulen font-bold text-gray-900 mb-6 koulen-regular">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      First name*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder='First name'
                      pattern="[A-Za-z]+"
                      value={shippingAddress.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      Last name*
                    </label>
                    <input
                      type="text"
                      required
                      pattern="[A-Za-z]+"
                      placeholder='Last name'
                      value={shippingAddress.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder='Address'
                    pattern="[A-Za-z0-9\s]+"
                    value={shippingAddress.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      Postal code*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder='Postal code'
                      pattern="[0-9]{6}"
                      value={shippingAddress.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder='City'
                      pattern="[A-Za-z]+"
                      value={shippingAddress.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      State / Province*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder='State / Province'
                      pattern="[A-Za-z]+"
                      value={shippingAddress.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      Country*
                    </label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                    >
                      <option value="United States">United States</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div> */}
                </div>

                {/* <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={shippingAddress.billingAddressSame}
                      onChange={(e) => handleInputChange('billingAddressSame', e.target.checked)}
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-md text-gray-700 font-manrope">
                      Billing address same as shipping address
                    </span>
                  </label>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      Email*
                    </label>
                    <input
                      type="email"
                      required
                      placeholder='Email'
                      value={shippingAddress.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block text-md font-medium text-gray-700 font-manrope mb-1">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder='Phone'
                      pattern="[0-9]{10}"
                      value={shippingAddress.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent font-manrope"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleAddress()}
                  className="mt-6 w-full bg-black text-white py-3 px-6 rounded-lg font-semibold font-manrope hover:bg-gray-800 transition-colors koulen-regular"
                >
                  Confirm Address
                </button>
              </div>

              {/* Delivery Section */}
              {!isMobile && <DeliveryComponent />}




            </div>

            {/* Right Column - Cart Summary */}
            <div className="lg:sticky lg:top-18 lg:h-fit">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-koulen font-bold text-gray-900 mb-6">
                  In your Cart
                </h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          fill
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 font-manrope truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-manrope">
                          Variant: {item.variant}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-medium text-gray-900 font-manrope">
                            ₹{getItemPrice(item.id).toFixed(2)}
                          </span>
                          {getItemOriginalPrice(item.id) > getItemPrice(item.id) && (
                            <span className="text-sm text-gray-500 line-through font-manrope">
                              ₹{getItemOriginalPrice(item.id).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-manrope">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900 font-manrope">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-manrope">Shipping</span>
                    <span className="text-sm font-medium text-gray-900 font-manrope">
                      ₹{shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-lg font-bold text-gray-900 font-koulen">Total</span>
                    <span className="text-lg font-bold text-gray-900 font-koulen">
                      ₹{(subtotal + shipping + taxes).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Buy Button */}
                <div className="mt-6">
                  <BuyButton
                    selectedSize={cartItems.length > 0 && cartItems[0].variant ? cartItems[0].variant : ""}
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              </div>

             {isMobile && <DeliveryComponent /> }


            </div>
          </div>
        </div>
      </div>
        {/* For stuff */}
     <Footer />
    </>
  );
}