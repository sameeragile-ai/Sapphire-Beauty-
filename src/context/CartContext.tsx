import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { siteConfig } from '../data/siteConfig';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  type: 'treatment' | 'product';
  quantity: number;
  image: string;
  meta?: string; // duration for treatments, volume for products
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  lastAddedItem: CartItem | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'CLEAR_TOAST' };

const STORAGE_KEY = 'sapphire_beauty_cart_v1';

function getInitialState(): CartState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        items: Array.isArray(parsed) ? parsed : [],
        isDrawerOpen: false,
        lastAddedItem: null,
      };
    }
  } catch {
    // Graceful fallback if storage fails
  }
  return { items: [], isDrawerOpen: false, lastAddedItem: null };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex((i) => i.id === action.payload.id);
      const qtyToAdd = action.payload.quantity || 1;
      let newItems: CartItem[];
      let targetItem: CartItem;

      if (existingIndex > -1) {
        newItems = state.items.map((item, idx) => {
          if (idx === existingIndex) {
            targetItem = { ...item, quantity: item.quantity + qtyToAdd };
            return targetItem;
          }
          return item;
        });
      } else {
        targetItem = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          originalPrice: action.payload.originalPrice,
          type: action.payload.type,
          quantity: qtyToAdd,
          image: action.payload.image,
          meta: action.payload.meta,
        };
        newItems = [...state.items, targetItem];
      }

      return {
        ...state,
        items: newItems,
        lastAddedItem: targetItem!,
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'OPEN_DRAWER':
      return {
        ...state,
        isDrawerOpen: true,
      };

    case 'CLOSE_DRAWER':
      return {
        ...state,
        isDrawerOpen: false,
      };

    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };

    case 'CLEAR_TOAST':
      return {
        ...state,
        lastAddedItem: null,
      };

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  lastAddedItem: CartItem | null;
  giftRemaining: number;
  hasFreeGift: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  clearToast: () => void;
  generateWhatsAppLink: () => string;
  generateMailtoLink: () => string;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);
  const [justAddedAnimation, setJustAddedAnimation] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // storage quota or private browsing
    }
  }, [state.items]);

  // Handle toast timeout
  useEffect(() => {
    if (state.lastAddedItem) {
      setJustAddedAnimation(true);
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_TOAST' });
        setJustAddedAnimation(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.lastAddedItem]);

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const giftRemaining = Math.max(0, siteConfig.freeGiftThreshold - subtotal);
  const hasFreeGift = subtotal >= siteConfig.freeGiftThreshold;

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const openDrawer = () => dispatch({ type: 'OPEN_DRAWER' });
  const closeDrawer = () => dispatch({ type: 'CLOSE_DRAWER' });
  const toggleDrawer = () => dispatch({ type: 'TOGGLE_DRAWER' });
  const clearToast = () => dispatch({ type: 'CLEAR_TOAST' });

  const generateWhatsAppLink = () => {
    if (state.items.length === 0) {
      return `https://wa.me/447904994275?text=${encodeURIComponent(
        'Hi Sapphire Beauty! I would like to enquire about booking an appointment at your Kings Chase studio.'
      )}`;
    }

    const itemsSummary = state.items
      .map((item) => `• ${item.name} x${item.quantity} (£${(item.price * item.quantity).toFixed(2)})`)
      .join('\n');

    const giftText = hasFreeGift ? '\n🎁 Qualified for Free Brow & Lash Spoolie Gift!' : '';

    const message = `Hi Sapphire Beauty! I would like to book the following treatments / aftercare:\n\n${itemsSummary}\n\nTotal: £${subtotal.toFixed(2)}${giftText}\n\nWhat appointment dates & times do you have available at Kings Chase? Thank you!`;

    return `https://wa.me/447904994275?text=${encodeURIComponent(message)}`;
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent('Booking Request – Sapphire Beauty Kingschase');
    const itemsSummary = state.items
      .map((item) => `- ${item.name} x${item.quantity} (£${(item.price * item.quantity).toFixed(2)})`)
      .join('\n');

    const body = encodeURIComponent(
      `Hi Sapphire Beauty,\n\nI would like to request an appointment for:\n${itemsSummary}\n\nTotal Estimated: £${subtotal.toFixed(2)}\n\nPreferred Date & Time: [Please specify]\nName: [Your name]\nPhone Number: [Your number]\n\nThank you!`
    );

    return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        isDrawerOpen: state.isDrawerOpen,
        lastAddedItem: state.lastAddedItem,
        giftRemaining,
        hasFreeGift,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        clearToast,
        generateWhatsAppLink,
        generateMailtoLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
