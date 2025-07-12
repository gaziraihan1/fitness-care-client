import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const NewClass = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const axiosSecure = useAxiosSecure();
  const [imagePreview, setImagePreview] = useState("");

  const onSubmit = async (data) => {
    const classData = {
      className: data.className.trim(),
      image: data.image,
      details: data.details.trim(),
      additionalInfo: data.additionalInfo?.trim() || "",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/classes", classData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "New class added!", "success");
        reset();
        setImagePreview("");
      }
    } catch (err) {
      Swal.fire("❌ Error", "Something went wrong.", "error", err);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl max-w-2xl mx-auto mt-12 border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">➕ Add New Class</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Class Name */}
        <div>
          <label className="block font-semibold mb-1">Class Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("className", { required: "Class name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Yoga, Strength Training"
          />
          {errors.className && <p className="text-red-500 text-sm mt-1">{errors.className.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold mb-1">Image URL <span className="text-red-500">*</span></label>
          <input
            type="url"
            {...register("image", {
              required: "Image URL is required",
              onChange: (e) => setImagePreview(e.target.value)
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste image URL here"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover mt-3 rounded-lg border"
            />
          )}
        </div>

        {/* Details */}
        <div>
          <label className="block font-semibold mb-1">Details <span className="text-red-500">*</span></label>
          <textarea
            {...register("details", { required: "Details are required" })}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the class in detail..."
          ></textarea>
          {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
        </div>

        {/* Additional Info */}
        <div>
          <label className="block font-semibold mb-1">Additional Info (optional)</label>
          <textarea
            {...register("additionalInfo")}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
            placeholder="Mention anything extra..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition"
        >
          {isSubmitting ? "Adding..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default NewClass;
