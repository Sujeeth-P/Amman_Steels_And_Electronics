import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Lock, Trash2, Moon, Sun, Globe, Shield, LogOut, ChevronRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function SettingSection({ title, children }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-4">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">{title}</h3>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

function ToggleSetting({ icon: Icon, label, description, enabled, onChange }) {
    return (
        <div className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-slate-600" size={20} />
                </div>
                <div>
                    <p className="font-medium text-slate-900">{label}</p>
                    {description && <p className="text-sm text-slate-500">{description}</p>}
                </div>
            </div>
            <button
                onClick={onChange}
                className={`w-12 h-7 rounded-full transition-colors relative ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
                <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow ${enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
}

function LinkSetting({ icon: Icon, label, description, onClick, danger }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors ${danger ? 'hover:bg-red-50' : ''
                }`}
        >
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${danger ? 'bg-red-100' : 'bg-slate-100'}`}>
                    <Icon className={danger ? 'text-red-600' : 'text-slate-600'} size={20} />
                </div>
                <div className="text-left">
                    <p className={`font-medium ${danger ? 'text-red-600' : 'text-slate-900'}`}>{label}</p>
                    {description && <p className="text-sm text-slate-500">{description}</p>}
                </div>
            </div>
            <ChevronRight className={danger ? 'text-red-400' : 'text-slate-400'} size={20} />
        </button>
    );
}

function ChangePasswordModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword.length < 6) {
            setError('New password must be at least 6 characters');
            return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Password changed successfully!');
                setTimeout(() => {
                    onClose();
                    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setSuccess('');
                }, 1500);
            } else {
                setError(data.message || 'Failed to change password');
            }
        } catch (err) {
            setError('Unable to connect to server');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
            >
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
                    <p className="text-slate-500 text-sm mt-1">Enter your current password and choose a new one</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                            {success}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                            >
                                {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Change Password'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default function Settings() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        twoFactor: false
    });
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleToggle = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // In a real app, this would call an API to delete the account
            alert('Account deletion functionality would be implemented here');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Please sign in to access settings</h2>
                    <Link to="/signin" className="text-blue-600 hover:text-blue-700">
                        Sign In →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4 max-w-2xl">
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
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                        <p className="text-slate-600">Manage your account preferences</p>
                    </div>

                    {/* Notifications */}
                    <SettingSection title="Notifications">
                        <ToggleSetting
                            icon={Bell}
                            label="Push Notifications"
                            description="Receive notifications about orders and offers"
                            enabled={settings.notifications}
                            onChange={() => handleToggle('notifications')}
                        />
                    </SettingSection>

                    {/* Appearance */}
                    <SettingSection title="Appearance">
                        <ToggleSetting
                            icon={settings.darkMode ? Moon : Sun}
                            label="Dark Mode"
                            description="Switch between light and dark theme"
                            enabled={settings.darkMode}
                            onChange={() => handleToggle('darkMode')}
                        />
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <Globe className="text-slate-600" size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Language</p>
                                    <p className="text-sm text-slate-500">Choose your preferred language</p>
                                </div>
                            </div>
                            <select className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none">
                                <option value="en">English</option>
                                <option value="hi">हिन्दी</option>
                                <option value="ta">தமிழ்</option>
                            </select>
                        </div>
                    </SettingSection>

                    {/* Security */}
                    <SettingSection title="Security">
                        <ToggleSetting
                            icon={Shield}
                            label="Two-Factor Authentication"
                            description="Add an extra layer of security"
                            enabled={settings.twoFactor}
                            onChange={() => handleToggle('twoFactor')}
                        />
                        <LinkSetting
                            icon={Lock}
                            label="Change Password"
                            description="Update your account password"
                            onClick={() => setShowPasswordModal(true)}
                        />
                    </SettingSection>

                    {/* Account Actions */}
                    <SettingSection title="Account">
                        <LinkSetting
                            icon={LogOut}
                            label="Sign Out"
                            description="Sign out from your account"
                            onClick={handleLogout}
                        />
                        <LinkSetting
                            icon={Trash2}
                            label="Delete Account"
                            description="Permanently delete your account and data"
                            onClick={handleDeleteAccount}
                            danger
                        />
                    </SettingSection>
                </motion.div>
            </div>

            {/* Password Modal */}
            <ChangePasswordModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />
        </div>
    );
}
