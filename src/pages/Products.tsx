import React, { useEffect, useState } from 'react';
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  ArrowRight,
  Star,
  Heart,
  ShoppingCart,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageWithLoading from '../components/ImageWithLoading';
import { products, categories } from '../data/products';
import type { Product } from '../contexts/CartContext';
import { useCart } from '../contexts/CartContext';

const ProductsPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { dispatch } = useCart();
  const location = useLocation();

  // Handle category and search query parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }

    if (searchParam) {
      setSearchTerm(searchParam);
    } else {
      // Optional: clear search term if not in URL, 
      // or you might want to let the user clear it manually.
      // setSearchTerm(''); 
    }
  }, [location.search]);

  useEffect(() => {
    let fp = [...products];
    if (selectedCategory !== 'All') fp = fp.filter((p) => p.category === selectedCategory);
    if (searchTerm)
      fp = fp.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    fp = fp.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    fp.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setFilteredProducts(fp);
  }, [selectedCategory, searchTerm, sortBy, priceRange]);

  const addToCart = (product: Product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: 1, selectedSize: product.sizes[0], selectedColor: product.colors[0] },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-16">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          {/* Hero */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sage-50 via-transparent to-rose-50 rounded-3xl opacity-50" />
            <div className="relative z-10 py-16">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Our Collection</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Discover our complete range of traditional and modern Korean fashion, carefully crafted for every
                occasion.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:w-80 lg:sticky lg:top-32 lg:self-start ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="lg:hidden p-2 text-gray-500 hover:text-gray-700">
                    ×
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Search</label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left py-3 px-4 rounded-xl transition-all ${
                          selectedCategory === cat
                            ? 'bg-sage-600 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-sage-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={400}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="input-range"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Sort By</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="input-select">
                    <option value="name">Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-sage-50 text-sage-600 rounded-xl hover:bg-sage-100"
                    >
                      <SlidersHorizontal className="h-5 w-5" /> <span>Filters</span>
                    </button>
                    <p className="text-gray-600">
                      <span className="font-medium text-sage-600">{filteredProducts.length}</span> products found
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-xl ${
                        viewMode === 'grid' ? 'bg-sage-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-sage-50'
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-xl ${
                        viewMode === 'list' ? 'bg-sage-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-sage-50'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product, i) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <ImageWithLoading
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          width={400}
                          height={500}
                          className="w-full h-80 group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-rose-600 hover:bg-white shadow-lg">
                            <Heart className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-sage-600 hover:bg-white shadow-lg"
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm rounded-full">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">(4.8)</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-sage-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-medium text-sage-600">${product.price}</span>
                          <Link
                            to={`/products/${product.id}`}
                            className="flex items-center space-x-2 text-sage-600 hover:text-sage-700 group"
                          >
                            <span className="text-sm font-medium">View Details</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProducts.map((product, i) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 hover:shadow-2xl transition-all duration-300 group animate-fade-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
                        <ImageWithLoading
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          width={200}
                          height={250}
                          className="w-full h-48 md:w-40 md:h-52 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-sage-50 text-sage-600 text-xs sm:text-sm rounded-full">
                              {product.category}
                            </span>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, idx) => (
                                  <Star key={idx} className="h-4 w-4 fill-current" />
                                ))}
                              </div>
                              <span className="text-xs sm:text-sm text-gray-500 ml-2">(4.8)</span>
                            </div>
                          </div>
                          <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2 group-hover:text-sage-600 transition-colors">
                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
                            <span className="text-xl md:text-2xl font-medium text-sage-600 mb-3 sm:mb-0">${product.price}</span>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                              <button
                                onClick={() => addToCart(product)}
                                className="px-4 py-2 sm:px-6 sm:py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 flex items-center justify-center space-x-2 text-sm sm:text-base"
                              >
                                <ShoppingCart className="h-5 w-5" /> <span>Add to Cart</span>
                              </button>
                              <Link
                                to={`/products/${product.id}`}
                                className="px-4 py-2 sm:px-6 sm:py-3 border border-sage-600 text-sage-600 rounded-xl hover:bg-sage-50 text-center text-sm sm:text-base"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Search className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-light text-gray-900 mb-4">No products found</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">Try adjusting your search criteria or browse our categories.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                      setPriceRange([0, 400]);
                    }}
                    className="px-8 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700"
                  >
                    Reset Filters
                  </button>
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

export default ProductsPage;
