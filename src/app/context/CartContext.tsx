'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CART_ITEM_CONFIG, getItemPrice } from '../constants/product';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateVariant: (id: string, variant: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  shippingAddress: ShippingAddress;
  setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  company: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  billingAddressSame: boolean;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    address: '',
    company: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
    email: '',
    phone: '',
    billingAddressSame: true
  });


  useEffect(() => {
    const savedCart = localStorage.getItem('chorus-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart items - only check for essential fields (no price validation)
        if (Array.isArray(parsedCart) && parsedCart.every(item =>
          item.id && item.name && typeof item.quantity === 'number' && item.quantity > 0 && item.variant !== undefined
        )) {
          // Clean the cart items to ensure no price data is stored
          const cleanedCart = parsedCart.map(item => ({
            id: item.id,
            name: item.name,
            variant: item.variant,
            image: item.image,
            quantity: item.quantity
          }));
          setCartItems(cleanedCart);
        } else {
          const defaultItem = { ...CART_ITEM_CONFIG };
          setCartItems([defaultItem]);
          localStorage.setItem('chorus-cart', JSON.stringify([defaultItem]));
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        const defaultItem = { ...CART_ITEM_CONFIG };
        setCartItems([defaultItem]);
        localStorage.setItem('chorus-cart', JSON.stringify([defaultItem]));
      }
    } else {
      const defaultItem = { ...CART_ITEM_CONFIG };
      setCartItems([defaultItem]);
      localStorage.setItem('chorus-cart', JSON.stringify([defaultItem]));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('chorus-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => 
        cartItem.id === item.id && cartItem.variant === item.variant
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: item.quantity
        };
        return updatedItems;
      } else {
        if (prevItems.length === 1 && prevItems[0].variant === '') {
          return [item];
        }
        return [...prevItems, item];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateVariant = (id: string, variant: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, variant } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('chorus-cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (getItemPrice(item.id) * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };


  

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateQuantity,
    updateVariant,
    clearCart,
    getCartTotal,
    getCartItemCount,
    shippingAddress,
    setShippingAddress
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
