const UserAddress = ({ 
    userInfo, 
    isEditing, 
    addressForm, 
    error, 
    onEdit, 
    onCancel, 
    onChange, 
    onSubmit 
}) => {
    // Renders the address form when in editing mode
    if (isEditing) {
        return (
            <>
                <h2 className="text-2xl font-semibold text-text-base mb-4 pb-3 border-b border-border">My Address</h2>
                <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <input type="text" name="streetNumber" value={addressForm.streetNumber || ''} onChange={onChange} placeholder="Street Number" required className="input-base" />
                    <input type="text" name="streetName" value={addressForm.streetName || ''} onChange={onChange} placeholder="Street Name" required className="input-base md:col-span-2" />
                    <input type="text" name="aptNumber" value={addressForm.aptNumber || ''} onChange={onChange} placeholder="Apt/Suite (Optional)" className="input-base md:col-span-2" />
                    <input type="text" name="city" value={addressForm.city || ''} onChange={onChange} placeholder="City" required className="input-base" />
                    <input type="text" name="state" value={addressForm.state || ''} onChange={onChange} placeholder="State" required className="input-base" />
                    <input type="text" name="zipCode" value={addressForm.zipCode || ''} onChange={onChange} placeholder="Zip Code" required className="input-base" />
                    {error && <p className="text-error text-sm md:col-span-2">{error}</p>}
                    <div className="md:col-span-2 flex gap-3 justify-end mt-2">
                        <button type="button" onClick={onCancel} className="btn-primary bg-slate-200 text-slate-700 hover:bg-slate-300">Cancel</button>
                        <button type="submit" className="btn-primary">Save Address</button>
                    </div>
                </form>
            </>
        );
    }

    // Renders the address display or add prompt
    return (
        <>
            <h2 className="text-2xl font-semibold text-text-base mb-4 pb-3 border-b border-border">My Address</h2>
            {userInfo?.address ? (
                <div className="text-text-base leading-relaxed">
                    <p>{userInfo.address.streetNumber} {userInfo.address.streetName} {userInfo.address.aptNumber || ''}</p>
                    <p>{userInfo.address.city}, {userInfo.address.state} {userInfo.address.zipCode}</p>
                    <button onClick={onEdit} className="btn-primary mt-4">Update Address</button>
                </div>
            ) : (
                <div>
                    <p className="text-text-muted mb-4">You have not added an address yet.</p>
                    <button onClick={onEdit} className="btn-primary">Add Address</button>
                </div>
            )}
        </>
    );
};

export default UserAddress;