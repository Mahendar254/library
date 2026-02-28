import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Lock, ArrowRight, Shield } from 'lucide-react';
import './Login.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [captchaResult, setCaptchaResult] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaQuestion, setCaptchaQuestion] = useState('');

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaQuestion(`${num1} + ${num2} = ?`);
        setCaptchaResult((num1 + num2).toString());
        setCaptchaInput('');
    };

    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (captchaInput !== captchaResult) {
            setError('Incorrect captcha verification.');
            generateCaptcha();
            return;
        }

        setLoading(true);
        setError('');

        // Simulate authentication logic
        setTimeout(() => {
            setLoading(false);
            const adminCredentials = {
                'admin1@school.edu': 'admin1pass',
                'admin2@school.edu': 'admin2pass'
            };

            const studentCredentials = {
                'student1@school.edu': 'student1pass',
                'student2@school.edu': 'student2pass',
                'student3@school.edu': 'student3pass',
                'student4@school.edu': 'student4pass',
                'student5@school.edu': 'student5pass'
            };

            if (role === 'admin' && adminCredentials[email] && adminCredentials[email] === password) {
                navigate('/admin');
            } else if (role === 'student' && studentCredentials[email] && studentCredentials[email] === password) {
                navigate('/user');
            } else {
                setError('Invalid credentials for the selected role. Please check your email and password.');
                generateCaptcha();
            }
        }, 1000);
    };

    return (
        <div className="login-wrapper">
            <div className="login-background">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <div className="login-container animate-fade-in">
                <div className="login-header">
                    <div className="logo-icon">
                        <BookOpen size={40} color="var(--primary)" />
                    </div>
                    <h1>EdLibrary</h1>
                    <p>Your gateway to educational excellence</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <label className="input-label" htmlFor="role">Select Role</label>
                        <div className="input-with-icon">
                            <Shield size={18} className="input-icon" />
                            <select
                                id="role"
                                className="input-field"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{ appearance: 'auto', cursor: 'pointer' }}
                            >
                                <option value="student">Student</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <User size={18} className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                className="input-field"
                                placeholder="student@school.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="captcha">Security Check: {captchaQuestion}</label>
                        <div className="input-with-icon">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="text"
                                id="captcha"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                className="input-field"
                                placeholder="Enter the result"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary login-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner"></span>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <div className="login-options">
                        <a href="#forgot-password" className="login-link" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                        <a href="#mfa-register" className="login-link" onClick={(e) => e.preventDefault()}>MFA Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
