import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Shield, Truck, Package } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency, cn } from '../lib/utils';
import ReviewSection from '../components/ReviewSection';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-blue-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
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
                src={product.image} 
                alt={product.name} 
                className="w-full max-w-md object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full mb-4">
                  {product.category}
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
                  <span className="text-red-500 text-sm font-medium">Out of Stock</span>
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
                  className="flex-1 bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10"
                >
                  Add to Enquiry List
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield size={18} className="text-blue-500" />
                  <span>Quality Assured</span>
                </div>
                {/* <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Truck size={18} className="text-blue-500" />
                  <span>Fast Delivery</span>
                </div> */}
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Package size={18} className="text-blue-500" />
                  <span>Bulk Available</span>
                </div>
              </div>

              {/* Specs */}
              {product.specs && (
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
          <ReviewSection productId={product.id} initialReviews={product.reviews} />
        </div>

      </div>
    </div>
  );
}
