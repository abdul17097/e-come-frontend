import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, submitReview } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import {
  FiStar,
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiMessageSquare,
} from "react-icons/fi";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState(null);

  // Review states
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductById(id);
      if (res.success) {
        setProduct(res.data);
      }
    } catch (err) {
      console.error("Failed to load product", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      setMessage(null);
      const res = await addToCart(product._id, quantity);
      if (res.success) {
        setMessage({ type: "success", text: "Product added to cart!" });
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to add to cart",
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage({
          type: "error",
          text: "Please log in to add items to cart.",
        });
      } else {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Error adding to cart",
        });
      }
    } finally {
      setAddingToCart(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    try {
      setSubmittingReview(true);
      setMessage(null);
      const res = await submitReview(product._id, {
        comment: reviewComment,
        rating: reviewRating,
      });
      if (res.success) {
        setMessage({ type: "success", text: "Review submitted successfully!" });
        setReviewComment("");
        setReviewRating(5);
        fetchProduct(); // Refresh product to show new review
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to submit review",
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage({ type: "error", text: "Please log in to leave a review." });
      } else {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Error submitting review",
        });
      }
    } finally {
      setSubmittingReview(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Product not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline flex items-center gap-2"
        >
          <FiArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toast Message */}
        {message && (
          <div
            className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 transition-all ${message.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
          >
            {message.text}
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-indigo-600 mb-8 flex items-center gap-2 font-medium transition-colors"
        >
          <FiArrowLeft /> Back to Shop
        </button>

        {/* Product Info Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-12">
            {/* Image */}
            <div className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-9xl opacity-20">📦</span>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="px-6 py-2 bg-rose-500 text-white font-bold rounded-full shadow-lg rotate-12">
                    OUT OF STOCK
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {product.category || "General"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-4 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 font-medium">
                  {product.rating ? product.rating.toFixed(1) : "No rating"} (
                  {product.reviews?.length || 0} reviews)
                </span>
              </div>

              <p className="text-3xl font-black text-gray-900 mb-8">
                ${product.price?.toFixed(2)}
              </p>

              <div className="prose prose-sm text-gray-600 mb-8">
                <p>
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>

              {/* Add to Cart Area */}
              <div className="mt-auto border-t border-gray-100 pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-semibold text-gray-900">
                    Quantity
                  </span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="px-4 py-3 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {product.stock} available
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-bold transition-all shadow-lg
                    ${
                      product.stock === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200 active:scale-[0.98]"
                    }`}
                >
                  <FiShoppingCart />
                  {addingToCart
                    ? "Adding..."
                    : product.stock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FiMessageSquare size={20} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              Customer Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, idx) => {
                  console.log(review);

                  return (
                    <div
                      key={idx}
                      className="bg-gray-50 p-6 rounded-2xl border border-gray-100"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-2 bg-gray-200 px-2 py-0.5 rounded-full">
                          User ID: {String(review.reviewers)}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                  <span className="text-4xl mb-4 block">✨</span>
                  <p className="text-gray-500 font-medium">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>

            {/* Write a Review */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-3xl border border-indigo-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Write a Review
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <FiStar
                          className={`w-8 h-8 ${star <= reviewRating ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Comment
                  </label>
                  <textarea
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="What do you think about this product?"
                    className="w-full px-4 py-3 rounded-xl border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submittingReview || !reviewComment.trim()}
                  className="w-full py-3 bg-gray-900 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors disabled:bg-gray-400"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
