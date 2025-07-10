import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: trainer = {} } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  return (
    <section className="max-w-6xl mx-auto p-6 lg:flex gap-10">
      {/* Trainer Info */}
      <div className="lg:w-2/3 space-y-4">
        <img
          src={trainer.profileImage}
          alt={trainer.fullName}
          className="w-full h-80 object-cover rounded-lg"
        />
        <h2 className="text-3xl font-bold">{trainer.fullName}</h2>
        <p><strong>Experience:</strong> {trainer.experience || "2+ years"}</p>
        <p><strong>Skills:</strong> {trainer.skills?.join(", ")}</p>
        <p><strong>Additional Info:</strong> {trainer.additionalInfo}</p>
      </div>

      {/* Available Slots */}
      <div className="lg:w-1/3 mt-6 lg:mt-0 space-y-4">
        <h3 className="text-2xl font-semibold">Available Slots 🕒</h3>
        <div className="grid grid-cols-2 gap-3">
          {trainer.availableDays?.map((day, index) => (
            <button
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
              onClick={() => navigate(`/bookTrainer/${trainer._id}?day=${day}`)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Be A Trainer CTA */}
        <div className="mt-10 p-4 bg-gray-100 rounded text-center">
          <p className="text-lg font-medium mb-2">Inspired to be a Trainer?</p>
          <button
            onClick={() => navigate("/beATrainer")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Become a Trainer
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrainerDetails;
