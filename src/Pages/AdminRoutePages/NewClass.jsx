import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const NewClass = () => {
  useEffect(() => {
    document.title = "Fitness Care | Add Class";
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const classOptions = [
    "Yoga",
    "Power Yoga",
    "HIIT",
    "Zumba",
    "Strength Training",
    "Cardio Kickboxing",
    "CrossFit",
    "Pilates",
    "Spin Class",
    "BodyPump",
    "Bootcamp",
    "Calisthenics",
    "Stretch & Mobility",
    "Circuit Training",
    "Barre",
    "Aerobics",
    "Core Conditioning",
    "TRX Training",
    "Functional Fitness",
    "Personal Training",
  ];

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", upload_preset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      if (!imageFile) {
        return Swal.fire("Error", "Please select an image file", "error");
      }

      const imageUrl = await uploadImageToCloudinary(imageFile);

      const classData = {
        className: data.className.trim(),
        image: imageUrl,
        details: data.details.trim(),
        additionalInfo: data.additionalInfo?.trim() || "",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/classes", classData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "New class added!", "success");
        reset();
        setImageFile(null);
        setImagePreview("");
      }
    } catch (err) {
      Swal.fire(
        "❌ Error",
        "Something went wrong while uploading",
        "error",
        err
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-xl max-w-2xl mx-auto mt-12 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 dark:text-blue-400">
        ➕ Add New Class
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">
            Class Name <span className="text-red-500">*</span>
          </label>
          <select
            {...register("className", { required: "Class name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            defaultValue=""
          >
            <option value="" disabled>
              Select a class
            </option>
            {classOptions.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </select>
          {errors.className && (
            <p className="text-red-500 text-sm mt-1">
              {errors.className.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <div className="relative border-2 border-gray-400 p-6 rounded-lg flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-700 text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition">
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <FaCloudUploadAlt className="text-4xl text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              {imageFile?.name || "Click or drag to upload image"}
            </span>
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover mt-3 rounded-lg border border-gray-300 dark:border-gray-600"
            />
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Details <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("details", { required: "Details are required" })}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="Describe the class in detail..."
          ></textarea>
          {errors.details && (
            <p className="text-red-500 text-sm mt-1">
              {errors.details.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Additional Info (optional)
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="Mention anything extra..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          {isSubmitting ? "Adding..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default NewClass;
