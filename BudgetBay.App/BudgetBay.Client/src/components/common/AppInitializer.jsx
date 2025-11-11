import { useState, useEffect, useRef } from 'react';
import { checkBackendStatus } from '../../lib/healthCheck';
import { startMockWorker } from '../../mocks';

const AppInitializer = ({ children }) => {
  const [status, setStatus] = useState('checking'); 
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
        const isLiveServerOnline = await checkBackendStatus();
        setStatus(isLiveServerOnline ? 'online' : 'offline');
      }
    };

    initializeApp();
  }, []);

  const handleStartDemoMode = () => {
    sessionStorage.setItem('demoMode', 'true');
    window.location.reload();
  };

  const LoadingCard = ({ title, message }) => (
    <div className="flex justify-center items-center min-h-screen bg-background p-5">
      <div className="bg-surface p-10 rounded-xl shadow-lg text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-text-base mb-4">{title}</h2>
        <p className="text-text-muted leading-relaxed">{message}</p>
      </div>
    </div>
  );

  if (status === 'checking') {
    return <LoadingCard title="Connecting to Server..." message="Please wait while we check the backend status." />;
  }

  if (status === 'initializing_mock') {
    return <LoadingCard title="Starting Demo Mode..." message="Please wait while we prepare the application." />;
  }

  if (status === 'offline') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background p-5">
        <div className="bg-surface p-10 rounded-xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-error mb-4">Server Unavailable</h1>
          <p className="text-text-muted leading-relaxed mb-6">We couldn't connect to the backend. You can continue with limited functionality in demo mode.</p>
          <button onClick={handleStartDemoMode} className="btn-primary w-full">
            Continue in Demo Mode
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AppInitializer;