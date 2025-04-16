import { NextRequest, NextResponse } from 'next/server';

interface ReceiptData {
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  cartItems: Array<{
    name: string;
    variant: string;
    quantity: number;
    price: number;
  }>;
  orderDate: string;
}

export async function POST(request: NextRequest) {
  try {
    const receiptData: ReceiptData = await request.json();

    const shippingAddressString = `${receiptData.shippingAddress.address}, ${receiptData.shippingAddress.city}, ${receiptData.shippingAddress.state} ${receiptData.shippingAddress.postalCode}, ${receiptData.shippingAddress.country}`;

    const cartItemsString = receiptData.cartItems.map(item => 
      `${item.name} (${item.variant}) - Qty: ${item.quantity} - ₹${item.price}`
    ).join('; ');

    const orderDate = new Date(receiptData.orderDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const formData = new URLSearchParams({
      'entry.1265888245': receiptData.orderId,
      'entry.373103599': receiptData.paymentId,
      'entry.1729150486': receiptData.amount.toString(),
      'entry.1513129698': receiptData.currency,
      'entry.1535854518': receiptData.customerName,
      'entry.534247158': receiptData.email,
      'entry.2053689856': receiptData.phone,
      'entry.1341219274': shippingAddressString,
      'entry.807710620': cartItemsString,
      'entry.743752568': orderDate,
    });

    const response = await fetch(
      'https://docs.google.com/forms/d/e/1FAIpQLSdPBCpP45Pjm3mI86C_JcR13SBfBnCVv6MX3-cYOnYRfeGIsQ/formResponse',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (response.status === 200 || response.status === 302) {
      return NextResponse.json({
        message: 'Receipt data submitted successfully',
        success: true
      }, { status: 200 });
    } else {
      console.error('Google Forms receipt submission failed:', response.status, response.statusText);
      return NextResponse.json({
        message: 'Failed to submit receipt data',
        success: false
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error submitting receipt data:', error);
    return NextResponse.json({
      message: 'Error submitting receipt data',
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 });
  }
}
