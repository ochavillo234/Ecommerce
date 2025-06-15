import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add('menu-open');
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('menu-open');
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setSearchOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMenuOpen]);

  const categories = [
    { name: 'Casual', href: '/products?category=Casual' },
    { name: 'Wedding', href: '/products?category=Wedding' },
    { name: 'Children', href: '/products?category=Children' },
    { name: 'Modern', href: '/products?category=Modern' },
    { name: 'Accessories', href: '/products?category=Accessories' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-out">
        <div className={`transition-all duration-700 ease-out ${isScrolled ? 'py-2' : 'py-6'}`}>
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <div
              className={`relative transition-all duration-700 ease-out ${
                isScrolled
                  ? 'bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20'
                  : 'bg-transparent'
              } ${isScrolled ? 'px-8 py-4' : 'px-0 py-0'}`}
            >
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 group relative z-10">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 flex items-center justify-center transition-all duration-500 ${
                        isScrolled ? 'bg-sage-600 rounded-xl' : 'bg-sage-600 rounded-lg'
                      } group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <span className="text-white font-medium text-xl">한</span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-sage-600 to-rose-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur" />
                  </div>
                  <div className="hidden md:block">
                    <h1 className="text-xl font-light tracking-wide text-gray-900 group-hover:text-sage-600 transition-colors">
                      Hanbok Elegance
                    </h1>
                  </div>
                </Link>

                {/* Center Navigation - Desktop Only */}
                <nav className="hidden lg:flex items-center space-x-2">
                  <Link
                    to="/"
                    className="px-6 py-3 text-gray-700 hover:text-sage-600 transition-all duration-300 relative group"
                  >
                    <span className="relative z-10">Home</span>
                    <div className="absolute inset-0 bg-sage-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </Link>

                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('collection')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to="/products"
                      className="px-6 py-3 text-gray-700 hover:text-sage-600 transition-all duration-300 relative group flex items-center space-x-1"
                    >
                      <span className="relative z-10">Collection</span>
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                      <div className="absolute inset-0 bg-sage-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </Link>
                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 z-50 ${
                        activeDropdown === 'collection'
                          ? 'opacity-100 translate-y-0 visible'
                          : 'opacity-0 -translate-y-4 invisible'
                      }`}
                    >
                      <div className="p-2">
                        {categories.map((category, index) => (
                          <Link
                            key={category.name}
                            to={category.href}
                            className="block px-4 py-3 text-gray-700 hover:text-sage-600 hover:bg-sage-50 rounded-xl transition-all duration-200"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/cart"
                    className="px-6 py-3 text-gray-700 hover:text-sage-600 transition-all duration-300 relative group"
                  >
                    <span className="relative z-10">Cart</span>
                    <div className="absolute inset-0 bg-sage-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-3 text-gray-700 hover:text-sage-600 hover:bg-sage-50 rounded-full transition-all duration-300"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>

                  {/* Wishlist */}
                  <button
                    className="hidden"
                    aria-label="Wishlist"
                  >
                    <Heart className="h-5 w-5" />
                  </button>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    className="hidden"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {state.items.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse">
                        {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </Link>

                  {/* User Menu */}
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <Link
                        to="/profile"
                        className="p-3 text-gray-700 hover:text-sage-600 hover:bg-sage-50 rounded-full transition-all duration-300"
                        aria-label="Profile"
                      >
                        <User className="h-5 w-5" />
                      </Link>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="bg-gradient-to-r from-sage-600 to-sage-700 text-white py-2 px-4 rounded-full text-sm hover:from-sage-700 hover:to-sage-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="text-sm text-gray-700 hover:text-sage-600 transition-colors hidden md:block"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Link
                        to="/login"
                        className="text-gray-700 hover:text-sage-600 transition-colors hidden md:block"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="bg-gradient-to-r from-sage-600 to-sage-700 text-white py-2 px-6 rounded-full text-sm hover:from-sage-700 hover:to-sage-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Register
                      </Link>
                    </div>
                  )}

                  {/* Mobile Menu Button */}
                  <button
                    className="lg:hidden p-3 text-gray-700 hover:text-sage-600 hover:bg-sage-50 rounded-full transition-all duration-300 relative z-50"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Overlay */}
          {searchOpen && (
            <div
              className={`absolute inset-x-0 top-full mt-4 mx-auto max-w-2xl px-4 transition-all duration-500 transform z-40 ${
                searchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
              }`}
            >
              <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/products?search=${encodeURIComponent(searchText)}`);
                    setSearchOpen(false);
                  }}
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all text-lg"
                      autoFocus={searchOpen}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setSearchOpen(false);
                      }}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                      aria-label="Close search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 lg:hidden z-50" id="mobile-menu">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
          <div
            ref={menuRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Sidebar Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
              <Link to="/" className="flex items-center space-x-3" onClick={closeMenu}>
                <div className="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-medium text-lg">한</span>
                </div>
                <h1 className="text-lg font-light tracking-wide text-gray-900">Hanbok Elegance</h1>
              </Link>
              <button
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Content */}
            <nav className="flex-1 p-6 space-y-2">
              <Link
                to="/"
                className="block text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                onClick={closeMenu}
              >
                All Products
              </Link>

              <div className="py-2">
                <p className="text-sm text-gray-500 uppercase tracking-wider px-4 mb-2">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="block text-gray-700 hover:text-sage-600 py-2 px-4 rounded-xl hover:bg-sage-50 transition-all"
                    onClick={closeMenu}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/cart"
                className="flex items-center justify-between text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                onClick={closeMenu}
              >
                <span>Shopping Cart</span>
                {state.items.length > 0 && (
                  <span className="h-6 w-6 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
                    {state.items.length}
                  </span>
                )}
              </Link>

              <div className="border-t border-gray-100 pt-4 mt-4">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                      onClick={closeMenu}
                    >
                      Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="block text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                        onClick={closeMenu}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="block w-full text-left text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block text-lg font-light text-gray-800 hover:text-sage-600 py-3 px-4 rounded-xl hover:bg-sage-50 transition-all"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
              <div className="h-8" />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
