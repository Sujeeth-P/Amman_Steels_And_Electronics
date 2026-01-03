import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details to console
        console.error('═══════════════════════════════════════════════════════════');
        console.error('🚨 ERROR BOUNDARY CAUGHT AN ERROR');
        console.error('═══════════════════════════════════════════════════════════');
        console.error('📍 Component:', this.props.name || 'Unknown');
        console.error('❌ Error:', error);
        console.error('📋 Error Message:', error?.message);
        console.error('📚 Stack Trace:', error?.stack);
        console.error('🔍 Component Stack:', errorInfo?.componentStack);
        console.error('═══════════════════════════════════════════════════════════');

        // Store error info in state for display
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleRefresh = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Fallback UI when an error occurs
            return (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
                    <div className="max-w-lg w-full bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="text-red-400" size={32} />
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
                        <p className="text-slate-400 mb-6">
                            An unexpected error occurred. Please check the console for details.
                        </p>

                        {/* Error details for development */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-left overflow-auto max-h-48">
                                <p className="text-red-400 text-sm font-mono break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleRefresh}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
                            >
                                <RefreshCw size={18} />
                                Refresh Page
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                            >
                                <Home size={18} />
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
