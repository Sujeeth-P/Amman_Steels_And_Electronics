import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, MessageSquare, FileText, XCircle, ChevronDown, ChevronUp, Send, Loader2, Package, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../lib/utils';
import axios from 'axios';

const statusConfig = {
    pending: {
        label: 'Pending',
        color: 'bg-amber-50 text-amber-700 border border-amber-200',
        icon: Clock,
        description: 'Your enquiry has been received. Our team will review it shortly.'
    },
    contacted: {
        label: 'Contacted',
        color: 'bg-blue-50 text-blue-700 border border-blue-200',
        icon: MessageSquare,
        description: 'Our team has reviewed your enquiry and reached out to you.'
    },
    quoted: {
        label: 'Quoted',
        color: 'bg-purple-50 text-purple-700 border border-purple-200',
        icon: FileText,
        description: 'A price quotation has been prepared for your enquiry.'
    },
    converted: {
        label: 'Converted',
        color: 'bg-green-50 text-green-700 border border-green-200',
        icon: CheckCircle,
        description: 'Your enquiry has been converted into an order. Thank you!'
    },
    closed: {
        label: 'Closed',
        color: 'bg-slate-100 text-slate-600 border border-slate-200',
        icon: XCircle,
        description: 'This enquiry has been closed.'
    }
};

const sourceLabels = {
    cart: 'Product Enquiry',
    contact_form: 'Contact Form',
    product_page: 'Product Page'
};

function EnquiryCard({ enquiry }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const status = statusConfig[enquiry.status] || statusConfig.pending;
    const StatusIcon = status.icon;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300"
        >
            <div
                className="p-5 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${enquiry.source === 'cart' ? 'bg-blue-50' :
                                enquiry.source === 'contact_form' ? 'bg-emerald-50' : 'bg-purple-50'
                            }`}>
                            {enquiry.source === 'cart' ? (
                                <Package className="text-blue-600" size={20} />
                            ) : enquiry.source === 'contact_form' ? (
                                <Mail className="text-emerald-600" size={20} />
                            ) : (
                                <Send className="text-purple-600" size={20} />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">{enquiry.enquiryNumber}</p>
                            <p className="text-sm text-slate-500">{formatDate(enquiry.createdAt)} at {formatTime(enquiry.createdAt)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${status.color}`}>
                            <StatusIcon size={13} />
                            {status.label}
                        </span>
                        {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-medium">
                            {sourceLabels[enquiry.source] || enquiry.source}
                        </span>
                        {enquiry.items?.length > 0 && (
                            <span className="text-sm text-slate-600">{enquiry.items.length} item(s)</span>
                        )}
                    </div>
                    {enquiry.estimatedTotal > 0 && (
                        <p className="font-bold text-lg text-slate-900">{formatCurrency(enquiry.estimatedTotal)}</p>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-100"
                    >
                        <div className="p-5 bg-slate-50">
                            {/* Status Description */}
                            <div className={`p-3 rounded-lg mb-4 text-sm flex items-start gap-2 ${status.color}`}>
                                <StatusIcon size={16} className="mt-0.5 shrink-0" />
                                <span>{status.description}</span>
                            </div>

                            {/* Items */}
                            {enquiry.items?.length > 0 && (
                                <>
                                    <h4 className="font-semibold text-slate-900 mb-3">Enquiry Items</h4>
                                    <div className="space-y-2 mb-4">
                                        {enquiry.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.productName}
                                                        className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                                                        onError={(e) => { e.target.style.display = 'none'; }}
                                                    />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-slate-900 truncate">{item.productName}</p>
                                                    <p className="text-sm text-slate-500">
                                                        Qty: {item.quantity} {item.unit && `(${item.unit})`}
                                                    </p>
                                                </div>
                                                {item.unitPrice > 0 && (
                                                    <p className="font-semibold text-slate-900 shrink-0">
                                                        {formatCurrency(item.unitPrice * item.quantity)}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Message */}
                            {enquiry.message && (
                                <div className="mb-4">
                                    <h4 className="font-semibold text-slate-900 mb-2">Your Message</h4>
                                    <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100 italic">
                                        "{enquiry.message}"
                                    </p>
                                </div>
                            )}

                            {/* Total */}
                            {enquiry.estimatedTotal > 0 && (
                                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                                    <span className="font-semibold text-slate-700">Estimated Total</span>
                                    <span className="font-bold text-xl text-slate-900">{formatCurrency(enquiry.estimatedTotal)}</span>
                                </div>
                            )}

                            {/* Quoted Amount */}
                            {enquiry.quotedAmount > 0 && (
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="font-semibold text-green-700">Quoted Amount</span>
                                    <span className="font-bold text-xl text-green-700">{formatCurrency(enquiry.quotedAmount)}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function Orders() {
    const { user } = useAuth();
    const [filter, setFilter] = useState('all');
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnquiries = async () => {
            if (!user) return;
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem('token');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/enquiries/my`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                if (response.data.success) {
                    setEnquiries(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching enquiries:', err);
                setError('Failed to load your enquiries. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, [user]);

    const filteredEnquiries = filter === 'all'
        ? enquiries
        : enquiries.filter(enq => enq.status === filter);

    const statusCounts = {
        all: enquiries.length,
        pending: enquiries.filter(e => e.status === 'pending').length,
        contacted: enquiries.filter(e => e.status === 'contacted').length,
        quoted: enquiries.filter(e => e.status === 'quoted').length,
        converted: enquiries.filter(e => e.status === 'converted').length,
        closed: enquiries.filter(e => e.status === 'closed').length,
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="text-blue-600" size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Please sign in to view your enquiries</h2>
                    <p className="text-slate-500 mb-4">Track your product enquiries and quotation requests</p>
                    <Link to="/signin" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Sign In →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">My Enquiries</h1>
                            <p className="text-slate-600">Track your product enquiries and quotations</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Send className="text-blue-600" size={22} />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        {['all', 'pending', 'contacted', 'quoted', 'converted', 'closed'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === status
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                {statusCounts[status] > 0 && ` (${statusCounts[status]})`}
                            </button>
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
                            <p className="text-slate-600">Loading your enquiries...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="bg-white rounded-xl p-12 text-center border border-red-100">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <XCircle className="text-red-500" size={28} />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{error}</h3>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Enquiries List */}
                    {!loading && !error && (
                        <div className="space-y-4">
                            {filteredEnquiries.length > 0 ? (
                                filteredEnquiries.map((enquiry) => (
                                    <EnquiryCard key={enquiry._id} enquiry={enquiry} />
                                ))
                            ) : (
                                <div className="bg-white rounded-xl p-12 text-center border border-slate-100">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="text-slate-400" size={28} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                        {filter !== 'all' ? `No ${filter} enquiries` : 'No enquiries yet'}
                                    </h3>
                                    <p className="text-slate-500 mb-6">
                                        {filter !== 'all'
                                            ? `You don't have any enquiries with "${filter}" status.`
                                            : 'Browse our products and submit an enquiry to get started.'}
                                    </p>
                                    <Link
                                        to="/products"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
