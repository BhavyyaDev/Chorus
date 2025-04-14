'use client';
import React from 'react';
import Footer from '../components/layout/Footer-1';

export default function ContactUs() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-koulen text-gray-900 mb-4 text-center">
              Contact Us
            </h1>

            <div className="prose prose-lg max-w-none font-manrope text-gray-700 leading-relaxed">
              <p className="mb-8 text-center text-xl">
                You may contact us using the information below:
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-koulen text-gray-900 mb-4">Business Information</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">Merchant Legal Entity Name:</h3>
                      <p>Chorus</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Registered Address:</h3>
                      <p>4th cross Naidu layout Electronic City phase 1, doddathogur, electronic city phase 1, 560100 Bangalore (Room No: 402)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-koulen text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">Telephone No:</h3>
                      <p  className='flex flex-col' >
                        <a href="tel:8848292868" className="text-blue-600 hover:text-blue-800 transition-colors">
                          8848292868
                        </a>

                        <a href="tel:9082393361" className="text-blue-600 hover:text-blue-800 transition-colors">
                          9082393361
                        </a>
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">E-Mail ID:</h3>
                      <p>
                        <a href="mailto:team@chorus.co.in" className="text-blue-600 hover:text-blue-800 transition-colors">
                          team@chorus.co.in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <h2 className="text-2xl font-koulen text-gray-900 mb-4">Get In Touch</h2>
                <p className="mb-4">
                  We&rsquo;re here to help! Whether you have questions about our products, need assistance with your order, or want to provide feedback, don&rsquo;t hesitate to reach out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:team@chorus.co.in"
                    className="bg-black text-white px-6 py-3 rounded-lg font-manrope hover:bg-gray-800 transition-colors inline-block"
                  >
                    Send Email
                  </a>
                  <a
                    href="tel:8848292868"
                    className="bg-white text-black border border-black px-6 py-3 rounded-lg font-manrope hover:bg-gray-50 transition-colors inline-block"
                  >
                    Call Us
                  </a>
                </div>
              </div>

              <div className="mt-8 text-center">
                <h2 className="text-2xl font-koulen text-gray-900 mb-4">Business Hours</h2>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                  Saturday: 10:00 AM - 4:00 PM IST<br />
                  Sunday: Closed
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
