import React from 'react';
import styles from './DemoModeBanner.module.css';

const DemoModeBanner = () => {
    
    const handleSwitchToLive = () => {
        // Remove the flag that forces demo mode
        sessionStorage.removeItem('demoMode');
        // Reload the page to re-trigger the health check
        window.location.reload();
    };

    return (
        <div className={styles.banner}>
            <p className={styles.bannerText}>
                You are currently in <strong>Demo Mode</strong>. Some features may be limited.
            </p>
            <button onClick={handleSwitchToLive} className={styles.bannerButton}>
                Switch to Live Mode
            </button>
        </div>
    );
};

export default DemoModeBanner;