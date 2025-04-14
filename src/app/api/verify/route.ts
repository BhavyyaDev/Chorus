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
    const {
      order_id,
      payment_id,
    } = await request.json();

    if (!order_id) {
      return NextResponse.json({
        success: false,
        error: 'Missing order_id'
      }, { status: 400 });
    }


    // Fetch payment details from Cashfree to verify
    const paymentResponse = await cashfree.PGOrderFetchPayments(order_id);

    if (paymentResponse.status === 200 && paymentResponse.data && paymentResponse.data.length > 0) {
      const payments = paymentResponse.data;

      // If payment_id is provided, find specific payment
      if (payment_id && payment_id !== 'pending_check') {
        const payment = payments.find((p: any) => p.cf_payment_id === payment_id);

        if (payment) {

          if (payment.payment_status === 'SUCCESS') {
            return NextResponse.json({
              success: true,
              payment_status: payment.payment_status,
              payment_id: payment.cf_payment_id,
              amount: payment.payment_amount
            });
          } else {
            return NextResponse.json({
              success: false,
              payment_status: payment.payment_status,
              message: `Payment status is ${payment.payment_status}`
            });
          }
        } else {
          return NextResponse.json({
            success: false,
            error: 'Payment not found'
          }, { status: 404 });
        }
      } else {
        // No specific payment_id provided, check the latest payment
        const latestPayment = payments[0]; // Payments are usually ordered by creation time

        if (latestPayment.payment_status === 'SUCCESS') {
          return NextResponse.json({
            success: true,
            payment_status: latestPayment.payment_status,
            payment_id: latestPayment.cf_payment_id,
            amount: latestPayment.payment_amount
          });
        } else {
          return NextResponse.json({
            success: false,
            payment_status: latestPayment.payment_status,
            message: `Payment status is ${latestPayment.payment_status}`
          });
        }
      }
    } else {
      console.error(`No payment data found for order ${order_id}`);
      return NextResponse.json({
        success: false,
        error: 'No payment data found'
      }, { status: 404 });
    }

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({
      success: false,
      error: 'Verification failed',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}