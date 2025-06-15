import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Star,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Info,
  Ruler,
  Palette,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageWithLoading from '../components/ImageWithLoading';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === id);

  const categoryKorean: Record<string, string> = {
    Casual: '일상복',
    Wedding: '혼례복',
    Children: '아동복',
    Modern: '현대적',
    Accessories: '액세서리',
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-bounded section-spacing text-center space-y-8 pt-32 pb-16">
          <div className="w-32 h-32 bg-gradient-to-br from-sage-100 to-rose-100 rounded-full flex items-center justify-center mx-auto">
            <Info className="h-16 w-16 text-sage-600" />
          </div>
          <h1 className="text-3xl font-light">Product not found</h1>
          <Link to="/products" className="btn-primary inline-flex items-center space-x-3">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Collection</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = [
    product.image,
    '/placeholder.svg?height=800&width=600',
    '/placeholder.svg?height=800&width=600',
  ];
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity, selectedSize, selectedColor },
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container-bounded pt-32 pb-16">
        {/* Breadcrumb */}
        <div className="mb-12">
          <nav className="flex items-center space-x-3 text-sm">
            <Link to="/" className="text-gray-500 hover:text-sage-600">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/products" className="text-gray-500 hover:text-sage-600">Products</Link>
            <span className="text-gray-300">/</span>
            <Link to={`/products?category=${product.category}`} className="text-gray-500 hover:text-sage-600">
              {product.category}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
          <Link to="/products" className="inline-flex items-center space-x-2 mt-6 text-sage-600 hover:text-sage-700 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Collection</span>
          </Link>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Gallery */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="aspect-[4/5] relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-50 to-rose-50">
                <ImageWithLoading
                  src={productImages[selectedImageIndex] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <button
                    onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                    disabled={selectedImageIndex === 0}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white disabled:opacity-50"
                  >
                    <ArrowLeft className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center">
                  <button
                    onClick={() => setSelectedImageIndex(Math.min(productImages.length - 1, selectedImageIndex + 1))}
                    disabled={selectedImageIndex === productImages.length - 1}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white disabled:opacity-50"
                  >
                    <ArrowRight className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <span className="text-sm font-medium text-gray-800">
                    {categoryKorean[product.category]} • {product.category}
                  </span>
                </div>
                <div className="absolute top-6 right-6">
                  <button
                    onClick={() => setIsWishlisted((w) => !w)}
                    className={`p-3 rounded-full border ${
                      isWishlisted
                        ? 'bg-rose-600 border-rose-600 text-white'
                        : 'bg-white/90 border-white/20 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-[4/5] overflow-hidden rounded-xl ${
                    selectedImageIndex === idx
                      ? 'ring-3 ring-sage-600 ring-offset-2'
                      : 'hover:opacity-80 hover:ring-2 hover:ring-sage-300 hover:ring-offset-1'
                  }`}
                >
                  <ImageWithLoading src={img || '/placeholder.svg'} alt={product.name} className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-10">
            <h1 className="heading-1 text-left">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-900">4.8</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">124 reviews</span>
            </div>
            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-light text-sage-600">${product.price}</span>
            </div>
            <p className="body-large leading-relaxed">{product.description}</p>
            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="heading-4 flex items-center space-x-2">
                <Ruler className="h-5 w-5 text-sage-600" /> <span>Size</span>
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-4 px-3 border-2 rounded-xl text-center ${
                      selectedSize === s ? 'border-sage-600 bg-sage-600 text-white' : 'border-gray-200 hover:bg-sage-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {/* Color */}
            <div className="space-y-4">
              <h3 className="heading-4 flex items-center space-x-2">
                <Palette className="h-5 w-5 text-sage-600" /> <span>Color</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`py-4 px-6 border-2 rounded-xl text-left ${
                      selectedColor === c ? 'border-rose-600 bg-rose-600 text-white' : 'border-gray-200 hover:bg-rose-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            {/* Quantity */}
            <div className="space-y-4">
              <h3 className="heading-4">Quantity</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-4 text-gray-600 hover:bg-sage-50">
                    <Minus className="h-5 w-5" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 py-4 text-center font-medium bg-transparent border-0"
                  />
                  <button onClick={() => setQuantity(quantity + 1)} className="p-4 text-gray-600 hover:bg-sage-50">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: <span className="font-medium text-sage-600">${(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>
            {/* Actions */}
            <div className="space-y-4 pt-6">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-8 rounded-xl font-medium text-lg flex items-center justify-center space-x-3 ${
                  isAddedToCart ? 'bg-green-600 text-white' : 'bg-sage-600 text-white hover:bg-sage-700'
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
                <span>{isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}</span>
              </button>
              <button className="w-full py-4 px-8 border-2 border-sage-600 text-sage-600 rounded-xl font-medium text-lg hover:bg-sage-50">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-sage-200/50">
                <Sparkles className="h-5 w-5 text-sage-600" />
                <span className="text-sm font-medium text-sage-600 tracking-wide">YOU MIGHT ALSO LIKE</span>
              </div>
              <h2 className="heading-2">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((rp, idx) => (
                <Link
                  key={rp.id}
                  to={`/products/${rp.id}`}
                  className="group card card-hover"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithLoading
                      src={rp.image || '/placeholder.svg'}
                      alt={rp.name}
                      width={400}
                      height={500}
                      className="w-full h-64 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="badge">{rp.category}</span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-rose-600 hover:bg-white shadow-lg">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i2) => (
                            <Star key={i2} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="caption">(4.8)</span>
                      </div>
                      <h3 className="heading-4 group-hover:text-sage-600 transition-colors line-clamp-2">{rp.name}</h3>
                      <p className="body line-clamp-2">{rp.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-medium text-sage-600">${rp.price}</span>
                      <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sage-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
