import { NextRequest, NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

// Initialize Cashfree with environment-based configuration
const cashfree = new Cashfree(
  process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' 
    ? CFEnvironment.PRODUCTION 
    : CFEnvironment.SANDBOX,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
);

export async function GET(request: NextRequest) {
  
  try {
    const { searchParams } = new URL(request.url);
    const order_id = searchParams.get('order_id');
    
    if (!order_id) {
      console.error("Missing order_id in redirect URL");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?error=missing_order_id`
      );
    }


    // Fetch payment details from Cashfree to verify the payment status
    try {
      const paymentResponse = await cashfree.PGOrderFetchPayments(order_id);
      
      if (paymentResponse.status === 200 && paymentResponse.data && paymentResponse.data.length > 0) {
        const latestPayment = paymentResponse.data[0]; // Get the most recent payment
        

        if (latestPayment.payment_status === 'SUCCESS') {
          // Payment successful - redirect to success page
          const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?orderId=${order_id}&paymentId=${latestPayment.cf_payment_id}`;
          return NextResponse.redirect(successUrl);
          
        } else if (latestPayment.payment_status === 'FAILED') {
          // Payment failed - redirect to failure page
          const failureUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?orderId=${order_id}&reason=payment_failed`;
          return NextResponse.redirect(failureUrl);
          
        } else if (latestPayment.payment_status === 'PENDING') {
          // Payment pending - redirect to pending page or show appropriate message
          const pendingUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-pending?orderId=${order_id}`;
          return NextResponse.redirect(pendingUrl);
          
        } else {
          // Unknown status - redirect to failure page with unknown status
          const unknownUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?orderId=${order_id}&reason=unknown_status&status=${latestPayment.payment_status}`;
          return NextResponse.redirect(unknownUrl);
        }
        
      } else {
        console.error("No payment data found for order:", order_id);
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?orderId=${order_id}&reason=no_payment_data`
        );
      }
      
    } catch (verificationError: any) {
      console.error("Error fetching payment details:", verificationError);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?orderId=${order_id}&reason=verification_error`
      );
    }

  } catch (error: any) {
    console.error('Redirect handler error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?reason=redirect_error`
    );
  }
}

export async function POST(request: NextRequest) {
  
  try {
    const formData = await request.formData();
    const order_id = formData.get('order_id') as string;
    
    if (!order_id) {
      console.error("Missing order_id in POST data");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?error=missing_order_id`
      );
    }

    // Handle POST redirect similar to GET

    try {
      const paymentResponse = await cashfree.PGOrderFetchPayments(order_id);
      
      if (paymentResponse.status === 200 && paymentResponse.data && paymentResponse.data.length > 0) {
        const latestPayment = paymentResponse.data[0];
        
        if (latestPayment.payment_status === 'SUCCESS') {
          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?orderId=${order_id}&paymentId=${latestPayment.cf_payment_id}`
          );
        } else {
          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?orderId=${order_id}&reason=payment_failed`
          );
        }
      } else {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?orderId=${order_id}&reason=no_payment_data`
        );
      }
      
    } catch (verificationError: any) {
      console.error("Error in POST redirect verification:", verificationError);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?orderId=${order_id}&reason=verification_error`
      );
    }

  } catch (error: any) {
    console.error('POST redirect handler error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-failed?reason=redirect_error`
    );
  }
}
