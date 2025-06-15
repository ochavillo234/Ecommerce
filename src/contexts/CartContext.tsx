import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Ang reducer function ang may hawak ng lahat ng logic para i-update ang state ng cart.
// Depende sa 'action.type', gagawa ito ng bagong state.
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    // Case para sa pag-add ng item sa cart.
    case 'ADD_TO_CART': {
      // Tinitingnan muna natin kung yung item na ina-add (same ID, size, at color) ay nasa cart na.
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor,
      );

      // Kung nasa cart na, i-uupdate lang natin yung quantity.
      if (existing) {
        const updated = state.items.map((item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
        return { items: updated, total: calcTotal(updated) };
      }
      // Kung wala pa sa cart, idadagdag natin ito as a new item.
      const newItems = [...state.items, action.payload];
      return { items: newItems, total: calcTotal(newItems) };
    }

    // Case para mag-alis ng item sa cart gamit ang ID nito.
    case 'REMOVE_FROM_CART': {
      const filtered = state.items.filter((item) => item.id !== action.payload);
      return { items: filtered, total: calcTotal(filtered) };
    }

    // Case para i-update ang quantity ng isang specific na item.
    case 'UPDATE_QUANTITY': {
      const updated = state.items
        .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
        .filter((item) => item.quantity > 0);
      return { items: updated, total: calcTotal(updated) };
    }

    // Case para linisin o alisin lahat ng laman ng cart.
    case 'CLEAR_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
}

// Helper function para i-calculate ang total price ng lahat ng items sa cart.
function calcTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Ito yung Provider component. Taga-supply ng cart state sa buong app.
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

// Custom hook para mas madaling gamitin ang CartContext sa ibang components.
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
