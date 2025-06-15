import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProfilePage from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReportsPage from './pages/admin/Reports';
import AdminProductsPage from "./pages/admin/AdminProducts";
import OrdersPage from "./pages/admin/Orders";
import UsersPage from "./pages/admin/Users";
import AdminLayout from './pages/admin/AdminLayout';
import { Toaster } from './components/Toaster';
import './globals.css';

// Dito nagsisimula ang ating React application.
// Kinukuha natin yung 'root' na div mula sa index.html at doon natin ire-render ang buong app.
createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        {/* Ang AuthProvider ay nagbibigay ng access sa user authentication state (sino ang naka-login) sa lahat ng child components. */}
        <AuthProvider>
      {/* Ang CartProvider naman ay para sa state ng shopping cart. */}
      <CartProvider>
        {/* Ang BrowserRouter ang nag-e-enable ng page routing sa ating application. */}
        <BrowserRouter>
          {/* Ang Toaster component ay para sa pag-display ng mga toast notifications (galing sa sonner library). */}
          <Toaster />
          {/* Dito sa loob ng <Routes> natin ide-define lahat ng URL paths ng ating site. */}
          <Routes>
            {/* Ito yung route group para sa mga public pages (Home, Products, etc.). */}
            {/* Lahat ng routes sa loob nito ay magkakaroon ng parehong layout (Header at Footer) dahil sa <RootLayout />. */}
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Ito naman yung route group para sa admin panel. */}
            {/* Lahat ng routes dito ay magsisimula sa /admin at magkakaroon ng sariling layout (AdminLayout) na may sidebar. */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
