import { useForm, Controller } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Select from "react-select";
import Swal from "sweetalert2";

const dayOptions = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];

const AddSlot = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Get trainer's application data
  const { data: trainerData = {} } = useQuery({
    queryKey: ["trainerApplication", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainerApplications/${user.email}`);
      return res.data;
    },
  });

  // Get all available classes from admin
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const slotData = {
      trainerId: trainerData._id,
      trainerName: trainerData.fullName,
      trainerEmail: trainerData.email,
      profileImage: trainerData.profileImage,
      slotName: data.slotName.trim(),
      slotTime: data.slotTime.trim(),
      availableDays: data.availableDays.map((day) => day.value),
      classId: data.classId,
      notes: data.notes || "",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/slots", slotData);
      if (res.data.insertedId) {
        Swal.fire("✅ Success", "Slot added successfully!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to add slot.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 border">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Add New Slot</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Trainer Info (Read Only) */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={trainerData.fullName || ""}
              readOnly
              className="w-full bg-gray-100 px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={trainerData.email || ""}
              readOnly
              className="w-full bg-gray-100 px-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* Slot Name */}
        <div>
          <label className="block font-medium mb-1">Slot Name</label>
          <input
            type="text"
            {...register("slotName", { required: "Slot name is required" })}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Morning Slot"
          />
          {errors.slotName && <p className="text-red-500 text-sm">{errors.slotName.message}</p>}
        </div>

        {/* Slot Time */}
        <div>
          <label className="block font-medium mb-1">Slot Time</label>
          <input
            type="text"
            {...register("slotTime", { required: "Slot time is required" })}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 7:00 AM - 8:00 AM"
          />
          {errors.slotTime && <p className="text-red-500 text-sm">{errors.slotTime.message}</p>}
        </div>

        {/* Available Days */}
        <div>
          <label className="block font-medium mb-1">Available Days</label>
          <Controller
            name="availableDays"
            control={control}
            rules={{ required: "Please select at least one day" }}
            render={({ field }) => (
              <Select
                {...field}
                options={dayOptions}
                isMulti
                className="text-sm"
              />
            )}
          />
          {errors.availableDays && <p className="text-red-500 text-sm">{errors.availableDays.message}</p>}
        </div>

        {/* Classes Include */}
        <div>
          <label className="block font-medium mb-1">Class</label>
          <select
            {...register("classId", { required: "Please select a class" })}
            className="w-full px-4 py-2 border rounded"
            defaultValue=""
          >
            <option value="" disabled>Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
          {errors.classId && <p className="text-red-500 text-sm">{errors.classId.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium mb-1">Other Info (optional)</label>
          <textarea
            {...register("notes")}
            className="w-full px-4 py-2 border rounded"
            rows={3}
            placeholder="Mention anything extra..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
        >
          {isSubmitting ? "Adding Slot..." : "Add Slot"}
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
