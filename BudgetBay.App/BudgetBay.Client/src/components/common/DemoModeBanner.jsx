const DemoModeBanner = () => {
    const handleSwitchToLive = () => {
        sessionStorage.removeItem('demoMode');
        window.location.reload();
    };

    return (
        <div className="fixed top-[5.2rem] left-0 w-full bg-primary text-white flex justify-center items-center py-2 px-5 z-40 shadow-md gap-5 text-sm">
            <p className="m-0">
                You are currently in <strong>Demo Mode</strong>. Some features may be limited.
            </p>
            <button onClick={handleSwitchToLive} className="bg-white text-primary border border-transparent py-1 px-3 rounded-md cursor-pointer font-semibold transition-all hover:bg-gray-100">
                Switch to Live Mode
            </button>
        </div>
    );
};

export default DemoModeBanner;