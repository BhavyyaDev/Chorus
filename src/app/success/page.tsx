'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Footer from '../components/layout/Footer-1';
import { SHIPPING_CONFIG } from '../constants/product';

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

function SuccessPageContent() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  const submitReceiptData = async (receiptData: ReceiptData) => {
    try {
      const response = await fetch('/api/receiptSubmit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receiptData),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Receipt data submitted ! Thank you for your order!');
      } else {
        console.error('Failed to submit receipt data:', result.message);
      }
    } catch (error) {
      console.error('Error submitting receipt data:', error);
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('receiptData');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);

        // Update payment ID from URL if available (from Cashfree redirect)
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        if (paymentId && !parsedData.paymentId) {
          parsedData.paymentId = paymentId;
          sessionStorage.setItem('receiptData', JSON.stringify(parsedData));
        }

        setReceiptData(parsedData);

        // Submit receipt data to Google Form
        submitReceiptData(parsedData);
      } catch (error) {
        console.error('Error parsing receipt data:', error);
      }
    }

    setLoading(false);

  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 font-manrope">Loading your receipt...</p>
        </div>
      </div>
    );
  }

  if (!receiptData || !orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-koulen text-red-600 mb-4">Order Not Found</h1>
          <p className="text-gray-600 font-manrope mb-6">We couldn&apos;t find your order details.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-6 py-3 rounded-lg font-manrope hover:bg-gray-800 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const subtotal = receiptData.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = SHIPPING_CONFIG.cost;
  const total = receiptData.amount;

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-koulen text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-700 font-manrope">Thank you for your order. Your payment has been processed successfully.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden final-receipt">

            <div className="bg-black text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-koulen mb-2">ORDER RECEIPT</h2>
                  <p className="text-gray-300 font-manrope">CHORUS ENTERPRISE SERIES</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300 font-manrope">Order ID</p>
                  <p className="text-lg font-manrope font-semibold">{receiptData.orderId}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-koulen text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2 text-sm font-manrope">
                    <p><span className="font-semibold">Name:</span> {receiptData.customerName}</p>
                    <p><span className="font-semibold">Email:</span> {receiptData.email}</p>
                    <p><span className="font-semibold">Phone:</span> {receiptData.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-koulen text-gray-900 mb-3">Shipping Address</h3>
                  <div className="text-sm font-manrope text-gray-700">
                    <p>{receiptData.shippingAddress.address}</p>
                    <p>{receiptData.shippingAddress.city}, {receiptData.shippingAddress.state}</p>
                    <p>{receiptData.shippingAddress.postalCode}</p>
                    <p>{receiptData.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-koulen text-gray-900 mb-3">Order Items</h3>
                <div className="border rounded-lg overflow-x-scroll md:overflow-hidden">
                  <table className="w-full overflow-x-scroll">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 font-manrope">Item</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 font-manrope">Size</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 font-manrope">Qty</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 font-manrope">Price</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 font-manrope">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {receiptData.cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-manrope text-gray-900">{item.name}</td>
                          <td className="px-4 py-3 text-sm font-manrope text-gray-600">{item.variant}</td>
                          <td className="px-4 py-3 text-sm font-manrope text-gray-600 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm font-manrope text-gray-600 text-right">{formatCurrency(item.price)}</td>
                          <td className="px-4 py-3 text-sm font-manrope text-gray-900 text-right font-semibold">
                            {formatCurrency(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="max-w-sm ml-auto space-y-2">
                  <div className="flex justify-between text-sm font-manrope">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-manrope">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-gray-900">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-manrope font-semibold">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-koulen text-gray-900 mb-3">Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-manrope">
                  <div>
                    <p><span className="font-semibold">Payment ID:</span> {receiptData.paymentId}</p>
                    <p><span className="font-semibold">Payment Method:</span> Cashfree</p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Order Date:</span> {formatDate(receiptData.orderDate)}</p>
                    <p><span className="font-semibold">Status:</span> <span className="text-green-600 font-semibold">Paid</span></p>
                  </div>
                </div>
              </div>

              {/* Print Button - Only visible on screen, not in print */}
              <div className="border-t pt-6 print:hidden">
                <button
                  onClick={() => {
                    const printContents = document.querySelector('.final-receipt')?.innerHTML;
                    if (printContents) {
                      const printWindow = window.open('', '', 'height=600,width=800');
                      if (printWindow) {
                        printWindow.document.write(`
                          <html>
                            <head>
                              <title>Order Receipt - ${receiptData.orderId}</title>
                              <style>
                                * {
                                  margin: 0;
                                  padding: 0;
                                  box-sizing: border-box;
                                }

                                body {
                                  font-family: 'Arial', sans-serif;
                                  line-height: 1.6;
                                  color: #333;
                                  background: white;
                                  padding: 20px;
                                  font-size: 14px;
                                }

                                .final-receipt {
                                  max-width: 800px;
                                  margin: 0 auto;
                                }

                                h1, h2, h3 {
                                  color: #000;
                                  margin-bottom: 10px;
                                }

                                h1 {
                                  font-size: 28px;
                                  text-align: center;
                                  margin-bottom: 20px;
                                }

                                h2 {
                                  font-size: 22px;
                                  border-bottom: 2px solid #000;
                                  padding-bottom: 5px;
                                }

                                h3 {
                                  font-size: 18px;
                                  margin-top: 20px;
                                  margin-bottom: 10px;
                                }

                                .bg-black {
                                  background: #000 !important;
                                  color: white !important;
                                  padding: 20px;
                                  margin-bottom: 20px;
                                  border-radius: 8px;
                                }

                                .bg-white {
                                  background: white;
                                  border-radius: 8px;
                                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                                  overflow: hidden;
                                }

                                .text-white {
                                  color: white !important;
                                }

                                .grid {
                                  display: grid;
                                }

                                .grid-cols-1 {
                                  grid-template-columns: repeat(1, minmax(0, 1fr));
                                }

                                .md\\:grid-cols-2 {
                                  grid-template-columns: repeat(2, minmax(0, 1fr));
                                }

                                .gap-6 {
                                  gap: 1.5rem;
                                }

                                .gap-4 {
                                  gap: 1rem;
                                }

                                .p-6 {
                                  padding: 1.5rem;
                                }

                                .space-y-6 > * + * {
                                  margin-top: 1.5rem;
                                }

                                .space-y-2 > * + * {
                                  margin-top: 0.5rem;
                                }

                                .mb-3 {
                                  margin-bottom: 0.75rem;
                                }

                                .mb-2 {
                                  margin-bottom: 0.5rem;
                                }

                                .text-lg {
                                  font-size: 1.125rem;
                                }

                                .text-sm {
                                  font-size: 0.875rem;
                                }

                                .font-semibold {
                                  font-weight: 600;
                                }

                                .text-gray-900 {
                                  color: #111827;
                                }

                                .text-gray-700 {
                                  color: #374151;
                                }

                                .text-gray-600 {
                                  color: #4b5563;
                                }

                                .text-green-600 {
                                  color: #059669;
                                }

                                .flex {
                                  display: flex;
                                }

                                .justify-between {
                                  justify-content: space-between;
                                }

                                .items-start {
                                  align-items: flex-start;
                                }

                                .text-right {
                                  text-align: right;
                                }

                                .text-center {
                                  text-align: center;
                                }

                                .text-left {
                                  text-align: left;
                                }

                                table {
                                  width: 100%;
                                  border-collapse: collapse;
                                  margin: 20px 0;
                                  border: 1px solid #ddd;
                                }

                                th, td {
                                  padding: 12px;
                                  text-align: left;
                                  border-bottom: 1px solid #ddd;
                                }

                                th {
                                  background-color: #f8f9fa;
                                  font-weight: bold;
                                  border-bottom: 2px solid #ddd;
                                }

                                .border {
                                  border: 1px solid #d1d5db;
                                }

                                .rounded-lg {
                                  border-radius: 0.5rem;
                                }

                                .overflow-hidden {
                                  overflow: hidden;
                                }

                                .bg-gray-50 {
                                  background-color: #f9fafb;
                                }

                                .divide-y > * + * {
                                  border-top: 1px solid #e5e7eb;
                                }

                                .border-t {
                                  border-top: 1px solid #e5e7eb;
                                }

                                .pt-6 {
                                  padding-top: 1.5rem;
                                }

                                .pt-2 {
                                  padding-top: 0.5rem;
                                }

                                .max-w-sm {
                                  max-width: 24rem;
                                }

                                .ml-auto {
                                  margin-left: auto;
                                }

                                .mt-8 {
                                  margin-top: 2rem;
                                }

                                .mt-2 {
                                  margin-top: 0.5rem;
                                }

                                /* Hide any buttons in print */
                                button, .print\\:hidden {
                                  display: none !important;
                                }

                                @media print {
                                  body {
                                    padding: 0;
                                    font-size: 12px;
                                  }

                                  .final-receipt {
                                    max-width: none;
                                  }

                                  .bg-black {
                                    -webkit-print-color-adjust: exact;
                                    color-adjust: exact;
                                  }
                                }
                              </style>
                            </head>
                            <body>
                              ${printContents}
                            </body>
                          </html>
                        `);
                        printWindow.document.close();
                        printWindow.focus();

                        // Wait for styles to load before printing
                        setTimeout(() => {
                          printWindow.print();
                          printWindow.close();
                        }, 250);
                      }
                    }
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-manrope font-semibold hover:bg-gray-200 transition-colors"
                >
                  Print Receipt
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-black text-gray-100 px-6 py-3 rounded-lg font-manrope font-semibold hover:bg-gray-300 hover:text-black transition-colors mt-4"
                >
                  Back to Home
                </button>
              </div>

            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 font-manrope">
            <p>Further details will be sent to your email before dispatch.</p>
            <p className="mt-2">For any queries, contact us at team@chorus.co.in</p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600 font-manrope">Loading your receipt...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
