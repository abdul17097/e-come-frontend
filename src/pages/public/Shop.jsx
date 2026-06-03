import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAllProductsPublic } from "../../services/productService";
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";

const CATEGORIES = [
  "All",
  "Fashion",
  "Electronics",
  "Home",
  "Sports",
  "Beauty",
  "Accessories"
];

// ProductCard copied and adapted for Shop page to maintain the premium aesthetic
function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm flex flex-col h-full">
      <div className={`relative bg-gray-50 aspect-square flex items-center justify-center overflow-hidden`}>
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <span className="text-7xl group-hover:scale-110 transition-transform duration-500 select-none">
            📦
          </span>
        )}

        <span className={`absolute top-3 left-3 product-badge text-white ${product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}>
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
        {discount && (
          <span className="absolute top-3 right-3 product-badge bg-white text-rose-600 border border-rose-100">
            -{discount}%
          </span>
        )}

        <div className="absolute inset-x-3 bottom-3 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => { e.preventDefault(); setWishlist(!wishlist); }}
            className={`flex-none w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-md ${
              wishlist
                ? "bg-rose-500 text-white"
                : "bg-white text-gray-600 hover:bg-rose-500 hover:text-white"
            }`}
          >
            <FiHeart size={16} className={wishlist ? "fill-white" : ""} />
          </button>
          <Link to={`/product/${product._id}`} className="flex-1 bg-gray-900 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md">
            <FiEye size={15} />
            View Detail
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[11px] text-indigo-600 font-semibold uppercase tracking-wider mb-1">
          {product.category || "General"}
        </p>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={12}
                className={
                  i < Math.floor(product.rating || 0)
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {product.rating ? product.rating.toFixed(1) : 0} ({product.reviews?.length || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-gray-900">
              ${product.price?.toFixed(2)}
            </span>
            {product.originalPrice && (
               <span className="text-sm text-gray-400 line-through">
                 ${product.originalPrice.toFixed(2)}
               </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  // Parse URL Parameters
  const searchQuery = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "All";
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = 12; // Items per page

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchQuery, currentCategory, currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * limit;
      
      const apiParams = {
        limit,
        skip,
      };
      
      if (searchQuery) apiParams.search = searchQuery;
      if (currentCategory !== "All") apiParams.category = currentCategory;

      const response = await getAllProductsPublic(apiParams);
      if (response.success) {
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProduct);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalProducts / limit);

  const updateParams = (newParams) => {
    const current = Object.fromEntries([...searchParams]);
    setSearchParams({ ...current, ...newParams });
  };

  const handleCategoryChange = (category) => {
    updateParams({ category, page: 1 });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const q = fd.get("q");
    updateParams({ search: q, page: 1 });
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-500">
            {totalProducts} {totalProducts === 1 ? 'item' : 'items'} found
            {searchQuery && <span> for "<span className="text-indigo-600 font-semibold">{searchQuery}</span>"</span>}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-none space-y-8">
            {/* Mobile/Desktop Search Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <form onSubmit={handleSearchSubmit} className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search store..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <FiFilter className="text-indigo-600" />
                <h3 className="font-bold text-gray-900">Categories</h3>
              </div>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentCategory === cat 
                          ? "bg-indigo-50 text-indigo-600" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clear Filters */}
            {(searchQuery || currentCategory !== "All") && (
              <button 
                onClick={handleClearFilters}
                className="w-full py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold rounded-xl text-sm transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Main Grid */}
          <main className="flex-grow">
            
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
                <span className="text-6xl mb-4 block opacity-50">🔍</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
                <p className="text-gray-500 mb-6">We couldn't find anything matching your current filters.</p>
                <button onClick={handleClearFilters} className="btn-primary !px-6 !py-2.5 !rounded-xl">
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((product, i) => (
                    <div
                      key={product._id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${(i % limit) * 0.05}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <button 
                      onClick={() => updateParams({ page: currentPage - 1 })}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all bg-white shadow-sm"
                    >
                      <FiChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-1 hidden sm:flex">
                      {[...Array(totalPages)].map((_, idx) => {
                        const pageNum = idx + 1;
                        // Basic truncation for many pages could be added here, but keeping it simple
                        return (
                          <button
                            key={pageNum}
                            onClick={() => updateParams({ page: pageNum })}
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${
                              currentPage === pageNum 
                                ? "bg-indigo-600 text-white border border-indigo-600" 
                                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-600 hover:text-indigo-600"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <span className="sm:hidden text-sm font-semibold text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button 
                      onClick={() => updateParams({ page: currentPage + 1 })}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all bg-white shadow-sm"
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}

          </main>
        </div>

      </div>
    </div>
  );
}
