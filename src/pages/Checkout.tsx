import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import Modal from '../components/Modal';

// Main component para sa Checkout page
const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart(); // Kinukuha yung cart state at dispatch function mula sa CartContext
  const navigate = useNavigate(); // Hook para sa programmatic navigation

  // State para sa lahat ng input fields sa checkout form.
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  // State para malaman kung naglo-load o nagpro-process na ba yung order.
  const [isProcessing, setIsProcessing] = useState(false);
  // State para i-control yung visibility ng order confirmation modal.
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function na nata-trigger pag sinubmit yung form.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Pinipigilan yung default page reload.
    // Sa halip na isubmit agad, bubuksan muna natin yung confirmation modal.
    setIsConfirmModalOpen(true);
  };

  // Function na nata-trigger pag kinonfirm na yung order sa modal.
  const handleConfirmOrder = async () => {
    setIsConfirmModalOpen(false); // Isasara na yung modal.
    setIsProcessing(true); // Umpisahan na yung loading state.

    // DITO MO ILALAGAY YUNG API CALL PARA IPASA YUNG ORDER SA BACKEND
    // Isasama mo dito yung `formData` (customer details) at `state.items` (cart items).
    // Halimbawa: await api.createOrder({ customer: formData, items: state.items });

    // Simulate async payment processing (pansamantala lang ito)
    await new Promise((res) => setTimeout(res, 2000));

    dispatch({ type: 'CLEAR_CART' }); // Lilinisin yung cart pagkatapos ng order.
    toast.success('Order placed successfully! Thank you for your purchase.'); // Magpapakita ng success message.
    navigate('/'); // Ire-redirect pabalik sa home page.
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
        <Header />
        <main className="pt-24 pb-12">
            <div className="container mx-auto px-4 py-20 text-center space-y-6 max-w-7xl">
                <h1 className="text-3xl font-bold text-gray-800">No Items to Checkout</h1>
                <p className="text-gray-600">Add some items to your cart first!</p>
                <Link
                    to="/products"
                    className="inline-flex items-center space-x-3 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700"
                >
                    <span>Browse Products</span>
                </Link>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-10 text-gray-800">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Checkout Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="heading-4 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    className="input-standard"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    className="input-standard"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="input-standard"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    required
                    className="input-standard"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="heading-4 mb-4">Shipping Address</h2>
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  required
                  className="input-standard mb-4"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    className="input-standard"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    className="input-standard"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    required
                    className="input-standard"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="heading-4 mb-4">Payment Information</h2>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  required
                  className="input-standard mb-4"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                    className="input-standard"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    required
                    className="input-standard"
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on Card"
                    required
                    className="input-standard"
                    value={formData.cardName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing…' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-8 h-fit">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.selectedSize} | {item.selectedColor} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(state.total * 0.08).toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${(state.total + 9.99 + state.total * 0.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
       </div>
      </main>

      <Footer />

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Your Order"
      >
        <div>
          <p className="mb-6 text-gray-600">
            Please review your order details below before confirming.
          </p>
          {/* Mini Order Summary */}
          <div className="space-y-2 border-t border-b py-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">$9.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%):</span>
              <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${(state.total + 9.99 + state.total * 0.08).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmOrder}
              className="px-6 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
