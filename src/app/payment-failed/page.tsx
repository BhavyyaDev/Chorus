'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Footer from '../components/layout/Footer-1';

function PaymentFailedContent() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setOrderId(searchParams.get('orderId'));
    setReason(searchParams.get('reason'));
    setStatus(searchParams.get('status'));
  }, [searchParams]);

  const getErrorMessage = () => {
    switch (reason) {
      case 'payment_failed':
        return 'Your payment could not be processed. Please try again.';
      case 'missing_order_id':
        return 'Order information is missing. Please start a new order.';
      case 'no_payment_data':
        return 'Payment information could not be retrieved. Please contact support.';
      case 'verification_error':
        return 'Payment verification failed. Please contact support if amount was debited.';
      case 'redirect_error':
        return 'An error occurred during payment processing. Please try again.';
      case 'unknown_status':
        return `Payment status is unclear (${status}). Please contact support.`;
      default:
        return 'Payment failed due to an unknown error. Please try again.';
    }
  };

  const getRecommendedAction = () => {
    switch (reason) {
      case 'payment_failed':
        return 'You can try again with a different payment method or card.';
      case 'missing_order_id':
      case 'redirect_error':
        return 'Please go back to the product page and start a new order.';
      case 'no_payment_data':
      case 'verification_error':
      case 'unknown_status':
        return 'If money was debited from your account, please contact our support team with your order details.';
      default:
        return 'Please try placing your order again or contact support if you need assistance.';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-koulen text-gray-900 mb-2">Payment Failed</h1>
            <p className="text-lg text-gray-700 font-manrope">We&apos;re sorry, but your payment could not be completed.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="border-l-4 border-red-500 pl-4 mb-6">
              <h2 className="text-xl font-koulen text-gray-900 mb-2">What happened?</h2>
              <p className="text-gray-700 font-manrope mb-4">{getErrorMessage()}</p>
              <p className="text-gray-600 font-manrope text-sm">{getRecommendedAction()}</p>
            </div>

            {orderId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-koulen text-gray-900 mb-2">Order Information</h3>
                <div className="text-sm font-manrope text-gray-600">
                  <p><span className="font-semibold">Order ID:</span> {orderId}</p>
                  {reason && <p><span className="font-semibold">Error Type:</span> {reason.replace(/_/g, ' ')}</p>}
                  {status && <p><span className="font-semibold">Payment Status:</span> {status}</p>}
                  <p><span className="font-semibold">Time:</span> {new Date().toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-koulen text-gray-900 mb-2">Need Help?</h3>
              <div className="text-sm font-manrope text-gray-700">
                <p className="mb-2">If you&apos;re experiencing issues or if money was debited from your account, please contact us:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Email: <a href="mailto:team@chorus.co.in" className="text-blue-600 hover:underline">team@chorus.co.in</a></li>
                  <li>Include your order ID: <span className="font-mono bg-gray-200 px-1 rounded">{orderId || 'Not available'}</span></li>
                  <li>Mention the time of transaction and payment method used</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/completeorder')}
                className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-manrope font-semibold hover:bg-gray-800 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-manrope font-semibold hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 font-manrope">
            <p>For immediate assistance, contact us at team@chorus.co.in</p>
            <p className="mt-2">We apologize for any inconvenience caused.</p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PaymentFailed() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentFailedContent />
    </Suspense>
  );
}
