import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiImage, FiStar, FiPackage, FiDollarSign } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { getProductById } from "../../services/productService";

export default function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        if (res.success) {
          setProduct(res.data);
        } else {
          toast.error("Failed to load product");
          navigate("/admin/products");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching product");
        navigate("/admin/products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <BiLoaderAlt className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div>
      <button 
        onClick={() => navigate("/admin/products")}
        className="flex items-center text-gray-400 hover:text-white transition-colors mb-6 group"
      >
        <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="md:w-1/3 bg-gray-950 p-6 flex items-center justify-center border-r border-gray-800">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-auto max-h-96 object-contain drop-shadow-lg rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-600 h-64">
                <FiImage size={64} className="mb-4" />
                <p>No image available</p>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 inline-block">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-white mb-2">{product.title}</h1>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                product.stock > 0 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center text-gray-400 mb-1">
                  <FiDollarSign className="mr-2" /> Price
                </div>
                <div className="text-2xl font-bold text-white">
                  ${Number(product.price).toFixed(2)}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center text-gray-400 mb-1">
                  <FiPackage className="mr-2" /> Stock
                </div>
                <div className="text-2xl font-bold text-white">
                  {product.stock} <span className="text-sm font-normal text-gray-500">units</span>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center text-gray-400 mb-1">
                  <FiStar className="mr-2" /> Rating
                </div>
                <div className="text-2xl font-bold text-yellow-400 flex items-center">
                  {product.rating ? Number(product.rating).toFixed(1) : "N/A"}
                  <FiStar className="ml-2" size={16} fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 pt-6 border-t border-gray-800 flex justify-between">
              <span>ID: {product._id}</span>
              <span>Added: {new Date(product.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <FiStar className="mr-2 text-yellow-400" /> Customer Reviews ({product.reviews?.length || 0})
        </h3>
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-300">{review.name || "Anonymous User"}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-600" : ""} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews yet for this product.
          </div>
        )}
      </div>
    </div>
  );
}
