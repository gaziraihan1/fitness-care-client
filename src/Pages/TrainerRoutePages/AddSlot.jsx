import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect } from "react";

const dayOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const AddSlot = () => {
  useEffect(() => {
    document.title = "Fitness Care | Add Slot";
  }, []);
  const { register, handleSubmit, reset, setValue } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: trainerInfo, isLoading } = useQuery({
    queryKey: ["trainerInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainerApplications/${user.email}`);
      return res.data;
    },
  });

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const selectedDays = Array.isArray(data.days)
      ? data.days.map((d) => d.value)
      : [];

    const slotData = {
      trainerEmail: user.email,
      slotName: data.slotName,
      slotTime: data.slotTime,
      days: selectedDays,
      classId: data.classId,
      notes: data.notes || "",
    };

    try {
      const res = await axiosSecure.post("/slots", slotData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Slot added successfully", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add slot", "error");
    }
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-800 dark:text-gray-200">
        Loading trainer info...
      </p>
    );

  const defaultDays =
    trainerInfo?.availableDays?.map((day) => ({
      value: day,
      label: day,
    })) || [];

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow p-6 rounded mt-8 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Add New Slot
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            value={trainerInfo?.fullName || ""}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            value={trainerInfo?.email || ""}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Available Days</label>
          <Select
            isMulti
            defaultValue={defaultDays}
            options={dayOptions}
            name="days"
            onChange={(selected) => setValue("days", selected)}
            className="text-sm dark:text-gray-200"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "#3b82f6",
                primary: "#2563eb",
                neutral0: "#1f2937",
                neutral80: "#f9fafb",
              },
            })}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Slot Name</label>
          <input
            {...register("slotName", { required: true })}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="Morning Slot"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Slot Time</label>
          <input
            {...register("slotTime", { required: true })}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="Ex: 10:00 AM - 11:00 AM"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Class</label>
          <select
            {...register("classId", { required: "Please select a class" })}
            className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            defaultValue=""
          >
            <option value="" disabled>
              Select a class
            </option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Other Notes</label>
          <textarea
            {...register("notes")}
            rows={3}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="Any additional info..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-2 rounded transition"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlot;
