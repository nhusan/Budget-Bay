import { Link } from 'react-router-dom';
import logoIcon from '../../assets/logo-icon-only.png'; // <-- Use the new icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-4 bg-muted border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-4">
            <Link to="/" className="flex items-center gap-2">
                <img src={logoIcon} alt="BudgetBay Icon" className="h-6 w-6" />
                <span className="font-semibold text-foreground">Budget Bay</span>
            </Link>
            <div className="text-center sm:text-right">
                <p className="text-xs text-muted-foreground">&copy; {currentYear} Husankhuja Nizomkhujaev, Kush Gandhi, Ledya Bakloug, Matthew Schade, Matthew Sims, & Stephen Alvarez. All rights reserved.</p>
            </div>
      </div>
    </footer>
  );
};

export default Footer;