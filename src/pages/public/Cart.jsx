import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, updateCartItem, removeFromCart, clearCart } from "../../services/cartService";
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag, FiInfo } from "react-icons/fi";

export default function Cart() {
  const [cartData, setCartData] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCartItems();
      if (res.success && res.cart) {
        setCartData({
          items: res.cart.items || [],
          totalPrice: res.totalPrice || 0,
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Failed to load cart", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleUpdateQuantity = async (productId, newQuantity, currentQuantity, stock) => {
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      showMessage(`Only ${stock} items available in stock`, "error");
      return;
    }

    try {
      setActionLoading(productId);
      const res = await updateCartItem(productId, newQuantity);
      if (res.success) {
        setCartData({ items: res.cart.items, totalPrice: res.totalPrice });
      } else {
        showMessage(res.message || "Failed to update quantity", "error");
      }
    } catch (err) {
      showMessage(err.response?.data?.message || "Error updating quantity", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setActionLoading(productId);
      const res = await removeFromCart(productId);
      if (res.success) {
        setCartData({ items: res.cart.items, totalPrice: res.totalPrice });
        showMessage("Item removed from cart");
      }
    } catch (err) {
      showMessage(err.response?.data?.message || "Error removing item", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your entire cart?")) return;
    
    try {
      setActionLoading("clear");
      const res = await clearCart();
      if (res.success) {
        setCartData({ items: [], totalPrice: 0 });
        showMessage("Cart cleared");
      }
    } catch (err) {
      showMessage("Error clearing cart", "error");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Message */}
        {message && (
          <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 transition-all ${message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
            {message.text}
          </div>
        )}

        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
            <FiShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Your Shopping Cart</h1>
            <p className="text-gray-500 mt-1">Review your items and proceed to checkout</p>
          </div>
        </div>

        {cartData.items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl block translate-y-1">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Discover something new today!</p>
            <Link to="/shop" className="btn-primary !px-8 !py-3.5 !rounded-xl inline-flex items-center gap-2 text-lg">
              <FiArrowLeft /> Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items */}
            <div className="flex-grow space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-lg">Cart Items ({cartData.items.length})</h3>
                  <button 
                    onClick={handleClearCart}
                    disabled={actionLoading === "clear"}
                    className="text-rose-500 hover:text-rose-600 text-sm font-semibold flex items-center gap-1 transition-colors"
                  >
                    <FiTrash2 /> Clear All
                  </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {cartData.items.map((item) => {
                    const product = item.product || {};
                    const isUpdating = actionLoading === product._id;
                    
                    return (
                      <div key={product._id} className={`p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-opacity ${isUpdating ? 'opacity-50' : ''}`}>
                        <Link to={`/product/${product._id}`} className="flex-none w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative">
                          {product.image ? (
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><span className="text-3xl">📦</span></div>
                          )}
                        </Link>
                        
                        <div className="flex-grow flex flex-col h-full justify-between w-full">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <div>
                              <Link to={`/product/${product._id}`} className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-1">
                                {product.title || "Unknown Product"}
                              </Link>
                              <span className="text-indigo-600 font-black">${product.price?.toFixed(2)}</span>
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(product._id)}
                              disabled={isUpdating}
                              className="text-gray-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-2">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500 font-medium">Quantity</span>
                              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-10">
                                <button 
                                  onClick={() => handleUpdateQuantity(product._id, item.quantity - 1, item.quantity, product.stock)}
                                  disabled={item.quantity <= 1 || isUpdating}
                                  className="px-3 h-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                >
                                  <FiMinus size={14} />
                                </button>
                                <span className="w-10 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                                <button 
                                  onClick={() => handleUpdateQuantity(product._id, item.quantity + 1, item.quantity, product.stock)}
                                  disabled={item.quantity >= product.stock || isUpdating}
                                  className="px-3 h-full text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                >
                                  <FiPlus size={14} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <span className="text-xs text-gray-500 block">Subtotal</span>
                              <span className="text-lg font-black text-gray-900">${((product.price || 0) * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96 flex-none">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 text-xl mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">${cartData.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-500">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold text-gray-900">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-indigo-600">${cartData.totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-gray-900 hover:bg-indigo-600 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0">
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <FiInfo size={14} />
                  <span>Secure checkout. 30-day money-back guarantee.</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
