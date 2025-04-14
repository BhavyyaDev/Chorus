'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Footer from '../components/layout/Footer-1';

function PaymentPendingContent() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setOrderId(searchParams.get('orderId'));
  }, [searchParams]);

  const checkPaymentStatus = async () => {
    if (!orderId) return;

    setCheckingStatus(true);
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_id: 'pending_check', // This will be handled by the verify endpoint
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Payment successful, redirect to success page
        router.push(`/success?orderId=${orderId}`);
      } else {
        // Still pending or failed
        alert('Payment is still being processed. Please wait a few more minutes and try again.');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      alert('Unable to check payment status. Please contact support.');
    } finally {
      setCheckingStatus(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-koulen text-gray-900 mb-2">Payment Pending</h1>
            <p className="text-lg text-gray-700 font-manrope">Your payment is being processed. Please wait while we confirm your transaction.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="border-l-4 border-yellow-500 pl-4 mb-6">
              <h2 className="text-xl font-koulen text-gray-900 mb-2">What's happening?</h2>
              <p className="text-gray-700 font-manrope mb-4">
                Your payment is currently being processed by our payment partner. This usually takes a few minutes,
                but can sometimes take longer depending on your bank or payment method.
              </p>
              <p className="text-gray-600 font-manrope text-sm">
                Please do not refresh this page or go back. We&apos;ll automatically update you once the payment is confirmed.
              </p>
            </div>

            {orderId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-koulen text-gray-900 mb-2">Order Information</h3>
                <div className="text-sm font-manrope text-gray-600">
                  <p><span className="font-semibold">Order ID:</span> {orderId}</p>
                  <p><span className="font-semibold">Status:</span> Payment Pending</p>
                  <p><span className="font-semibold">Time:</span> {new Date().toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-koulen text-gray-900 mb-2">What to do next?</h3>
              <div className="text-sm font-manrope text-gray-700">
                <ul className="list-disc list-inside space-y-2">
                  <li>Wait for 5-10 minutes for the payment to process</li>
                  <li>Check your bank account or payment app for any deductions</li>
                  <li>Use the &quot;Check Status&quot; button below to manually verify your payment</li>
                  <li>If payment was deducted but order isn&apos;t confirmed, contact support</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={checkPaymentStatus}
                disabled={checkingStatus || !orderId}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-manrope font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {checkingStatus ? 'Checking...' : 'Check Payment Status'}
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-manrope font-semibold hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div className="text-sm font-manrope">
                <p className="font-semibold text-yellow-800 mb-1">Important Note:</p>
                <p className="text-yellow-700">
                  If money has been deducted from your account but you don&apos;t receive a confirmation,
                  please contact us at <a href="mailto:team@chorus.co.in" className="underline">team@chorus.co.in</a> with your order ID.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 font-manrope">
            <p>Need immediate help? Contact us at team@chorus.co.in</p>
            <p className="mt-2">We&apos;re here to assist you with your order.</p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PaymentPending() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPendingContent />
    </Suspense>
  );
}
