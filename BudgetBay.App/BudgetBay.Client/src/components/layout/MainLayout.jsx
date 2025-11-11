import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  // Check session storage to see if we are in demo mode
  const isDemoMode = sessionStorage.getItem('demoMode') === 'true';

  // Calculate the top padding needed for the main content
  const mainContentPaddingTop = isDemoMode ? 'pt-[5.75rem]' : 'pt-[3.25rem]';

  return (
    <>
      <Header isDemoMode={isDemoMode} />
      
      {/* The main tag now lives here, correctly padding its content */}
      <main className={mainContentPaddingTop}>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;