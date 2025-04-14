'use client';
import React from 'react';
import Footer from '../components/layout/Footer-1';

export default function CancellationsAndRefunds() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-koulen text-gray-900 mb- text-center">
              Cancellations and Refunds
            </h1>

            <div className="prose prose-lg max-w-none font-manrope text-gray-700 leading-relaxed">
              <p className="mb-8 text-lg">
                Chorus believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Cancellation Policy</h2>

              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-koulen text-gray-900 mb-3">General Cancellations</h3>
                <p className="mb-4">
                  Cancellations will be considered only if the request is made within <strong>1-2 days of placing the order</strong>. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-koulen text-gray-900 mb-3">Perishable Items</h3>
                <p className="mb-4">
                  Chorus does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                </p>
              </div>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Refund Policy</h2>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Damaged or Defective Items</h3>
              <p className="mb-4">
                In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within <strong>1-2 days of receipt of the products</strong>.
              </p>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Product Not as Expected</h3>
              <p className="mb-4">
                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within <strong>1-2 days of receiving the product</strong>. The Customer Service Team after looking into your complaint will take an appropriate decision.
              </p>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Warranty Items</h3>
              <p className="mb-6">
                In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
              </p>

              <div className="bg-green-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-koulen text-gray-900 mb-3">Refund Processing</h3>
                <p className="text-lg font-semibold text-green-800">
                  In case of any Refunds approved by Chorus, it&rsquo;ll take <strong>6-8 days</strong> for the refund to be processed to the end customer.
                </p>
              </div>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">How to Request Cancellation or Refund</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <ol className="list-decimal pl-6 space-y-3">
                  <li>Contact our customer service team immediately</li>
                  <li>Provide your order number and reason for cancellation/refund</li>
                  <li>For damaged items, include photos as evidence</li>
                  <li>Our team will review and respond within 24-48 hours</li>
                </ol>
              </div>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Important Notes</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li>All refund requests are subject to verification and approval</li>
                <li>Refunds will be processed to the original payment method</li>
                <li>Shipping charges are non-refundable unless the item was damaged or defective</li>
                <li>Custom or personalized items may not be eligible for refunds</li>
              </ul>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-koulen text-gray-900 mb-3">Contact Customer Service</h3>
                <p className="mb-4">
                  For all cancellation and refund requests, please contact us:
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:team@chorus.co.in" className="text-blue-600 hover:text-blue-800">team@chorus.co.in</a><br />
                  <strong>Phone:</strong> <a href="tel:8848292868" className="text-blue-600 hover:text-blue-800">8848292868</a><br />
                  <strong>Address:</strong> 4th cross Naidu layout Electronic City phase 1, doddathogur, electronic city phase 1, 560100 Bangalore (Room No: 402)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
