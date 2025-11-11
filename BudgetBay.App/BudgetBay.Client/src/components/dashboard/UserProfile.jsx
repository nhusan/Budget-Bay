import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const UserProfile = ({ userInfo, onFileChange, isUploading, uploadError }) => {
    return (
        <Card className="flex flex-col items-center text-center">
            <CardHeader className="w-full">
                <CardTitle>My Info</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center">
                <div className="relative w-36 h-36 mb-5">
                    <input 
                        type="file"
                        id="profilePicInput"
                        style={{ display: 'none' }}
                        onChange={onFileChange}
                        accept="image/png, image/jpeg"
                        disabled={isUploading}
                    />
                    <label htmlFor="profilePicInput" className="block w-full h-full rounded-full overflow-hidden cursor-pointer relative border-4 border-muted">
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
                <p className="text-card-foreground"><strong>Username:</strong> {userInfo?.username}</p>
                <p className="text-card-foreground"><strong>Email:</strong> {userInfo?.email}</p>
                {uploadError && <p className="text-destructive mt-4 text-center w-full">{uploadError}</p>}
            </CardContent>
        </Card>
    );
};

export default UserProfile;