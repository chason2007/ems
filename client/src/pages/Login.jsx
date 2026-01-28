import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('https://worksync-nr6b.onrender.com/api/auth/login', {
                email,
                password
            });

            // Update context state
            login(res.data.token, res.data.user);
            showToast('Login successful! Welcome back.', 'success');

            // Redirect to dashboard
            navigate('/');
        } catch (err) {
            console.error(err);
            showToast(err.response?.data || 'Login failed. Please check your credentials.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        console.log('Forgot password submitted with email:', forgotEmail);
        setForgotLoading(true);

        try {
            const res = await axios.post('https://worksync-nr6b.onrender.com/api/auth/forgot-password', {
                email: forgotEmail
            });

            console.log('Forgot password response:', res.data);
            showToast(res.data.message, 'success');
            setShowForgotPassword(false);
            setForgotEmail('');
        } catch (err) {
            console.error('Forgot password error:', err);
            console.error('Error response:', err.response?.data);
            showToast(err.response?.data?.error || 'Failed to submit password reset request', 'error');
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 80px)',
            padding: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                animation: 'pulse 4s ease-in-out infinite'
            }}></div>

            <div className="card" style={{
                width: '100%',
                maxWidth: '420px',
                margin: '0',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img
                        src="/worksync-logo.png"
                        alt="WorkSync Logo"
                        style={{
                            width: '80px',
                            height: '80px',
                            marginBottom: '1rem'
                        }}
                    />
                    <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--pk-text-muted)', fontSize: '0.95rem' }}>
                        Sign in to your account to continue
                    </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Email Input */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Email Address
                        </label>
                        <div className="input-group">
                            <span className="input-icon">📧</span>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Password
                        </label>
                        <div className="input-group">
                            <span className="input-icon">🔒</span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{ paddingRight: '2.5rem' }}
                            />
                            <span
                                className="input-icon-right"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary ${loading ? 'loading' : ''}`}
                        disabled={loading}
                        style={{ marginTop: '0.5rem', width: '100%' }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Forgot Password Link */}
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--pk-primary)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            textDecoration: 'underline'
                        }}
                    >
                        Forgot Password?
                    </button>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <>
                    <div
                        className="modal-backdrop"
                        onClick={() => setShowForgotPassword(false)}
                    />
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Forgot Password</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowForgotPassword(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleForgotPassword}>
                            <div className="modal-body">
                                <p style={{ marginBottom: '1rem', color: 'var(--pk-text-muted)' }}>
                                    Enter your email address and we'll notify an administrator to reset your password.
                                </p>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                        Email Address
                                    </label>
                                    <div className="input-group">
                                        <span className="input-icon">📧</span>
                                        <input
                                            type="email"
                                            placeholder="your.email@company.com"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            required
                                            disabled={forgotLoading}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="btn btn-ghost"
                                    disabled={forgotLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${forgotLoading ? 'loading' : ''}`}
                                    disabled={forgotLoading}
                                >
                                    {forgotLoading ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;
