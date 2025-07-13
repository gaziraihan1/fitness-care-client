import { useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
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

const BeATrainer = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedDays, setSelectedDays] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const trainerData = {
      fullName: data.fullName,
      email: user.email,
      age: data.age,
      profileImage: data.profileImage,
      skills: data.skills,
      availableDays: selectedDays.map((day) => day.value),
      availableTime: data.availableTime,
      additionalInfo: data.additionalInfo,
      status: "pending",
    };

    const res = await axiosSecure.post("/trainerApplications", trainerData);

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
        <div>
          <label className="font-medium">Full Name</label>
          <input
            {...register("fullName", { required: true })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input
            defaultValue={user?.email}
            readOnly
            className="w-full bg-gray-100 border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium">Age</label>
          <input
            type="number"
            {...register("age", { required: true })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label className="font-medium">Profile Image URL</label>
          <input
            {...register("profileImage", { required: true })}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

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

        <div>
          <label className="font-medium">Available Days</label>
          <Select
            options={daysOptions}
            isMulti
            value={selectedDays}
            onChange={setSelectedDays}
            isSearchable={false}
          />
        </div>

        <div>
          <label className="font-medium">Available Time</label>
          <input
            {...register("availableTime", { required: true })}
            className="w-full border px-4 py-2 rounded"
            placeholder="e.g. 8AM - 4PM"
          />
        </div>

        <div>
          <label className="font-medium">Additional Info</label>
          <textarea
            {...register("additionalInfo")}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeATrainer;
