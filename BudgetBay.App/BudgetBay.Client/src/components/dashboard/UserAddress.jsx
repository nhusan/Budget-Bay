import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const UserAddress = ({ 
    userInfo, isEditing, addressForm, error, 
    onEdit, onCancel, onChange, onSubmit 
}) => {
    if (isEditing) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>My Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input type="text" name="streetNumber" value={addressForm.streetNumber || ''} onChange={onChange} placeholder="Street Number" required />
                        <Input type="text" name="streetName" value={addressForm.streetName || ''} onChange={onChange} placeholder="Street Name" required className="md:col-span-2" />
                        <Input type="text" name="aptNumber" value={addressForm.aptNumber || ''} onChange={onChange} placeholder="Apt/Suite (Optional)" className="md:col-span-2" />
                        <Input type="text" name="city" value={addressForm.city || ''} onChange={onChange} placeholder="City" required />
                        <Input type="text" name="state" value={addressForm.state || ''} onChange={onChange} placeholder="State" required />
                        <Input type="text" name="zipCode" value={addressForm.zipCode || ''} onChange={onChange} placeholder="Zip Code" required />
                        {error && <p className="text-destructive text-sm md:col-span-2">{error}</p>}
                        <div className="md:col-span-2 flex gap-3 justify-end mt-2">
                            <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
                            <Button type="submit">Save Address</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>My Address</CardTitle>
            </CardHeader>
            <CardContent>
                {userInfo?.address ? (
                    <div className="text-foreground leading-relaxed">
                        <p>{userInfo.address.streetNumber} {userInfo.address.streetName} {userInfo.address.aptNumber || ''}</p>
                        <p>{userInfo.address.city}, {userInfo.address.state} {userInfo.address.zipCode}</p>
                        <Button onClick={onEdit} className="mt-4">Update Address</Button>
                    </div>
                ) : (
                    <div>
                        <p className="text-muted-foreground mb-4">You have not added an address yet.</p>
                        <Button onClick={onEdit}>Add Address</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default UserAddress;