import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Edit2, Save, X, ArrowLeft, Shield, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || ''
    });

    // Get initials from name
    const getInitials = (name) => {
        if (!name) return 'U';
        const words = name.trim().split(' ');
        if (words.length >= 2) {
            return (words[0][0] + words[words.length - 1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    // Generate avatar color
    const getAvatarColor = (name) => {
        const colors = [
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
            'from-pink-500 to-pink-600',
            'from-indigo-500 to-indigo-600',
            'from-cyan-500 to-cyan-600',
        ];
        let hash = 0;
        for (let i = 0; i < name?.length || 0; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                login(data.user, token);
                setSuccess('Profile updated successfully!');
                setIsEditing(false);
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            phone: user?.phone || ''
        });
        setIsEditing(false);
        setError('');
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Please sign in to view your profile</h2>
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
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-center relative">
                        <div className="relative inline-block">
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getAvatarColor(user.name)} flex items-center justify-center text-white font-bold text-3xl shadow-2xl ring-4 ring-white/20`}>
                                {getInitials(user.name)}
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg">
                                <Camera size={16} />
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold text-white mt-4">{user.name}</h1>
                        <p className="text-slate-400">{user.email}</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <Shield size={14} className="text-green-400" />
                            <span className="text-sm text-green-400 capitalize">{user.role || 'Customer'}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Success/Error Messages */}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-center"
                            >
                                {success}
                            </motion.div>
                        )}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    <Edit2 size={18} />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-1 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        <Save size={18} />
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Name Field */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                    <User size={24} />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-slate-500 block mb-1">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="text-slate-900 font-medium">{user.name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                    <Mail size={24} />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-slate-500 block mb-1">Email Address</label>
                                    <p className="text-slate-900 font-medium">{user.email}</p>
                                    <span className="text-xs text-slate-400">(Email cannot be changed)</span>
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                                    <Phone size={24} />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-slate-500 block mb-1">Phone Number</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            maxLength={10}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="text-slate-900 font-medium">{user.phone || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                    <Calendar size={24} />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm text-slate-500 block mb-1">Member Since</label>
                                    <p className="text-slate-900 font-medium">{formatDate(user.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
