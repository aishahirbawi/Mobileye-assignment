import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">Job Dashboard</div>
            <nav className="nav-links">
                <Link to="/">Jobs</Link>
            </nav>
            <div className="auth-button">
                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link to="/register">Register</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
