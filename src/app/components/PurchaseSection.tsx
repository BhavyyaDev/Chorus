'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { PRODUCT_CONFIG, CART_ITEM_CONFIG } from '../constants/product';
import { useCart } from '../context/CartContext';


interface ProductImage {
  src: string;
  alt: string;
}

interface PurchaseProps {
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: ProductImage[];
  sizes?: string[];
  productInfo?: string[];
  shippingInfo?: string[];
}

const PurchaseSection: React.FC<PurchaseProps> = ({
  title = PRODUCT_CONFIG.title,
  description = PRODUCT_CONFIG.description,
  price = PRODUCT_CONFIG.price,
  currency = PRODUCT_CONFIG.currency,
  images = PRODUCT_CONFIG.images,
  sizes = PRODUCT_CONFIG.sizes,
  productInfo = PRODUCT_CONFIG.productInfo,
  shippingInfo = PRODUCT_CONFIG.shippingInfo
}) => {
  const { addToCart, updateQuantity, updateVariant, cartItems } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [showProductInfo, setShowProductInfo] = useState<boolean>(false);
  const [showShippingInfo, setShowShippingInfo] = useState<boolean>(false);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

  // Touch gesture support
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    // Update cart with selected size
    updateVariant(CART_ITEM_CONFIG.id, size);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      // Update cart with new quantity
      updateQuantity(CART_ITEM_CONFIG.id, newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    // Create cart item with current selections
    const cartItem = {
      ...CART_ITEM_CONFIG,
      variant: selectedSize,
      quantity: quantity
    };

    // Add to cart
    addToCart(cartItem);

    window.location.href = '/completeorder';
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Auto-scroll thumbnail into view on mobile
  useEffect(() => {
    const thumbnailContainer = document.querySelector('.mobile-thumbnails');
    const activeThumbnail = document.querySelector('.mobile-thumbnail-active');

    if (thumbnailContainer && activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedImageIndex]);

  // Load cart data on component mount
  useEffect(() => {
    const currentCartItem = cartItems.find(item => item.id === CART_ITEM_CONFIG.id);
    if (currentCartItem) {
      setQuantity(currentCartItem.quantity);
      setSelectedSize(currentCartItem.variant);
    }
  }, [cartItems]);

  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">

          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              ref={imageRef}
              className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden relative group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={images[selectedImageIndex]?.src}
                alt={images[selectedImageIndex]?.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 select-none"
                draggable={false}
              />
              {/* Mobile Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:hidden">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'bg-white shadow-lg'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Swipe Hint for Mobile */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 lg:hidden">
                  <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    Swipe
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'border-black shadow-md'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Mobile Thumbnail Scroll - Visible only on mobile */}
            <div className="lg:hidden">
              <div className="mobile-thumbnails flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'border-black shadow-md mobile-thumbnail-active'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6 lg:space-y-8">
            {/* Product Title */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-koulen font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-manrope">
                {showFullDescription ? description : description.slice(0, 100)+ '...'}
                { !showFullDescription && <button onClick={() => setShowFullDescription(!showFullDescription)} className='text-black font-bold cursor-pointer'>Read More</button>}
              </p>
            </div>



            {/* Price */}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-thin text-gray-900 manrope-regular ">
              {currency}{price.toFixed(2)}
            </div>

            {/* Size Chart */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-manrope">
                SIZE CHART
              </h3>

              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-gray-900">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-koulen text-base font-semibold">Size</th>
                        <th className="text-center py-3 px-4 font-koulen text-base font-semibold">XS</th>
                        <th className="text-center py-3 px-4 font-koulen text-base font-semibold">S</th>
                        <th className="text-center py-3 px-4 font-koulen text-base font-semibold">M</th>
                        <th className="text-center py-3 px-4 font-koulen text-base font-semibold">L</th>
                        <th className="text-center py-3 px-4 font-koulen text-base font-semibold">XL</th>
                        <th className="text-center py-3 px-4 font-koulen text-base font-semibold">XXL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 font-manrope font-semibold text-gray-700">CHEST</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">38</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">40</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">42</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">44</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">46</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">48</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-manrope font-semibold text-gray-700">LENGTH</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">25.5</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">26.5</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">27.5</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">28.5</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">29.5</td>
                        <td className="text-center py-3 px-4 font-manrope text-gray-600">30.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Size Chart Note */}
                <div className="mt-4 text-center">
                  <p className="text-sm font-manrope text-gray-500">
                    All measurements are in inches. For best fit,<br /> measure your chest and compare with the chart above.
                  </p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-manrope">
                SELECT YOUR PREFERENCE
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`py-3 px-4 border-2 rounded-lg text-center font-medium transition-all duration-200 font-manrope min-h-[48px] ${
                      selectedSize === size
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700 hover:shadow-sm'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-gray-500 font-manrope">
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-manrope">
                QUANTITY
              </h3>
              <div className="flex items-center space-x-4 text-black">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <FaMinus className="text-sm" color='black' />
                </button>
                <span className="text-xl font-medium w-12 text-center font-manrope">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <FaPlus className="text-sm" color='black' />
                </button>
              </div>
            </div>

            {/* Go completion page meow  */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 font-manrope min-h-[56px] ${
                  selectedSize
                    ? 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedSize}
              >
                {selectedSize ? 'pre-order' : 'SELECT SIZE FIRST'}
              </button>


              {/* Total Price Display */}
              <div className="flex justify-between items-center text-sm text-gray-600 font-manrope">
                <span>Total ({quantity} item{quantity > 1 ? 's' : ''})</span>
                <span className="font-semibold text-gray-900">
                  {currency}{(price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <button
                onClick={() => setShowProductInfo(!showProductInfo)}
                className="w-full flex justify-between items-center py-3 text-left"
              >
                <span className="text-lg font-semibold text-gray-900 font-manrope">
                  Product Information
                </span>
                <FaPlus
                  className={`text-sm text-black transition-transform duration-200 ${
                    showProductInfo ? 'rotate-45' : ''
                  }`}
                />
              </button>
              {showProductInfo && (
                <div className="space-y-2 pb-4">
                  {productInfo.map((info, index) => (
                    <p key={index} className="text-gray-600 text-sm font-manrope">
                      • {info}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 border-t pt-4">
              <button
                onClick={() => setShowShippingInfo(!showShippingInfo)}
                className="w-full flex justify-between items-center py-3 text-left"
              >
                <span className="text-lg font-semibold text-gray-900 font-manrope">
                  Contact Us
                </span>
                <FaPlus
                  className={`text-sm text-black transition-transform duration-200 ${
                    showShippingInfo ? 'rotate-45' : ''
                  }`}
                />
              </button>
              {showShippingInfo && (
                <div className="space-y-2 pb-4">
                  {shippingInfo.map((info, index) => (
                    <p key={index} className="text-gray-600 text-sm font-manrope">
                      • {info}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSection;
