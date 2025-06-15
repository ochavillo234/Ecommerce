import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Artistic Wave Separator */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-32"
          style={{ fill: '#f8f9fa' }}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <div className="bg-gray-50 pt-40 pb-16 relative">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section - Expanded */}
            <div className="lg:col-span-5">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-sage-600 to-sage-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-medium text-2xl">한</span>
                </div>
                <div>
                  <h3 className="text-2xl font-light tracking-wide text-gray-900">Hanbok Elegance</h3>
                  <p className="text-gray-500 text-sm">Traditional Korean Fashion</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Bringing traditional Korean fashion to the modern world with elegance and style. Each piece celebrates
                the rich heritage of Korean craftsmanship while embracing contemporary design.
              </p>

             
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-medium text-gray-900 mb-6">Quick Links</h4>
              <div className="space-y-4">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'All Products', href: '/products' },
                  { name: 'Shopping Cart', href: '/cart' },
                  { name: 'About Us', href: '#' },
                  { name: 'Contact', href: '#' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-gray-600 hover:text-sage-600 transition-all duration-300 group flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-sage-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900 mb-6">Categories</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Casual', category: 'Casual' },
                    { name: 'Wedding', category: 'Wedding' },
                    { name: 'Children', category: 'Children' },
                    { name: 'Modern', category: 'Modern' },
                    { name: 'Accessories', category: 'Accessories' },
                  ].map((link) => (
                    <Link
                      key={link.name}
                      to={{ pathname: '/products', search: `?category=${encodeURIComponent(link.category)}` }}
                      className="block text-gray-600 hover:text-sage-600 transition-all duration-300 group flex items-center space-x-2"
                    >
                      <span className="w-1 h-1 bg-sage-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span>{link.name}</span>
                      
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact & Social */}
            <div className="lg:col-span-4">
              <h4 className="text-lg font-medium text-gray-900 mb-6">Get in Touch</h4>

              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sage-50 rounded-xl flex items-center justify-center group-hover:bg-sage-100 transition-colors">
                      <Mail className="h-5 w-5 text-sage-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">info@hanbokelegance.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                      <Phone className="h-5 w-5 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium">(555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center group-hover:bg-gold-100 transition-colors">
                      <MapPin className="h-5 w-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 font-medium">Seoul, South Korea</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-4">Follow Us</h5>
                <div className="flex space-x-3">
                  {[
                    { name: 'Instagram', color: 'from-pink-500 to-purple-600' },
                    { name: 'Facebook', color: 'from-blue-600 to-blue-700' },
                    { name: 'Twitter', color: 'from-sky-500 to-blue-600' },
                    { name: 'Pinterest', color: 'from-red-500 to-pink-600' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`group relative w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <span className="text-sm font-medium">{social.name.charAt(0)}</span>
                      <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <p className="text-gray-500 text-sm">© {currentYear} Hanbok Elegance. Made with</p>
                <Heart className="h-4 w-4 text-rose-500 fill-current" />
                <p className="text-gray-500 text-sm">in Seoul</p>
              </div>

              <div className="flex items-center space-x-6">
                <Link to="#" className="text-gray-500 hover:text-sage-600 transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="#" className="text-gray-500 hover:text-sage-600 transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link to="#" className="text-gray-500 hover:text-sage-600 transition-colors text-sm">
                  Shipping Info
                </Link>
                <Link to="#" className="text-gray-500 hover:text-sage-600 transition-colors text-sm">
                  Returns
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-sage-100 to-rose-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-gold-100 to-sage-100 rounded-full opacity-20 blur-2xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
