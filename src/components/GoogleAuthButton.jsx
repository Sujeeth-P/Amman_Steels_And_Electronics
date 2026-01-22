import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Google Icon Component
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

export default function GoogleAuthButton({ mode = 'signin' }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            setError('');

            try {
                // Get user info from Google using access token
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                });
                const userInfo = await userInfoResponse.json();

                // Send to backend
                const response = await fetch('http://localhost:5000/api/auth/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        googleId: userInfo.sub,
                        email: userInfo.email,
                        name: userInfo.name,
                        picture: userInfo.picture
                    })
                });

                const data = await response.json();

                if (data.success) {
                    login(data.user, data.token);
                    const redirectTo = location.state?.from || '/';
                    navigate(redirectTo);
                } else {
                    setError(data.message || 'Google authentication failed');
                }
            } catch (err) {
                console.error('Google auth error:', err);
                setError('Unable to connect to server. Please try again.');
            } finally {
                setLoading(false);
            }
        },
        onError: () => {
            setError('Google sign-in was cancelled or failed. Please try again.');
        }
    });

    return (
        <div className="w-full">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl text-center mb-4">
                    {error}
                </div>
            )}

            <button
                onClick={() => googleLogin()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Connecting to Google...</span>
                    </>
                ) : (
                    <>
                        <GoogleIcon />
                        <span>{mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}</span>
                    </>
                )}
            </button>
        </div>
    );
}
