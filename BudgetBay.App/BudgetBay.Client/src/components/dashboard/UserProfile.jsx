const UserProfile = ({ userInfo, onFileChange, isUploading, uploadError }) => {
    return (
        <div className="card-base flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold text-text-base mb-4 pb-3 border-b border-border w-full">My Info</h2>
            
            <div className="relative w-36 h-36 mb-5">
                <input 
                    type="file"
                    id="profilePicInput"
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                    accept="image/png, image/jpeg"
                    disabled={isUploading}
                />
                <label htmlFor="profilePicInput" className="block w-full h-full rounded-full overflow-hidden cursor-pointer relative border-4 border-slate-200">
                    <img 
                        className="w-full h-full object-cover"
                        src={userInfo?.profilePictureUrl || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'} 
                        alt={`${userInfo?.username}'s profile`} 
                    />
                    <div className="absolute inset-0 bg-black/50 text-white flex justify-center items-center font-semibold opacity-0 hover:opacity-100 transition-opacity">
                        <span>Change</span>
                    </div>
                    {isUploading && (
                        <div className="absolute inset-0 bg-white/80 flex justify-center items-center rounded-full">
                            <div className="border-4 border-slate-200 w-9 h-9 rounded-full border-l-primary animate-spin"></div>
                        </div>
                    )}
                </label>
            </div>

            <p className="text-text-base"><strong>Username:</strong> {userInfo?.username}</p>
            <p className="text-text-base"><strong>Email:</strong> {userInfo?.email}</p>
            {uploadError && <p className="text-error mt-4 text-center w-full">{uploadError}</p>}
        </div>
    );
};

export default UserProfile;