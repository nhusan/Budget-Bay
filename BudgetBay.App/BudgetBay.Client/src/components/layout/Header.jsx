import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logoIcon from '../../assets/logo-icon-only.png';
import DemoModeBanner from '../common/DemoModeBanner';
import { Button } from '@/components/ui/Button'; // <-- Import the new Button component

const Header = ({ isDemoMode }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    const navLinkClasses = ({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-primary ${
            isActive ? 'text-primary' : 'text-muted-foreground'
        }`;

    return (
        <div className='fixed top-0 left-0 right-0 z-50 w-full'>
            {isDemoMode && <DemoModeBanner />}
            
            <header className='w-full bg-background/80 backdrop-blur-sm border-b'>
                <div className='max-w-6xl mx-auto flex justify-between items-center px-4 h-14'>
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logoIcon} alt="BudgetBay Icon" className="h-7 w-7" />
                        <span className="text-lg font-bold text-foreground tracking-tight hidden sm:block">
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
                                <Button onClick={handleSignOut} variant="outline" size="sm">
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('/login')} variant="outline" size="sm">
                                    Login
                                </Button>
                                <Button onClick={() => navigate('/signup')} size="sm">
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;