import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo-row.png';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSignOut = () => {
        logout();
        navigate('/'); // Redirect to home after logout
    };

    const renderAuthButtons = () => {
        if (user) {
            return (
                <>
                    <li>
                        <button onClick={() => navigate('/dashboard')} className="btn-primary">
                            My Dashboard
                        </button>
                    </li>
                    <li>
                        <button onClick={handleSignOut} className="btn-primary bg-transparent text-primary border border-primary hover:bg-primary/10">
                            Sign Out
                        </button>
                    </li>
                </>
            );
        }
        return (
            <>
                <li>
                    <button onClick={() => navigate('/login')} className="btn-primary bg-transparent text-primary hover:bg-primary/10">
                        Login
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/signup')} className="btn-primary">
                        Sign Up
                    </button>
                </li>
            </>
        );
    };

    return (
        <header className='fixed top-0 left-0 right-0 z-50 w-full bg-surface shadow-md'>
            <div className='max-w-6xl mx-auto flex justify-between items-center p-4'>
                <Link to="/">
                    <img src={logo} alt="BudgetBay Logo" className="h-10" />
                </Link>
                <nav>
                    <ul className='flex items-center gap-4'>
                        {renderAuthButtons()}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;