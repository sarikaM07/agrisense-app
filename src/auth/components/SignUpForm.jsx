import React, { useState } from 'react';
// Removed: import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
    });
    // State to manage the user message (success/error)
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Hook for navigation (Removed useNavigate hook)
    // const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle the registration API call
    const handleRegistration = async () => {
        setIsLoading(true);
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch('https://agrisense-gno8.onrender.com/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const data = await response.json();
            console.log("API Response:", data); 

            if (data.success) {
                // Set success message state
                setMessage("✅ Registration successful! Redirecting to login...");
                setIsSuccess(true);
                
                // Navigate after a delay so user can see the message
                setTimeout(() => {
                    // Replaced navigate("/login") with window.location.href
                    window.location.href = '/login';
                }, 2500);
            } else {
                // Handle API-level errors (e.g., duplicate email)
                setMessage(`❌ Registration failed: ${data.message || 'Server Error'}`);
                setIsSuccess(false);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Network Error:', error);
            setMessage('❌ Network error. Please check your connection.');
            setIsSuccess(false);
            setIsLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple client-side validation
        if (formData.password !== formData.confirmPassword) {
            setMessage("❌ Passwords do not match!");
            setIsSuccess(false);
            return;
        }

        handleRegistration();
    };

    // Inline CSS content
    const styleContent = `
        /* --- 1. Container and Background --- */
        .auth-page-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100%;           
            background: url('https://images.unsplash.com/photo-1542838792-ae7011d8d3f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center/cover;
            background-size: cover;
            font-family: 'Inter', sans-serif;
            padding: 20px;
            box-sizing: border-box;
            position: relative; 
            z-index: 1;
        }

        .auth-page-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            /* Deeper green tint overlay */
            background: rgba(30, 80, 30, 0.4); 
            backdrop-filter: blur(4px); 
            -webkit-backdrop-filter: blur(4px);
            z-index: -1; 
        }

        /* --- 2. The Glass Card --- */
        .auth-card { 
            /* Deep Glassmorphism Effect */
            background: rgba(255, 255, 255, 0.1); 
            backdrop-filter: blur(15px); 
            -webkit-backdrop-filter: blur(15px); 
            border: 1px solid rgba(255, 255, 255, 0.3); 
            box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.5); 
            
            /* Layout and Sizing */
            border-radius: 20px;
            padding: 30px 35px; 
            width: 100%;
            max-width: 450px; 
            color: #fff; 
            text-align: center;
            z-index: 1; 
        }

        .auth-title {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 35px;
            color: #D4E157; /* Light green title */
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        }

        /* --- 3. Form Layout and Elements --- */
        .auth-form {
            display: grid;
            grid-template-columns: 1fr; 
            gap: 20px; 
            text-align: left;
        }

        .form-group {
            grid-column: 1 / span 1; 
            margin-bottom: 0; 
        }

        .auth-form label {
            font-weight: 500;
            font-size: 0.95rem;
            margin-bottom: 6px;
            display: block;
            color: #fff; /* Changed label color for better contrast on glass */
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }

        .auth-form input {
            width: 100%;
            padding: 14px 18px; 
            border: 1px solid rgba(255, 255, 255, 0.5); 
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1); 
            color: #fff; /* Input text white */
            font-size: 1rem;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .auth-form input::placeholder {
            color: rgba(255, 255, 255, 0.7); 
        }

        .auth-form input:focus {
            outline: none;
            border-color: #D4E157; 
            background: rgba(255, 255, 255, 0.2);
        }

        /* --- 4. Submit Button & Loading --- */
        .submit-button {
            grid-column: 1 / span 1; 
            padding: 15px; 
            margin-top: 15px; 
            border: none;
            border-radius: 10px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            
            /* Green to Yellow Gradient for nature feel */
            background: linear-gradient(to right, #689f38, #d4e157);
            color: #1b5e20; 
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .submit-button:hover:not(:disabled) {
            background: linear-gradient(to right, #7cb342, #ffecb3);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
            transform: translateY(-2px);
        }

        .submit-button:active:not(:disabled) {
            transform: translateY(0);
        }
        
        .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        /* Loading Spinner */
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #1b5e20;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }


        /* --- 5. Footer Text --- */
        .auth-footer-text {
            grid-column: 1 / span 1; 
            margin-top: 15px; 
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.9); 
        }

        .auth-footer-text .footer-link {
            color: #D4E157; 
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
        }

        .auth-footer-text .footer-link:hover {
            color: #ffecb3;
            text-decoration: underline;
        }

        /* --- 6. Message Modal --- */
        .message-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px 30px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 100;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: opacity 0.3s ease-in-out;
            max-width: 90%;
            text-align: center;
        }

        .message-modal.success {
            background-color: #d4e157; /* Light Green */
            color: #1b5e20; /* Dark Green Text */
        }

        .message-modal.error {
            background-color: #ffcdd2; /* Light Red */
            color: #b71c1c; /* Dark Red Text */
        }

        /* --- 7. Responsiveness --- */
        @media (max-width: 650px) { 
            .auth-card {
                max-width: 90%; 
                padding: 25px 20px;
            }
            .auth-form {
                gap: 15px;
            }
            .auth-title {
                font-size: 1.75rem;
            }
        }
    `;

    return (
        <div className="auth-page-container"> 
            <style dangerouslySetInnerHTML={{ __html: styleContent }} />
            
            {/* Conditional Message Modal */}
            {message && (
                <div className={`message-modal ${isSuccess ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            
            <div className="auth-card"> 
                <h2 className="auth-title">Create Account</h2>
                
                <form onSubmit={handleSubmit} className="auth-form">
                    
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@agrisense.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-button" disabled={isLoading || isSuccess}>
                        {isLoading ? (
                            <>
                                <div className="spinner"></div>
                                Registering...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Already have an account? <a href="/login" className="footer-link">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
