import { Link } from 'react-router-dom';
import logo from '../../assets/logo-row.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-slate-100 border-t border-border">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
           <div className="flex flex-col items-center gap-2">
                <Link to="/">
                    <img src={logo} alt="BudgetBay Logo" className="h-8" />
                </Link>
                <div className="text-center">
                    <p className="text-xs text-text-muted">&copy; {currentYear} Husankhuja Nizomkhujaev, Kush Gandhi, Ledya Bakloug, Matthew Schade, Matthew Sims, & Stephen Alvarez. All rights reserved.</p>
                </div>
            </div>
      </div>
    </footer>
  );
};

export default Footer;