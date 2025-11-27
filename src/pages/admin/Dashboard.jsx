import React from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, FileText, Package } from 'lucide-react';
import { dashboardStats } from '../../data/mockEnquiries';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <span className="text-sm text-slate-500">Last updated: Just now</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className={stat.trend === 'up' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {stat.change}
              </span>
              <span className="text-slate-400 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New Enquiry Received</p>
                  <p className="text-xs text-slate-500">From Ramesh Constructions • 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group">
              <Package className="text-slate-400 group-hover:text-blue-600 mb-2" size={24} />
              <span className="block font-medium text-slate-900">Add Product</span>
              <span className="text-xs text-slate-500">Update inventory</span>
            </button>
            <button className="p-4 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group">
              <FileText className="text-slate-400 group-hover:text-blue-600 mb-2" size={24} />
              <span className="block font-medium text-slate-900">View Quotes</span>
              <span className="text-xs text-slate-500">Check pending requests</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
