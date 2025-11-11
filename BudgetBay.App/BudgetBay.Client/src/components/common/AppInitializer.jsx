import { useState, useEffect, useRef } from 'react';
import { checkBackendStatus } from '../../lib/healthCheck';
import { startMockWorker } from '../../mocks';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loader2, ServerOff } from 'lucide-react'; // <-- Import new icons
import logoIcon from '../../assets/logo-icon-only.png'; // <-- Import logo

const AppInitializer = ({ children }) => {
  const [status, setStatus] = useState('checking'); 
  const [attempt, setAttempt] = useState(1);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeApp = async () => {
      const isDemo = sessionStorage.getItem('demoMode') === 'true';

      if (isDemo) {
        setStatus('initializing_mock');
        await startMockWorker();
        const isMockServerReady = await checkBackendStatus();
        setStatus(isMockServerReady ? 'online' : 'offline');
      } else {
        const isLiveServerOnline = await checkBackendStatus((num) => setAttempt(num));
        setStatus(isLiveServerOnline ? 'online' : 'offline');
      }
    };

    initializeApp();
  }, []);

  const handleStartDemoMode = () => {
    sessionStorage.setItem('demoMode', 'true');
    window.location.reload();
  };

  // Improved StatusCard with branding and better icons
  const StatusCard = ({ title, message, children = null, icon: IconComponent }) => (
    <div className="flex justify-center items-center min-h-screen bg-background p-5">
      <Card className="text-center max-w-md w-full">
        <CardHeader className="items-center space-y-4">
          <img src={logoIcon} alt="BudgetBay Logo" className="h-12 w-12" />
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {IconComponent && (
            <div className="flex justify-center mb-6">
              <IconComponent />
            </div>
          )}
          <p className="text-muted-foreground leading-relaxed">{message}</p>
          {children && <div className="mt-6">{children}</div>}
        </CardContent>
      </Card>
    </div>
  );

  if (status === 'checking') {
    return (
      <StatusCard 
        title="Connecting to Server" 
        message={`Please wait while we check the backend status. (Attempt ${attempt} of 3)`}
        icon={() => <Loader2 className="h-10 w-10 text-primary animate-spin" />}
      />
    );
  }

  if (status === 'initializing_mock') {
    return (
      <StatusCard 
        title="Starting Demo Mode" 
        message="Please wait while we prepare the application." 
        icon={() => <Loader2 className="h-10 w-10 text-primary animate-spin" />}
      />
    );
  }

  if (status === 'offline') {
    return (
      <StatusCard 
        title="Server Unavailable" 
        message="We couldn't connect to the backend. You can continue with limited functionality in demo mode."
        icon={() => <ServerOff className="h-10 w-10 text-destructive" />}
      >
        <Button onClick={handleStartDemoMode} className="w-full">
          Continue in Demo Mode
        </Button>
      </StatusCard>
    );
  }

  return children;
};

export default AppInitializer;