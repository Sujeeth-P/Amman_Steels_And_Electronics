import React, { useState } from 'react';
import { Eye, Mail, Phone, MoreVertical, Search, Filter } from 'lucide-react';
import { mockEnquiries } from '../../data/mockEnquiries';
import { formatCurrency } from '../../lib/utils';

export default function Enquiries() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search enquiries..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Enquiry ID</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Customer</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Est. Value</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{enquiry.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{enquiry.customerName}</div>
                    <div className="text-xs text-slate-500">{enquiry.email}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{enquiry.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(enquiry.totalEstimated)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${enquiry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        enquiry.status === 'Closed' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-green-50 text-slate-500 hover:text-green-600 rounded transition-colors" title="Call Customer">
                        <Phone size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 text-slate-500 rounded transition-colors">
                        <MoreVertical size={18} />
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
