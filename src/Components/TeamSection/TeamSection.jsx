import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";

const TeamSection = () => {

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ["homeTrainers"],
    queryFn: async () => {
      const res = await axios.get("/trainers");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading trainers...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="text-center">
        <p className="text-red-500 font-medium">
          Failed to load trainers. Please try again later.
        </p>
      </section>
    );
  }

  const displayedTrainers = trainers.slice(0, 3);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          🌟 Meet Our Trainers
        </h2>
        <p className="text-gray-600 mt-3 mb-12 max-w-2xl mx-auto">
          Learn from the best! Our trainers are experienced professionals ready
          to help you achieve your fitness and lifestyle goals.
        </p>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {displayedTrainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
            >
              <img
                src={
                  trainer.photoURL ||
                  trainer.profileImage ||
                  "https://via.placeholder.com/300x300?text=Trainer"
                }
                alt={trainer.name || trainer.fullName}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-100 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {trainer.name || trainer.fullName}
              </h3>
              <p className="text-sm text-blue-600 font-medium mt-1">
                {Array.isArray(trainer.skills)
                  ? trainer.skills.join(", ")
                  : trainer.expertise || "Fitness Expert"}
              </p>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {trainer.bio ||
                  trainer.additionalInfo ||
                  "Passionate about guiding you through your fitness journey with personalized plans."}
              </p>
              <Link to={`/trainerDetails/${trainer._id}`}>
              <button className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-xl transition-all">
                View Profile
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
