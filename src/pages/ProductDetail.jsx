import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Package, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../lib/utils';
import ReviewSection from '../components/ReviewSection';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`/api/products/${id}`);

        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        if (err.response?.status === 404) {
          setError('Product not found');
        } else {
          setError('Failed to load product details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600">Loading product details...</p>
      </div>
    );
  }

  // Error or not found state
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">{error || 'Product Not Found'}</h2>
        <Link to="/products" className="text-blue-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Format category name for display
  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'steel': 'Steel & TMT',
      'cement': 'Cement',
      'electronics': 'Electronics & Electricals',
      'paints': 'Paints & Finishes',
      'pipes': 'Pipes & Plumbing'
    };
    return categoryNames[category?.toLowerCase()] || category;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-2 md:px-4 lg:px-6">
      <div className="container mx-auto px-2 md:px-4 lg:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-slate-100 p-8 flex items-center justify-center min-h-[400px]">
              <img
                src={product.image || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-full max-w-md object-cover rounded-lg shadow-lg"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
              />
            </div>

            {/* Info Section */}
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full mb-4">
                  {getCategoryDisplayName(product.category)}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {product.longDescription || product.description}
                </p>
              </div>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                <div>
                  <span className="text-3xl font-bold text-blue-600">{formatCurrency(product.price)}</span>
                  <span className="text-slate-500 ml-2">/ {product.unit}</span>
                </div>
                {product.inStock ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                    <Check size={14} /> In Stock
                  </span>
                ) : (
                  <span className="text-red-500 text-sm font-medium bg-red-50 px-2 py-1 rounded">Out of Stock</span>
                )}
              </div>

              {/* Quantity & Action */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-slate-200 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-slate-50 text-slate-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-slate-900 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-slate-50 text-slate-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-all shadow-lg ${product.inStock
                    ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-blue-900/10'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                >
                  {product.inStock ? 'Add to Enquiry List' : 'Out of Stock'}
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield size={18} className="text-blue-500" />
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Package size={18} className="text-blue-500" />
                  <span>Bulk Available</span>
                </div>
              </div>

              {/* Specs */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-slate-100 pb-2">
                        <span className="text-slate-500 text-sm">{key}</span>
                        <span className="text-slate-900 font-medium text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
          <ReviewSection productId={product.id} />
        </div>

      </div>
    </div>
  );
}
