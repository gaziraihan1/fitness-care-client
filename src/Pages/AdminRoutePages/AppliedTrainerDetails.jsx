import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect } from "react";

const AppliedTrainerDetails = () => {
  useEffect(() => {
      document.title = "Fitness Care | Applied Trainer Details";
    }, []);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });
  trainer;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !trainer)
    return <p className="text-center text-red-500 mt-10">Trainer not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow border">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <img
          src={trainer?.profileImage}
          alt={trainer.fullName}
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="space-y-2 text-gray-700">
          <h2 className="text-3xl font-bold text-blue-700">
            {trainer.fullName}
          </h2>
          <p>
            <span className="font-semibold">Email:</span> {trainer.email}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {trainer.age}
          </p>
          <p>
            <span className="font-semibold">Available Time:</span>{" "}
            {trainer.availableTime}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {trainer.status}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <ul className="list-disc list-inside">
            {trainer.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Available Days</h3>
          <ul className="list-disc list-inside">
            {trainer.availableDays.map((day, idx) => (
              <li key={idx}>{day}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Additional Info</h3>
          <p className="bg-gray-100 p-3 rounded border">
            {trainer.additionalInfo || "No additional information provided."}
          </p>
        </div>

        {trainer.status === "rejected" && trainer.feedback && (
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2 text-red-600">
              Rejection Feedback
            </h3>
            <p className="bg-red-50 p-3 rounded border border-red-300 text-red-800">
              {trainer.feedback}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedTrainerDetails;
