import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, Clock, CheckCircle, Truck, XCircle, Eye, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Mock orders data (in a real app, this would come from an API)
const mockOrders = [
    {
        id: 'ORD-2024-001',
        date: '2024-12-20',
        status: 'delivered',
        total: 45000,
        items: [
            { name: 'Tata Tiscon 12mm TMT Bars', quantity: 10, price: 4500, unit: 'piece' },
        ]
    },
    {
        id: 'ORD-2024-002',
        date: '2024-12-18',
        status: 'shipped',
        total: 28500,
        items: [
            { name: 'UltraTech Cement (50kg)', quantity: 30, price: 950, unit: 'bag' },
        ]
    },
    {
        id: 'ORD-2024-003',
        date: '2024-12-15',
        status: 'processing',
        total: 12800,
        items: [
            { name: 'Havells 2.5mm Wire Roll', quantity: 4, price: 3200, unit: 'roll' },
        ]
    },
    {
        id: 'ORD-2024-004',
        date: '2024-12-10',
        status: 'cancelled',
        total: 8500,
        items: [
            { name: 'Polycab Switch Board', quantity: 2, price: 4250, unit: 'piece' },
        ]
    }
];

const statusConfig = {
    processing: {
        label: 'Processing',
        color: 'bg-yellow-100 text-yellow-700',
        icon: Clock
    },
    shipped: {
        label: 'Shipped',
        color: 'bg-blue-100 text-blue-700',
        icon: Truck
    },
    delivered: {
        label: 'Delivered',
        color: 'bg-green-100 text-green-700',
        icon: CheckCircle
    },
    cancelled: {
        label: 'Cancelled',
        color: 'bg-red-100 text-red-700',
        icon: XCircle
    }
};

function OrderCard({ order }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const status = statusConfig[order.status];
    const StatusIcon = status.icon;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
        >
            <div
                className="p-5 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Package className="text-slate-600" size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">{order.id}</p>
                            <p className="text-sm text-slate-500">{formatDate(order.date)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${status.color}`}>
                            <StatusIcon size={14} />
                            {status.label}
                        </span>
                        {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">{order.items.length} item(s)</p>
                    <p className="font-bold text-lg text-slate-900">{formatCurrency(order.total)}</p>
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
                            <h4 className="font-semibold text-slate-900 mb-3">Order Items</h4>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                                        <div>
                                            <p className="font-medium text-slate-900">{item.name}</p>
                                            <p className="text-sm text-slate-500">Qty: {item.quantity} {item.unit}(s)</p>
                                        </div>
                                        <p className="font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
                                <span className="font-semibold text-slate-700">Total Amount</span>
                                <span className="font-bold text-xl text-slate-900">{formatCurrency(order.total)}</span>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <Eye size={18} />
                                    View Details
                                </button>
                                {order.status === 'delivered' && (
                                    <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                                        Reorder
                                    </button>
                                )}
                            </div>
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

    const filteredOrders = filter === 'all'
        ? mockOrders
        : mockOrders.filter(order => order.status === filter);

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Please sign in to view your orders</h2>
                    <Link to="/signin" className="text-blue-600 hover:text-blue-700">
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
                            <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
                            <p className="text-slate-600">Track and manage your orders</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <ShoppingBag className="text-blue-600" size={24} />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === status
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                {status === 'all' && ` (${mockOrders.length})`}
                            </button>
                        ))}
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <div className="bg-white rounded-xl p-12 text-center">
                                <Package className="mx-auto text-slate-300 mb-4" size={48} />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
                                <p className="text-slate-500 mb-4">You don't have any {filter !== 'all' ? filter : ''} orders yet.</p>
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
