"use client"
import { Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { addProfile, getProfileById, updateProfile } from "@/lib/hooks/profile";

const ProfileModal = ({ setUserProfile, setIsProfileModalOpen, userProfile, userId }: any) => {
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(false)

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const loadProfile = async () => {
    try {
      setInitialLoad(true);
      const data = await getProfileById(userId);

      if (data && data.length === 1) {
        setEditedProfile(data[0]);
        setUserProfile(data[0]);
        setShouldUpdate(true)
      }
    } catch (error) {
      toast.error('Failed to load profile');
      console.error(error);
    } finally {
      setInitialLoad(false);
    }
  };

  const handleSave = async () => {
    if (!editedProfile.name?.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!editedProfile.currency) {
      toast.error('Currency is required');
      return;
    }

    try {
      setLoading(true);
      
      const updates = {
        name: editedProfile.name.trim(),
        phone: editedProfile.phone?.trim() || null,
        currency: editedProfile.currency,
        
      };


      const updatedData = shouldUpdate ? await updateProfile(userId, updates) : await addProfile({...updates, user_id: userId});
      
      if (updatedData && updatedData[0]) {
        setUserProfile(updatedData[0]);
        toast.success('Profile updated successfully!');
        setIsProfileModalOpen(false);
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="rounded-lg shadow-xl w-full max-w-md bg-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Manage Profile</h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {initialLoad ? (
            <div className="text-center py-8 text-gray-500">Loading profile...</div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editedProfile.name || ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    max={10}
                    maxLength={10}
                    value={editedProfile.phone || ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300"
                    placeholder="Enter your phone number"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={editedProfile.currency || 'GHS'}
                    onChange={(e) => setEditedProfile({ ...editedProfile, currency: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-gray-300"
                    disabled={loading}
                  >
                    <option value="GHS">GHS - Ghanaian Cedi</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="NGN">NGN - Nigerian Naira</option>
                    <option value="ZAR">ZAR - South African Rand</option>
                    <option value="KES">KES - Kenyan Shilling</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-2 px-4 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;