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

export async function POST(request: NextRequest) {
  
  try {
    const webhookData = await request.json();

    // Extract relevant information from webhook
    const { 
      order_id, 
      payment_id, 
      payment_status, 
      payment_amount,
      payment_currency,
      payment_time,
      payment_method 
    } = webhookData.data || webhookData;

    if (!order_id || !payment_id) {
      console.error("Missing order_id or payment_id in webhook data");
      return NextResponse.json({
        success: false,
        error: 'Missing order_id or payment_id'
      }, { status: 400 });
    }

    // Verify the payment with Cashfree to ensure authenticity
    try {
      const paymentResponse = await cashfree.PGOrderFetchPayments(order_id);
      
      if (paymentResponse.status === 200 && paymentResponse.data) {
        const payments = paymentResponse.data;
        const payment = payments.find((p: any) => p.cf_payment_id === payment_id);

        if (payment) {
          

          // Here you can add your business logic:
          // - Update database with payment status
          // - Send confirmation emails
          // - Update inventory
          // - Trigger fulfillment processes

          if (payment.payment_status === 'SUCCESS') {
            
          } else if (payment.payment_status === 'FAILED') {
            console.log(`Payment failed for order ${order_id}`);
            
          }

          return NextResponse.json({ 
            success: true, 
            message: "Webhook processed successfully" 
          });
        } else {
          console.error("Payment not found in Cashfree response");
          return NextResponse.json({
            success: false,
            error: 'Payment not found'
          }, { status: 404 });
        }
      } else {
        console.error("Failed to fetch payment details from Cashfree");
        return NextResponse.json({
          success: false,
          error: 'Failed to verify payment'
        }, { status: 500 });
      }
    } catch (verificationError: any) {
      console.error("Payment verification error:", verificationError);
      return NextResponse.json({
        success: false,
        error: 'Payment verification failed'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({
      success: false,
      error: 'Webhook processing failed'
    }, { status: 500 });
  }
}

// Handle GET requests (for webhook verification if needed)
export async function GET(request: NextRequest) {
  
  // Some payment gateways send verification requests via GET
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get('challenge');
  
  if (challenge) {
    // Return the challenge for webhook verification
    return NextResponse.json({ challenge });
  }
  
  return NextResponse.json({ 
    message: "Cashfree webhook endpoint is active",
    timestamp: new Date().toISOString()
  });
}
