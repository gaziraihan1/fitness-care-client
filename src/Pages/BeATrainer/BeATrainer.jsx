import { useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCloudUploadAlt } from "react-icons/fa";

import Swal from "sweetalert2";

const daysOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const skillOptions = ["Cardio", "Strength", "Yoga", "Pilates", "CrossFit"];
const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const BeATrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDays, setSelectedDays] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [uploading, setUploading] = useState(false);

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", upload_preset); // 👈 Replace
    formData.append("cloud_name", cloud_name); // 👈 Replace

    const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.secure_url; // 👈 Return image URL
  };

  const onSubmit = async (data) => {
    setUploading(true);
    let imageUrl = "";

    try {
      imageUrl = await uploadImageToCloudinary(data.profileImage[0]);
    } catch (error) {
      Swal.fire("Error", "Image upload failed", "error", error);
      return;
    }

    const trainerData = {
      fullName: data.fullName,
      email: user.email,
      age: data.age,
      profileImage: imageUrl,
      skills: data.skills,
      availableDays: selectedDays.map((day) => day.value),
      availableTime: data.availableTime,
      additionalInfo: data.additionalInfo,
      status: "pending",
    };

    const res = await axiosSecure.post("/trainerApplications", trainerData);
    setUploading(false);

    if (res.data.insertedId) {
      Swal.fire({
        title: "Application Submitted!",
        text: "Your application is now under review. Status: Pending.",
        icon: "success",
        confirmButtonText: "Okay",
      });

      reset();
      setSelectedDays([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded my-8">
      <h2 className="text-2xl font-semibold mb-6">Apply to be a Trainer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="font-medium">Full Name</label>
          <input {...register("fullName", { required: true })} className="w-full border px-4 py-2 rounded" />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="font-medium">Email</label>
          <input defaultValue={user?.email} readOnly className="w-full bg-gray-100 border px-4 py-2 rounded" />
        </div>

        {/* Age */}
        <div>
          <label className="font-medium">Age</label>
          <input type="number" {...register("age", { required: true })} className="w-full border px-4 py-2 rounded" />
        </div>

        {/* Profile Image */}
        {/* Profile Image Upload */}
<div>
  <label className="block font-medium mb-2">Profile Image</label>

  <label
    htmlFor="profileImage"
    className="flex items-center justify-center border  p-4 rounded-lg cursor-pointer hover:bg-blue-50 transition"
  >
    <div className="flex flex-col items-center text-blue-600">
      <FaCloudUploadAlt className="text-3xl mb-2" />
      <p className="text-sm font-medium">Click to upload image</p>
    </div>
  </label>

  <input
    id="profileImage"
    type="file"
    accept="image/*"
    {...register("profileImage", { required: true })}
    className="hidden"
  />
</div>


        {/* Skills */}
        <div>
          <label className="font-medium">Skills</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {skillOptions.map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input type="checkbox" value={skill} {...register("skills")} />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label className="font-medium">Available Days</label>
          <Select options={daysOptions} isMulti value={selectedDays} onChange={setSelectedDays} isSearchable={false} />
        </div>

        {/* Available Time */}
        <div>
          <label className="font-medium">Available Time</label>
          <input {...register("availableTime", { required: true })} className="w-full border px-4 py-2 rounded" placeholder="e.g. 8AM - 4PM" />
        </div>

        {/* Additional Info */}
        <div>
          <label className="font-medium">Additional Info</label>
          <textarea {...register("additionalInfo")} className="w-full border px-4 py-2 rounded" />
        </div>

        {/* Submit */}
        <div>
          <button type="submit" disabled={uploading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            {uploading ? "Uploading..." : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeATrainer;
