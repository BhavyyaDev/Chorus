

export const PRODUCT_CONFIG = {
  title: "Salary Aakhon Ka Dhokha Hai",
  description: "This oversized unisex t-shirt featuring a symbol of the daily grind and the illusion of success. The phrase 'Salary Aakhon Ka Dhokha Hai' blends Hindi and English, calling out how we mistake salary for real growth.Crafted from premium 240 GSM French terry cotton, it offers a soft yet structured feel with a relaxed, oversized fit built for comfort, made to make a statement.Made for entrepreneurs, creatives, and anyone choosing purpose over the predictable.",

  price: 1150.00,
  currency: "₹",

  images: [
    { src: "/images/salary ankhon ka studio.png", alt: "Product main view" },
    { src: "/images/salary ankhon ka studio vertical-1.png", alt: "Product side view" },
    { src: "/FrontDesign.png", alt: "Product Front view" },
    { src: "/FrontCloseUp1.png", alt: "Product Front Close up view" },
    { src: "/BackCloseUp1.png", alt: "Product Front Close up view" },
    { src: "/images/salary ankhon ka studio vertical-2.png", alt: "Product back view" },

  ],

  sizes: ["XS","S", "M", "L", "XL","XXL"],

  productInfo: [
    "Premium Quality French Terry Cotton",
    "Oversized Fit",
    "UniSex Design",
  ],

  shippingInfo: [
    "Free shipping on orders above ₹4999",
    "Contact us for international shipping",
    "team@chorus.co.in, +91 8848292868, +91 9060431944, +91 9082393361"
  ],

  payment: {
    amount: 1150,
    currency: 'INR'
  }
};

export const CART_ITEM_CONFIG = {
  id: '1',
  name: PRODUCT_CONFIG.title,
  variant: '',
  image: PRODUCT_CONFIG.images[0].src,
  quantity: 1
};

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  image: string;
  quantity: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemPrice = (itemId: string): number => {
  // For now we only have one product, but this can be extended for multiple products
  return PRODUCT_CONFIG.price;
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getItemOriginalPrice = (itemId: string): number => {
  return PRODUCT_CONFIG.price;
};

export const SHIPPING_CONFIG = {
  cost: 99.00,
  freeShippingThreshold: 4999.00,
  deliveryTime: "1-2 weeks"
};

export const TAX_CONFIG = {
  rate: 0.00, 
  included: true
};
