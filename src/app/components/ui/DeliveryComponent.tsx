export default function DeliveryComponent() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-3">
                  <h1 className='text-2xl font-koulen font-bold text-gray-900 mb-3' >Detials</h1>

                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-md font-koulen font-md text-gray-900">
                    Delivery
                  </h2>
                  {/* <button
                    onClick={() => setActiveSection('shipping')}
                    className="text-blue-600 text-md font-manrope hover:underline"
                  >
                    Edit
                  </button> */}
                </div>
                <p className="text-gray-600 text-xs font-manrope">
                  Standard delivery (2-3 weeks)
                </p>
                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-md font-koulen font-md text-gray-900">
                    Review
                  </h2>
                  {/* <button
                    onClick={() => setActiveSection('payment')}
                    className="text-blue-600 text-md font-manrope hover:underline"
                  >
                    Edit
                  </button> */}
                </div>
                <p className="text-gray-600 text-xs font-manrope">
                  Please review your order details before completing your purchase.
                </p>

                <div className="flex items-center justify-between mt-2">
                  <h2 className="text-md font-koulen font-md text-gray-900">
                    Payment
                  </h2>
                  {/* <button
                    onClick={() => setActiveSection('delivery')}
                    className="text-blue-600 text-md font-manrope hover:underline"
                  >
                    Edit
                  </button> */}
                </div>
                <p className="text-gray-600 text-xs font-manrope">
                  Payment will be processed securely via Cashfree
                </p>

              </div>
  );
}