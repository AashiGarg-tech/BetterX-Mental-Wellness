import React, { useState } from "react";
import { User, Mail, Edit, Save } from "lucide-react";

const UserProfile = ({ user, token, onUpdateProfile }) => {
  const [userName, setUserName] = useState(user?.name || "User");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Default avatar (static)
  const avatarUrl =
    "https://placehold.co/120x120/93c5fd/ffffff?text=U";

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: userName }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update name");
      }

      const updated = await res.json();
      onUpdateProfile(updated);

      setIsSaving(false);
      setIsEditingName(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setIsSaving(false);
      alert("Could not update name.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-2xl mt-10">
        
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-3 mb-8 flex items-center space-x-3">
          <User className="w-7 h-7 text-blue-600" />
          <span>My Profile</span>
        </h1>

        {/* Avatar section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-28 h-28 rounded-full shadow-lg border-4 border-white ring-4 ring-blue-200 overflow-hidden">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="mt-3 text-xl font-semibold text-gray-800">
            {userName}
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-6">

          {/* Editable Name */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>

            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={!isEditingName}
                className={`w-full py-2 px-3 text-lg rounded-md outline-none transition duration-150 ${
                  isEditingName
                    ? "bg-white border border-blue-400 focus:ring-2 focus:ring-blue-200"
                    : "bg-transparent text-gray-800"
                }`}
                required
              />

              <button
                type="button"
                onClick={() => setIsEditingName(!isEditingName)}
                className="text-blue-500 hover:text-blue-700 transition p-1 rounded-full"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Email (non editable) */}
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (Non-Editable)
            </label>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <p className="w-full py-2 text-lg text-gray-600 font-medium">
                {user.email}
              </p>
            </div>
          </div>

          {/* Save Button */}
          {isEditingName && (
            <div className="pt-4 border-t mt-8">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition shadow-md disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-4 border-t-white border-green-200 rounded-full"></span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
