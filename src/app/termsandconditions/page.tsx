'use client';
import React from 'react';
import Footer from '../components/layout/Footer-1';

export default function TermsAndConditions() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 text-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-koulen text-gray-900 mb-4 text-center">
              Terms and Conditions
            </h1>

            <div className="prose prose-lg max-w-none font-manrope text-gray-700 leading-relaxed">
              <p className="mb-6">
                For the purpose of these Terms and Conditions, the term &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo; used anywhere on this page shall mean Chorus whose registered/operational office is 4th cross Naidu layout Electronic City phase 1, doddathogur, electronic city phase 1, 560100 Bangalore (Room No: 402). &ldquo;you&rdquo;, &ldquo;your&rdquo;, &ldquo;user&rdquo;, &ldquo;visitor&rdquo; shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
              </p>

              <p className="mb-8 font-semibold">
                Your use of the website and/or purchase from us are governed by following Terms and Conditions:
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Website Content</h2>
              <p className="mb-6">
                The content of the pages of this website is subject to change without notice. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Use of Information</h2>
              <p className="mb-6">
                Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Intellectual Property</h2>
              <p className="mb-6">
                Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions. All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Unauthorized Use</h2>
              <p className="mb-6">
                Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">External Links</h2>
              <p className="mb-6">
                From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information. You may not create a link to our website from another website or document without Chorus&rsquo;s prior written consent.
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Governing Law</h2>
              <p className="mb-6">
                Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
              </p>

              <h2 className="text-2xl font-koulen text-gray-900 mt-8 mb-4">Payment Authorization</h2>
              <p className="mb-6">
                We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h2 className="text-2xl font-koulen text-gray-900 mb-4">Contact Information</h2>
                <p className="mb-2">
                  For any questions regarding these Terms and Conditions, please contact us:
                </p>
                <p>
                  <strong>Address:</strong> 4th cross Naidu layout Electronic City phase 1, doddathogur, electronic city phase 1, 560100 Bangalore (Room No: 402)<br />
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
