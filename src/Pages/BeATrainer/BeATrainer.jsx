import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    document.title = "Fitness Care | Be A Trainer";
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDays, setSelectedDays] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState("");

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };
  const experienceOptions = [
    "Less than 1 year",
    "1-2 years",
    "2-3 years",
    "3-5 years",
    "5+ years",
  ];

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
      experience: data.experience,
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
    <div className="max-w-3xl bg-white dark:bg-gray-800 mx-auto p-6  shadow rounded my-8">
      <h2 className="text-2xl text-black dark:text-gray-200 font-semibold mb-6">
        Apply to be a Trainer
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium text-black dark:text-white/90">
            Full Name
          </label>
          <input
            {...register("fullName", { required: true })}
            className="w-full border dark:border-gray-700 dark:bg-gray-800 text-black dark:text-white/80 px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium text-black dark:text-white/90">
            Email
          </label>
          <input
            defaultValue={user?.email}
            readOnly
            className="w-full bg-gray-100 dark:bg-gray-800 dark:border-gray-700  text-black dark:text-white/80 border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium text-black dark:text-white/90">
            Age
          </label>
          <input
            type="number"
            {...register("age", { required: true })}
            className="w-full border px-4 py-2 rounded dark:border-gray-700 dark:bg-gray-800 text-black dark:text-white/80"
          />
        </div>
        <div>
          <label className="font-medium text-black dark:text-white/90 block mb-1">
            Experience <span className="text-red-500">*</span>
          </label>
          <select
            {...register("experience", { required: true })}
            className="w-full border px-4 py-2 rounded dark:border-gray-700 dark:bg-gray-800 text-black dark:text-white/80"
            defaultValue=""
          >
            <option value="" disabled>
              Select your experience
            </option>
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-black dark:text-white/90">
            Upload Profile Image <span className="text-red-500">*</span>
          </label>

          <div className="relative border-2 border-gray-400 p-6 rounded-lg flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-700 dark:hover:bg-gray-800 text-center cursor-pointer hover:bg-blue-100 transition">
            <input
              type="file"
              accept="image/*"
              {...register("profileImage", { required: "Image is required" })}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <FaCloudUploadAlt className="text-4xl text-blue-600 dark:text-gray-300 mb-2" />
            <span className="text-blue-700 dark:text-gray-200 font-medium">
              {imageFile?.name || "Click or drag to upload image"}
            </span>
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-56 h-48 object-cover mt-3 rounded-lg border"
            />
          )}

          {errors.profileImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profileImage.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-medium text-black dark:text-white/90">
            Skills
          </label>
          <div className="flex flex-wrap gap-4 mt-2 text-black dark:text-white/70">
            {skillOptions.map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input type="checkbox" value={skill} {...register("skills")} />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="font-medium text-black dark:text-white/90">
            Available Days
          </label>
          <Select
            options={daysOptions}
            isMulti
            value={selectedDays}
            onChange={setSelectedDays}
            isSearchable={false}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: document.documentElement.classList.contains(
                  "dark"
                )
                  ? "#1f2937" // gray-800
                  : "#fff",
                color: document.documentElement.classList.contains("dark")
                  ? "#d1d5db" // gray-300
                  : "#000",
                borderColor: document.documentElement.classList.contains("dark")
                  ? "#374151" // gray-700
                  : "#d1d5db",
                boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "", 
                "&:hover": {
                  borderColor: "#3b82f6",
                },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: document.documentElement.classList.contains(
                  "dark"
                )
                  ? "#1f2937"
                  : "#fff",
                color: document.documentElement.classList.contains("dark")
                  ? "#e5e7eb"
                  : "#000",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: document.documentElement.classList.contains(
                  "dark"
                )
                  ? "#374151" 
                  : "#e5e7eb", 
                color: document.documentElement.classList.contains("dark")
                  ? "#f9fafb"
                  : "#111827",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: document.documentElement.classList.contains("dark")
                  ? "#f9fafb"
                  : "#111827",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? document.documentElement.classList.contains("dark")
                    ? "#374151"
                    : "#e5e7eb"
                  : "transparent",
                color: document.documentElement.classList.contains("dark")
                  ? "#f9fafb"
                  : "#111827",
              }),
            }}
          />
        </div>

        <div>
          <label className="font-medium text-black dark:text-white/90">
            Available Time
          </label>
          <input
            {...register("availableTime", { required: true })}
            className="w-full border px-4 py-2 rounded dark:border-gray-700 dark:bg-gray-800 text-black dark:text-white/80"
            placeholder="e.g. 8AM - 4PM"
          />
        </div>

        <div>
          <label className="font-medium text-black dark:text-white/90">
            Additional Info
          </label>
          <textarea
            {...register("additionalInfo")}
            className="w-full border px-4 py-2 rounded dark:border-gray-700 dark:bg-gray-800 text-black dark:text-white/80"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {uploading ? "Uploading..." : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeATrainer;
