import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User, Phone, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/GoogleAuthButton';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError('');

        // Real-time validation for name field
        if (name === 'name') {
            if (!value.trim()) {
                setNameError('Name is required');
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                setNameError('Name should contain only letters and spaces');
            } else if (value.trim().length < 2) {
                setNameError('Name must be at least 2 characters');
            } else {
                setNameError('');
            }
        }

        // Real-time validation for phone field
        if (name === 'phone') {
            if (value && value.trim()) {
                // Check if contains only digits
                if (!/^\d*$/.test(value)) {
                    setPhoneError('Phone number should contain only digits');
                } else if (value.length > 0 && value.length < 10) {
                    setPhoneError('Phone number must be 10 digits');
                } else if (value.length === 10 && !/^[6-9]\d{9}$/.test(value)) {
                    setPhoneError('Phone number must start with 6, 7, 8, or 9');
                } else if (value.length === 10) {
                    setPhoneError('');
                } else {
                    setPhoneError('');
                }
            } else {
                setPhoneError('');
            }
        }
    };

    const validateForm = () => {
        // Validate name - must be a string with letters and spaces only
        if (!formData.name.trim()) {
            setError('Name is required');
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            setError('Name should contain only letters and spaces');
            return false;
        }
        if (formData.name.trim().length < 2) {
            setError('Name must be at least 2 characters');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
            setError('Please enter a valid 10-digit Indian phone number');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                login(data.user, data.token);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const levels = [
            { label: 'Weak', color: 'bg-red-500' },
            { label: 'Fair', color: 'bg-orange-500' },
            { label: 'Good', color: 'bg-yellow-500' },
            { label: 'Strong', color: 'bg-green-500' },
            { label: 'Excellent', color: 'bg-emerald-500' }
        ];

        return { strength, ...levels[Math.min(strength - 1, 4)] || levels[0] };
    };

    const passwordStrength = getPasswordStrength();

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 className="text-green-400" size={40} />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                    <p className="text-slate-400 mb-4">Redirecting you to homepage...</p>
                    <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2 }}
                            className="h-full bg-green-500"
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 py-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-3xl font-bold text-white tracking-tight">SRI AMMAN</h1>
                        <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Steels & Hardwares</p>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                            <p className="text-slate-400">Join us for the best deals on steels & electronics</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl text-center"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border ${nameError
                                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
                                            : formData.name && !nameError
                                                ? 'border-green-500/50 focus:ring-green-500/50 focus:border-green-500/50'
                                                : 'border-white/10 focus:ring-blue-500/50 focus:border-blue-500/50'
                                            } text-white placeholder-slate-500 focus:ring-2 outline-none transition-all`}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {formData.name && !nameError && (
                                        <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={20} />
                                    )}
                                </div>
                                {nameError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1.5 ml-1"
                                    >
                                        {nameError}
                                    </motion.p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Phone Number <span className="text-slate-500"></span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border ${phoneError
                                            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
                                            : formData.phone && !phoneError && formData.phone.length === 10
                                                ? 'border-green-500/50 focus:ring-green-500/50 focus:border-green-500/50'
                                                : 'border-white/10 focus:ring-blue-500/50 focus:border-blue-500/50'
                                            } text-white placeholder-slate-500 focus:ring-2 outline-none transition-all`}
                                        placeholder="Enter your phone number"
                                        maxLength={10}
                                    />
                                    {formData.phone && !phoneError && formData.phone.length === 10 && (
                                        <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={20} />
                                    )}
                                </div>
                                {phoneError && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mt-1.5 ml-1"
                                    >
                                        {phoneError}
                                    </motion.p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all ${i < passwordStrength.strength ? passwordStrength.color : 'bg-white/10'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-400">
                                            Password strength: <span className="text-white">{passwordStrength.label}</span>
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                        <CheckCircle2 size={12} /> Passwords match
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3.5 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mt-8 mb-6">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-slate-500 text-sm">or continue with</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Google Sign Up */}
                        <div className="w-full py-3 px-4">
                            <GoogleAuthButton mode="signup" />
                        </div>

                        {/* Sign In Link */}
                        <p className="text-center text-slate-400 mt-6">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-slate-500 hover:text-white transition-colors text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
