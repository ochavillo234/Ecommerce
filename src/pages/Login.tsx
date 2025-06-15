import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const success = await login(email, password);
      if (success) navigate('/');
      else setError('Invalid email or password');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-rose-50">
      <Header />
      <div className="pt-32 pb-16">
        <div className="container-bounded">
          <div className="max-w-md mx-auto">
            {/* Login Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-sage-600 to-sage-700 px-8 py-12 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-3xl font-light text-white mb-2">Welcome Back</h1>
                <p className="text-sage-100">Sign in to your account</p>
              </div>
              {/* Form Section */}
              <div className="px-8 py-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        required
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sage-600 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-sage-600 border-gray-300 rounded" />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link to="#" className="text-sm text-sage-600 hover:text-sage-700">
                      Forgot password?
                    </Link>
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-red-400" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-sage-600 to-sage-700 text-white py-4 px-6 rounded-xl hover:from-sage-700 hover:to-sage-800 focus:outline-none focus:ring-2 focus:ring-sage-600 transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium">Sign In</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
                {/* Divider */}
                <div className="mt-8 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="w-full border-2 border-sage-600 text-sage-600 py-4 px-6 rounded-xl hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-600 transition-all flex items-center justify-center space-x-3"
                >
                  <span className="font-medium">Create Account</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            {/* Demo Accounts Info */}
            <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Demo Accounts</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-sage-50 to-sage-100 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Administrator</p>
                    <p className="text-xs text-gray-600">admin@hanbok.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Password</p>
                    <p className="text-sm font-mono text-gray-700">admin123</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Customer</p>
                    <p className="text-xs text-gray-600">user@hanbok.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Password</p>
                    <p className="text-sm font-mono text-gray-700">user123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
