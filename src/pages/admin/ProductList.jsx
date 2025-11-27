import React from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { products } from '../../data/products';
import { formatCurrency } from '../../lib/utils';

export default function ProductList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Products Inventory</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Product</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Category</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Price / Unit</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Stock Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{product.name}</div>
                        <div className="text-xs text-slate-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2 py-1 bg-slate-100 rounded text-xs font-medium text-slate-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-medium">
                    {formatCurrency(product.price)} <span className="text-slate-500 font-normal">/ {product.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    {product.inStock ? (
                      <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">In Stock</span>
                    ) : (
                      <span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
