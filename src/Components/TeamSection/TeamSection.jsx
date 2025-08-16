import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";

const TeamSection = () => {
  const axiosInstance = useAxios();

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ["homeTrainers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trainers");
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
    <section className="px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800">
            🌟 Meet Our Trainers
          </h2>
          <p className="text-gray-600 mt-3 mb-12 max-w-2xl mx-auto">
            Learn from the best! Our trainers are experienced professionals
            ready to help you achieve your fitness and lifestyle goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {displayedTrainers.map((trainer, index) => (
            <motion.div
              key={trainer._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center justify-between text-center border border-transparent hover:border-blue-200"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            >
              <motion.img
                src={
                  trainer.photoURL ||
                  trainer.profileImage ||
                  "https://via.placeholder.com/300x300?text=Trainer"
                }
                alt={trainer.name || trainer.fullName}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-100 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
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
                <motion.button
                  className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Profile
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
