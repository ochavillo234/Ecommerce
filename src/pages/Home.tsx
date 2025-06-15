import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Sparkles, Users, Crown, Baby, Palette, Gem } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import ImageWithLoading from '../components/ImageWithLoading';

interface Category {
  name: string;
  korean: string;
  image: string;
  description: string;
  color: string;
  bgGradient: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  productCount: number;
  featured: boolean;
}

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 6);

  const categories: Category[] = [
    {
      name: 'Casual',
      korean: '일상복',
      image: '/placeholder.svg?height=600&width=500',
      description: 'Modern comfort meets traditional grace for everyday elegance',
      color: 'var(--sage-600)',
      bgGradient: 'from-sage-50 to-sage-100',
      icon: Users,
      productCount: products.filter((p) => p.category === 'Casual').length,
      featured: true,
    },
    {
      name: 'Wedding',
      korean: '혼례복',
      image: '/placeholder.svg?height=600&width=500',
      description: "Ceremonial elegance for life's most precious moments",
      color: 'var(--rose-600)',
      bgGradient: 'from-rose-50 to-rose-100',
      icon: Crown,
      productCount: products.filter((p) => p.category === 'Wedding').length,
      featured: true,
    },
    {
      name: 'Children',
      korean: '아동복',
      image: '/placeholder.svg?height=600&width=500',
      description: 'Adorable traditional wear designed for little ones',
      color: 'var(--gold-600)',
      bgGradient: 'from-gold-50 to-gold-100',
      icon: Baby,
      productCount: products.filter((p) => p.category === 'Children').length,
      featured: false,
    },
    {
      name: 'Modern',
      korean: '현대적',
      image: '/placeholder.svg?height=600&width=500',
      description: 'Contemporary interpretations of timeless Korean beauty',
      color: 'var(--stone-600)',
      bgGradient: 'from-stone-50 to-stone-100',
      icon: Palette,
      productCount: products.filter((p) => p.category === 'Modern').length,
      featured: true,
    },
    {
      name: 'Accessories',
      korean: '액세서리',
      image: '/placeholder.svg?height=600&width=500',
      description: 'Exquisite details to complete your traditional ensemble',
      color: 'var(--rose-500)',
      bgGradient: 'from-purple-50 to-pink-100',
      icon: Gem,
      productCount: products.filter((p) => p.category === 'Accessories').length,
      featured: false,
    },
  ];

  const featuredCategories = categories.filter((cat) => cat.featured);
  const additionalCategories = categories.filter((cat) => !cat.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container-elegant relative z-10">
          <div className="max-w-4xl mx-auto text-center fade-in">
            <h1 className="heading-primary mb-8">
              Traditional Beauty
              <br />
              <span className="text-sage-600">Reimagined for Today</span>
            </h1>

            <p className="text-xl text-body mb-12 max-w-2xl mx-auto">
              Discover the timeless beauty of Korean fashion where Hanbok elegance meets contemporary sensibility.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/products" className="btn-primary flex items-center space-x-3 group">
                <span>Explore Collection</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/products?category=Wedding" className="btn-secondary">
                Wedding Collection
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          {/* SVG blob 1 */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#5d6954"
              d="M47.7,-57.2C59.9,-45.8,66.8,-29.4,68.7,-12.9C70.6,3.6,67.4,20.2,58.4,32.8C49.3,45.3,34.4,53.8,18.1,60.2C1.9,66.6,-15.6,71,-31.9,66.5C-48.2,62,-63.2,48.7,-70.8,32.1C-78.3,15.6,-78.4,-4.1,-71.8,-20.6C-65.2,-37.1,-51.9,-50.3,-37.3,-60.9C-22.7,-71.5,-6.8,-79.5,7.8,-78.1C22.4,-76.7,35.5,-68.7,47.7,-57.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full opacity-5">
          {/* SVG blob 2 */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#c04057"
              d="M47.3,-57.4C59.9,-46.1,68.2,-30.5,71.1,-14C74,2.5,71.5,19.9,63.3,33.5C55.1,47.1,41.2,56.9,26.1,63.3C11,69.7,-5.3,72.7,-20.6,68.9C-35.9,65.1,-50.2,54.5,-60.1,40.3C-70,26.1,-75.5,8.3,-73.6,-8.8C-71.7,-25.9,-62.3,-42.3,-49.1,-53.7C-35.9,-65.1,-18,-71.5,-0.6,-70.8C16.7,-70.1,34.7,-68.6,47.3,-57.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </section>

      {/* Collections by Categories */}
      <section className="section-spacing bg-gradient-to-b from-white via-sage-50/30 to-white relative overflow-hidden">
        <div className="container-bounded">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-sage-200/50">
              <Sparkles className="h-5 w-5 text-sage-600" />
              <span className="text-sm font-medium text-sage-600 tracking-wide">DISCOVER OUR COLLECTIONS</span>
            </div>

            <h2 className="heading-2 mb-6">
              Collections by Category
              <br />
              <span className="text-xl font-light text-gray-500 korean-text">카테고리별 컬렉션</span>
            </h2>

            <p className="body-large max-w-3xl mx-auto">
              Explore our diverse range of Korean fashion, from traditional ceremonial wear to modern everyday pieces,
              each category thoughtfully curated to celebrate Korean heritage.
            </p>

            <div className="w-32 h-1 bg-gradient-to-r from-sage-600 via-rose-600 to-gold-600 mx-auto rounded-full"></div>
          </div>

          {/* Featured Categories */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {featuredCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={`/products?category=${category.name}`}
                    className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Background Image */}
                    <div className="relative h-96 lg:h-[450px] overflow-hidden">
                      <ImageWithLoading
                        src={category.image || '/placeholder.svg'}
                        alt={category.name}
                        width={500}
                        height={600}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      ></div>
                    </div>

                    {/* Category Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <IconComponent className="h-6 w-6" style={{ color: category.color }} />
                      </div>
                    </div>

                    {/* Product Count Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                        <span className="text-sm font-medium text-gray-800">{category.productCount} items</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-2xl lg:text-3xl font-light group-hover:text-opacity-90 transition-all">
                              {category.name}
                            </h3>
                            <span className="text-lg korean-text opacity-80">{category.korean}</span>
                          </div>
                          <p className="text-white/90 leading-relaxed text-lg">{category.description}</p>
                        </div>

                        {/* Call to Action */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <span className="text-sm font-medium">Explore Collection</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div
                      className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Additional Categories */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="heading-3 mb-4">More Collections</h3>
              <p className="body text-gray-600">Complete your Korean fashion journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={`/products?category=${category.name}`}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${(index + 3) * 150}ms` }}
                  >
                    <div className="flex items-center p-6 space-x-6">
                      {/* Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
                        <ImageWithLoading
                          src={category.image || '/placeholder.svg'}
                          alt={category.name}
                          width={150}
                          height={150}
                          className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-20`}></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <IconComponent className="h-5 w-5 flex-shrink-0" style={{ color: category.color }} />
                          <h4 className="heading-4 group-hover:text-sage-600 transition-colors">{category.name}</h4>
                          <span className="text-sm korean-text text-gray-500">{category.korean}</span>
                        </div>

                        <p className="body text-gray-600 mb-3 line-clamp-2">{category.description}</p>

                        <div className="flex items-center justify-between">
                          <span className="caption">{category.productCount} products</span>
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sage-600" />
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div
                      className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-20 rounded-2xl transition-all duration-300"
                      style={{ borderColor: category.color }}
                    ></div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Browse All Categories CTA */}
          <div className="text-center mt-16 space-y-6">
            <div className="inline-block p-8 bg-gradient-to-br from-sage-50 to-rose-50 rounded-3xl border border-sage-200/50">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-sage-600 to-rose-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="heading-4">Discover All Collections</h3>
                <p className="body text-gray-600 max-w-md mx-auto">
                  Browse our complete range of traditional and modern Korean fashion
                </p>
                <Link to="/products" className="btn-primary inline-flex items-center space-x-3 group">
                  <span>View All Products</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-sage-100/50 to-rose-100/50 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-gold-100/50 to-sage-100/50 rounded-full opacity-30 blur-2xl"></div>

        <div className="absolute inset-0 korean-pattern opacity-5"></div>
      </section>

      {/* Featured Products */}
      <section className="section-spacing bg-white">
        <div className="container-bounded">
          <div className="text-center mb-16 space-y-6">
            <h2 className="heading-2">Featured Collection</h2>
            <p className="body-large max-w-3xl mx-auto">
              Handpicked pieces that showcase the perfect blend of traditional Korean aesthetics and contemporary
              design.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sage-600 to-rose-600 mx-auto rounded-full"></div>
          </div>

          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group card card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <ImageWithLoading
                    src={product.image || '/placeholder.svg'}
                    alt={product.name}
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-4 left-4">
                    <span className="badge">{product.category}</span>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-rose-600 hover:bg-white transition-all shadow-lg">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="product-card-content">
                  <div className="product-card-header">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="caption">(4.8)</span>
                    </div>

                    <h3 className="heading-4 group-hover:text-sage-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="body line-clamp-2">{product.description}</p>
                  </div>

                  <div className="product-card-footer">
                    <span className="text-2xl font-medium text-sage-600">${product.price}</span>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sage-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/products" className="btn-primary inline-flex items-center space-x-3">
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-alt py-20">
        <div className="container-elegant">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8 text-sage-600">
              "Hanbok is not merely clothing, but art that embodies spirit and culture."
            </blockquote>
            <div className="w-16 h-px mx-auto bg-sage-300 mb-6"></div>
            <p className="text-body text-lg">Traditional Korean Saying</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
