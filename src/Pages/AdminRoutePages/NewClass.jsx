import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const NewClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const classData = {
      className: data.className,
      image: data.image,
      details: data.details,
      additionalInfo: data.additionalInfo || "",
    };

    try {
      const res = await axiosSecure.post("/classes", classData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Class added successfully!", "success");
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add class", "error", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Class Name</label>
          <input
            type="text"
            {...register("className", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter class name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Details</label>
          <textarea
            {...register("details", { required: true })}
            className="w-full border px-3 py-2 rounded"
            rows={3}
            placeholder="Enter class details"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Info (Optional)</label>
          <textarea
            {...register("additionalInfo")}
            className="w-full border px-3 py-2 rounded"
            rows={2}
            placeholder="Any extra info..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default NewClass;
