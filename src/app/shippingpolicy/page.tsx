'use client';
import React from 'react';
import Footer from '../components/layout/Footer-1';

export default function ShippingPolicy() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-koulen text-gray-900 mb-4 text-center">
              Shipping Policy
            </h1>

            <div className="prose prose-lg max-w-none font-manrope text-gray-700 leading-relaxed">
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-koulen text-gray-900 mb-4">Important Notice</h2>
                <p className="text-lg font-semibold text-blue-800">
                  This is a pre-order page. All orders will be shipped once the products are ready for dispatch.
                </p>
              </div>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Shipping Information</h2>
              <p className="mb-6">
                At Chorus, we are committed to delivering your orders safely and efficiently. Please review our shipping policy below to understand our processes and timelines.
              </p>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Processing Time</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Pre-orders: Items will be processed and shipped once production is complete</li>
                <li>Regular orders: 1-3 business days processing time</li>
                <li>Custom orders: 5-7 business days processing time</li>
              </ul>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Shipping Methods & Delivery Times</h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Standard Shipping</h4>
                    <p className="text-sm text-gray-600 mb-2">₹99 shipping fee</p>
                    {/* <p>5-7 business days delivery</p> */}
                  </div>
                  {/* <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Express Shipping</h4>
                    <p className="text-sm text-gray-600 mb-2">₹199 shipping fee</p>
                    <p>2-3 business days delivery</p>
                  </div> */}
                </div>
              </div>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Shipping Coverage</h3>
              <p className="mb-4">We currently ship to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>All major cities in India</li>
                <li>Metro areas with standard delivery</li>
                <li>Remote areas (additional 2-3 days may apply)</li>
              </ul>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Order Tracking</h3>
              <p className="mb-6">
                Once your order is shipped, you will receive a tracking number via email and SMS. You can track your package using this number on our website or the courier partner&rsquo;s website.
              </p>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Delivery Guidelines</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Please ensure someone is available to receive the package during delivery hours</li>
                <li>Valid ID proof may be required for delivery verification</li>
                <li>If delivery is unsuccessful, the courier will attempt redelivery</li>
                <li>After 3 unsuccessful attempts, the package will be returned to our warehouse</li>
              </ul>

              <h3 className="text-xl font-koulen text-gray-900 mt-6 mb-3">Damaged or Lost Packages</h3>
              <p className="mb-4">
                If your package arrives damaged or is lost during transit:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Contact us immediately at team@chorus.co.in</li>
                <li>Provide your order number and photos of damaged items</li>
                <li>We will arrange for replacement</li>
              </ul>

              <div className="bg-yellow-50 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-koulen text-gray-900 mb-3">Contact for Shipping Queries</h3>
                <p className="mb-2">
                  For any shipping-related questions, please contact us:
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:team@chorus.co.in" className="text-blue-600 hover:text-blue-800">team@chorus.co.in</a><br />
                  <strong>Phone:</strong> <a href="tel:8848292868" className="text-blue-600 hover:text-blue-800">8848292868</a>
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
