import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role] = useUserRole();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const [updating, setUpdating] = useState(false);
  const photoURL = watch("photoURL");

  useEffect(() => {
    document.title = "Fitness Care | Profile";
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setValue("photoURL", data.secure_url);
      Swal.fire("Uploaded", "Image uploaded successfully", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Upload Failed", "Could not upload image", "error");
    }
  };

  const onSubmit = async (data) => {
    setUpdating(true);
    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });
      Swal.fire("Success", "Profile updated successfully", "success");
      setUpdating(false);
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error");
    } 
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
      <div className="flex flex-col items-center text-center relative">
        <div className="relative group">
          <img
            src={photoURL || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover"
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
            onClick={() => document.getElementById("upload-photo").click()}
          >
            <FaCloudUploadAlt className="text-white text-2xl" />
          </div>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {user?.displayName || "Your Name"}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Last login: {user?.metadata?.lastSignInTime || "N/A"}
        </p>
        <span className="mt-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm">
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "N/A"}
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        id="upload-photo"
        accept="image/*"
        onChange={handleImageUpload}
        hidden
      />

      {/* Form */}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="hidden"
          {...register("photoURL")}
        />
        <input
          type="email"
          value={user?.email || ""}
          disabled
          className="w-full px-4 py-2 border rounded-xl bg-gray-100 cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={updating}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:scale-105 transform transition duration-300"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
