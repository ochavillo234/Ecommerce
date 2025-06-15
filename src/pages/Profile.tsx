import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag, LogOut, ChevronRight, Edit3, Save, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import ImageWithLoading from '../components/ImageWithLoading';

// Types for Order History
interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  userId: string; // To link orders to a user
  date: string;
  total: number;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  items: OrderItem[];
}

// Mock database of orders
const mockOrders: Order[] = [
  {
    id: 'ORD-12345',
    userId: '2', // Belongs to Regular User
    date: '2023-10-28',
    total: 179.98,
    status: 'Delivered',
    items: [
      { name: 'Daily Comfort Hanbok', image: '/hanbok-1.jpg', quantity: 1, price: 89.99 },
      { name: 'Royal Wedding Hanbok', image: '/hanbok-2.jpg', quantity: 1, price: 89.99 },
    ],
  },
  {
    id: 'ORD-12344',
    userId: '2', // Belongs to Regular User
    date: '2023-09-15',
    total: 89.99,
    status: 'Delivered',
    items: [{ name: 'Modern Fusion Hanbok', image: '/hanbok-3.jpg', quantity: 1, price: 89.99 }],
  },
  {
    id: 'ORD-12342',
    userId: '2', // Belongs to Regular User
    date: '2023-08-01',
    total: 25.99,
    status: 'Cancelled',
    items: [{ name: 'Traditional Hair Pin Set', image: '/accessory-1.jpg', quantity: 1, price: 25.99 }],
  },
    {
    id: 'ORD-ADMIN-001',
    userId: '1', // Belongs to Admin User
    date: '2023-11-01',
    total: 150.50,
    status: 'Delivered',
    items: [
        { name: 'Ceremonial Silk Hanbok', image: '/hanbok-4.jpg', quantity: 1, price: 120.00 },
        { name: 'Matching Norigae Tassel', image: '/accessory-2.jpg', quantity: 1, price: 30.50 },
    ],
  },
];

const ProfilePage: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);


  useEffect(() => {
    setFormData(user);
  }, [user]);

  // Fetch order history
  useEffect(() => {
    if (user) {
      setIsLoadingOrders(true);
      // Simulate API call
      setTimeout(() => {
        const userOrders = mockOrders.filter((order) => order.userId === user.id);
        setOrders(userOrders);
        setIsLoadingOrders(false);
      }, 1500); // Simulate network delay
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return null;

      const currentAddress = prev.address || {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      };

      return {
        ...prev,
        address: {
          ...currentAddress,
          [name]: value,
        },
      };
    });
  };

  const handleSave = () => {
    if (formData) {
      updateUser(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-16 text-center">
          <p className="text-xl text-gray-600 mb-8">Please log in to view your profile.</p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-3 bg-sage-600 text-white py-4 px-8 rounded-xl hover:bg-sage-700 transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-16 bg-gray-50/50">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-32">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <ImageWithLoading
                      src={user.profilePicture || '/placeholder-user.svg'}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <nav className="space-y-2">
                  <button
                     onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'profile' ? 'bg-sage-100 text-sage-700' : 'hover:bg-gray-100'
                    }`}>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5" />
                      <span>My Profile</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                     className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'orders' ? 'bg-sage-100 text-sage-700' : 'hover:bg-gray-100'
                    }`}>
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="h-5 w-5" />
                      <span>Order History</span>
                    </div>
                     <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 space-y-12">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-medium text-gray-900">Profile Information</h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 text-sm font-medium text-sage-600 hover:text-sage-700"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-4">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 text-sm font-medium text-white bg-sage-600 px-4 py-2 rounded-lg hover:bg-sage-700"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-sm font-medium text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p>{user.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p>{user.phone || 'Not provided'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Address</p>
                        <p>
                          {user.address
                            ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}`
                            : 'Not provided'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                        <input type="text" name="name" value={formData?.name || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                        <input type="email" name="email" value={formData?.email || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100" disabled />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                        <input type="text" name="phone" value={formData?.phone || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Street Address</label>
                        <input type="text" name="street" value={formData?.address?.street || ''} onChange={handleAddressChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                        <input type="text" name="city" value={formData?.address?.city || ''} onChange={handleAddressChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">State / Province</label>
                        <input type="text" name="state" value={formData?.address?.state || ''} onChange={handleAddressChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Zip / Postal Code</label>
                        <input type="text" name="zip" value={formData?.address?.zip || ''} onChange={handleAddressChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
                        <input type="text" name="country" value={formData?.address?.country || ''} onChange={handleAddressChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-medium text-gray-900">Recent Orders</h3>
                    <Link to="#" className="text-sm font-medium text-sage-600 hover:text-sage-700">View All</Link>
                  </div>
                  <div className="space-y-4">
                    {isLoadingOrders ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Loading order history...</p>
                      </div>
                    ) : orders.length > 0 ? (
                      orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                            className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                          >
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center text-left">
                              <div className="mb-2 sm:mb-0 sm:mr-6">
                                <p className="font-semibold text-gray-800">Order ID: {order.id}</p>
                                <p className="text-sm text-gray-500">Date: {order.date}</p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <p className="text-lg font-medium text-gray-900">${order.total.toFixed(2)}</p>
                                <span
                                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                                    order.status === 'Delivered'
                                      ? 'bg-green-100 text-green-700'
                                      : order.status === 'Cancelled'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                            <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedOrder === order.id && (
                            <div className="p-4 bg-white">
                              <h4 className="font-semibold mb-3 text-gray-800">Order Details</h4>
                              <ul className="space-y-3">
                                {order.items.map((item, index) => (
                                  <li key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                      <ImageWithLoading src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                      <div>
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                      </div>
                                    </div>
                                    <p className="font-medium text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">You have no recent orders.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
