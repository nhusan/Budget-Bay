import { useState, useEffect, useRef } from 'react';
import { checkBackendStatus } from '../../lib/healthCheck';
import { startMockWorker } from '../../mocks';
import styles from './AppInitializer.module.css';

const AppInitializer = ({ children }) => {
  const [status, setStatus] = useState('checking'); 
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    const initializeApp = async () => {
      const isDemo = sessionStorage.getItem('demoMode') === 'true';

      if (isDemo) {
        // --- DEMO MODE FLOW ---
        setStatus('initializing_mock');
        await startMockWorker();
        const isMockServerReady = await checkBackendStatus();
        
        if (isMockServerReady) {
          setStatus('online');
        } else {
          setStatus('offline');
        }

      } else {
        // --- LIVE MODE FLOW ---
        const isLiveServerOnline = await checkBackendStatus();

        if (isLiveServerOnline) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      }
    };

    initializeApp();
  }, []); // The effect still runs only on mount, but the ref prevents the logic from re-running

  const handleStartDemoMode = () => {
    sessionStorage.setItem('demoMode', 'true');
    window.location.reload();
  };

  if (status === 'checking') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Connecting to Server...</h2>
          <p>Please wait while we check the backend status.</p>
        </div>
      </div>
    );
  }

  if (status === 'initializing_mock') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Starting Demo Mode...</h2>
          <p>Please wait while we prepare the application.</p>
        </div>
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Server Unavailable</h1>
          <p>We couldn't connect to the backend. You can continue with limited functionality in demo mode.</p>
          <button
            onClick={handleStartDemoMode}
            className={styles.demoButton}
          >
            Continue in Demo Mode
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AppInitializer;