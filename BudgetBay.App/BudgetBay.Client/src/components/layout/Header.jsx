import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoIcon from '../../assets/logo-icon-only.png';
import DemoModeBanner from '../common/DemoModeBanner'; // <-- Import banner here

const Header = ({ isDemoMode }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    const navLinkClasses = ({ isActive }) =>
        `text-base font-medium transition-colors hover:text-primary ${
            isActive ? 'text-primary' : 'text-text-base'
        }`;

    return (
        <div className='fixed top-0 left-0 right-0 z-50 w-full'>
            {isDemoMode && <DemoModeBanner />}
            
            <header className='w-full bg-surface/80 backdrop-blur-sm shadow-md border-b border-border'>
                <div className='max-w-6xl mx-auto flex justify-between items-center px-4 py-2'>
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logoIcon} alt="BudgetBay Icon" className="h-7 w-7" />
                        <span className="text-lg font-bold text-text-base tracking-tight hidden sm:block">
                            Budget Bay
                        </span>
                    </Link>

                    <nav className='hidden md:flex items-center gap-6'>
                        <NavLink to="/search" className={navLinkClasses}>
                            Browse
                        </NavLink>
                        {user && (
                            <NavLink to="/products/create" className={navLinkClasses}>
                                Sell
                            </NavLink>
                        )}
                    </nav>

                    <div className='flex items-center gap-2 sm:gap-4'>
                        {user ? (
                            <>
                                <NavLink to="/dashboard" className={`${navLinkClasses} hidden sm:block`}>
                                    Dashboard
                                </NavLink>
                                <button onClick={handleSignOut} className="btn-secondary py-2 px-4 text-sm">
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/login')} className="btn-secondary py-2 px-4 text-sm">
                                    Login
                                </button>
                                <button onClick={() => navigate('/signup')} className="btn-primary py-2 px-4 text-sm">
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;