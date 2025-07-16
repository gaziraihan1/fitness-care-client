import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";

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

  const { data: slots = [] } = useQuery({
    queryKey: ["trainerSlots", trainer.email],
    enabled: !!trainer.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots?email=${trainer.email}`);
      return res.data;
    },
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl text-center mb-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">
          🌟 Ready to share your fitness journey?
        </h2>
        <p className="text-gray-600 mt-1 mb-4">
          Apply to become a certified trainer on our platform.
        </p>
        <button
          onClick={() => navigate("/beATrainer")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Become a Trainer
        </button>
      </div>

      <div className="lg:flex gap-10">
        <div className="lg:w-2/3 space-y-5">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-full h-80 object-cover rounded-xl shadow"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            {trainer.fullName}
          </h2>
          <p className="text-gray-700">
            <strong>Experience:</strong> {trainer.experience || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Skills:</strong>{" "}
            {trainer.skills?.length ? trainer.skills.join(", ") : "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Available Days:</strong>{" "}
            {trainer.availableDays?.length
              ? trainer.availableDays.join(", ")
              : "Not specified"}
          </p>
          <p className="text-gray-700">
            <strong>Available Time:</strong> {trainer.availableTime || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>About:</strong>{" "}
            {trainer.additionalInfo || "No additional info provided."}
          </p>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0 space-y-6">
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Available Slots 🕒
            </h3>

            {slots.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {slots.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() =>
                      navigate(`/bookTrainer/${trainer._id}?slotId=${slot._id}`)
                    }
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition text-sm font-medium flex flex-col text-left"
                  >
                    <span className="flex items-center gap-2 text-base font-semibold">
                      <FaCheckCircle className="text-green-500" />{" "}
                      {slot.slotName}
                    </span>
                    <span className="text-xs mt-1 text-gray-400">
                      {slot.slotTime}
                    </span>
                    <span className="text-xs mt-1 italic">
                      Days: {slot.days?.join(", ") || "N/A"}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No slots available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerDetails;
