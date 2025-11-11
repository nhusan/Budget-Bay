import { Button } from '@/components/ui/Button';

const DemoModeBanner = () => {
    const handleSwitchToLive = () => {
        sessionStorage.removeItem('demoMode');
        window.location.reload();
    };

    return (
        <div className="w-full bg-primary text-primary-foreground flex justify-center items-center py-2 px-5 gap-5 text-sm opacity-100">
            <p className="m-0">
                You are currently in <strong>Demo Mode</strong>. Some features may be limited.
            </p>
            <Button onClick={handleSwitchToLive} variant="secondary" size="sm" className="h-7">
                Switch to Live Mode
            </Button>
        </div>
    );
};

export default DemoModeBanner;