import React, { useEffect, useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Gift,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import type { CartItem } from '../contexts/CartContext';
import ImageWithLoading from '../components/ImageWithLoading';

// Dummy items for demo when cart empty
const dummyCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Daily Comfort Hanbok',
    price: 89.99,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Casual',
    description: 'Perfect for everyday wear with modern comfort and traditional elegance.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Blue', 'White', 'Purple'],
    quantity: 2,
    selectedSize: 'M',
    selectedColor: 'Pink',
  },
  {
    id: '6',
    name: 'Royal Wedding Hanbok',
    price: 299.99,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Wedding',
    description: 'Luxurious wedding hanbok with intricate embroidery.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gold', 'Red', 'Royal Blue', 'Emerald'],
    quantity: 1,
    selectedSize: 'L',
    selectedColor: 'Gold',
  },
  {
    id: '21',
    name: 'Traditional Hair Pin Set',
    price: 25.99,
    image: '/placeholder.svg?height=400&width=300',
    category: 'Accessories',
    description: 'Beautiful traditional Korean hair pins with floral motifs.',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold', 'Antique Bronze'],
    quantity: 3,
    selectedSize: 'One Size',
    selectedColor: 'Gold',
  },
];

const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // initialise cart with dummy data (demo only)
  useEffect(() => {
    if (state.items.length === 0) {
      dummyCartItems.forEach((item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
    setCartItems(state.items.length > 0 ? state.items : dummyCartItems);
  }, [state.items, dispatch]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-sage-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="h-16 w-16 text-sage-600" />
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-6">Your cart is empty</h1>
              <p className="text-xl text-gray-600 mb-8">Discover our beautiful collection of traditional Korean fashion.</p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-3 bg-sage-600 text-white py-4 px-8 rounded-xl hover:bg-sage-700 transition-all duration-300 group"
              >
                <span>Start Shopping</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
  
      <div className="pt-32 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Shopping Cart</h1>
            <p className="text-xl text-gray-600">Review your selected items and proceed to checkout</p>
          </div>
  
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 relative group">
                      <ImageWithLoading
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        width={150}
                        height={200}
                        className="w-32 h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            to={`/products/${item.id}`}
                            className="text-base md:text-lg font-medium text-gray-900 hover:text-sage-600"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.selectedColor} / {item.selectedSize}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full flex-shrink-0"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-lg mb-3 sm:mb-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-l-lg"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1 text-center w-12 sm:w-16 text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-r-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-lg font-medium text-gray-900 self-end sm:self-center">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-32">
                <h2 className="text-2xl font-medium text-gray-900 mb-8">Order Summary</h2>
  
                {/* Promo Code */}
                <div className="promo-container">
                  <div className="flex items-center mb-3">
                    <Gift className="h-5 w-5 text-sage-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">Promo Code</span>
                  </div>
                  <div className="promo-input-group">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="promo-input"
                    />
                    <button onClick={applyPromoCode} className="promo-button">
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-3 flex items-center">
                      <span className="mr-1">✓</span>WELCOME10 applied - 10% off!
                    </p>
                  )}
                </div>
  
                {/* Price Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-medium text-gray-900">Total</span>
                      <span className="text-2xl font-medium text-sage-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
  
                {/* Free Shipping Notice */}
                {subtotal < 100 && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-700">Add ${(100 - subtotal).toFixed(2)} more for free shipping!</p>
                  </div>
                )}
  
                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-sage-600 to-sage-700 text-white py-4 px-6 rounded-xl hover:from-sage-700 hover:to-sage-800 transition-all duration-300 flex items-center justify-center space-x-3 group shadow-lg hover:shadow-xl"
                >
                  <span className="text-lg font-medium">Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
  
                <Link
                  to="/products"
                  className="w-full mt-4 bg-transparent border border-sage-600 text-sage-600 py-4 px-6 rounded-xl hover:bg-sage-50 transition-all duration-300 flex items-center justify-center space-x-3 group"
                >
                  <span>Continue Shopping</span>
                </Link>
  
                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-green-600 text-lg">✓</span>
                      </div>
                      <p className="text-sm text-gray-600">Free Returns</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-blue-600 text-lg">🔒</span>
                      </div>
                      <p className="text-sm text-gray-600">Secure Payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Recommended Products (static demo only) */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-6">You might also like</h2>
              <p className="text-lg text-gray-600">Complete your Korean fashion collection</p>
            </div>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Elegant Evening Hanbok',
                  price: 199.99,
                  category: 'Modern',
                  image: '/placeholder.svg?height=400&width=300',
                },
                {
                  name: 'Traditional Silk Jeogori',
                  price: 149.99,
                  category: 'Wedding',
                  image: '/placeholder.svg?height=400&width=300',
                },
                {
                  name: 'Contemporary Chima',
                  price: 129.99,
                  category: 'Casual',
                  image: '/placeholder.svg?height=400&width=300',
                },
                {
                  name: 'Artisan Hair Ornament',
                  price: 39.99,
                  category: 'Accessories',
                  image: '/placeholder.svg?height=400&width=300',
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  to="/products"
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithLoading
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      width={300}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-sage-600 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-medium text-sage-600">${item.price}</span>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sage-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  );
};

export default CartPage;
