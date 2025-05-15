import React, { useState, ChangeEvent } from 'react';
import { UserCircle } from 'lucide-react';

interface ProfilePictureUploadProps {
  onImageChange: (imageUrl: string) => void;
  error?: string;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ 
  onImageChange,
  error
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Profile Picture
      </label>
      <div className="flex items-center space-x-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
          {preview ? (
            <img src={preview} alt="Profile Preview" className="h-full w-full object-cover" />
          ) : (
            <UserCircle className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-picture-input"
          />
          <label
            htmlFor="profile-picture-input"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Choose Image
          </label>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;