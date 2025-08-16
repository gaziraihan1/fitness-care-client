import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { useEffect } from "react";

const AllTrainer = () => {
  useEffect(() => {
    document.title = "Fitness Care | All Trainer";
  }, []);
  const axiosInstance = useAxios();

  const { data: trainers = [] } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trainers");
      return res.data;
    },
  });

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">
        Meet Our Expert Trainers 💪
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transition transform hover:-translate-y-1 hover:shadow-2xl group"
          >
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="p-5 space-y-3">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                {trainer.fullName}
              </h3>

              <p className="text-gray-600 text-sm">
                <strong>Experience:</strong>{" "}
                {trainer.experience
                  ? `${trainer.experience} years`
                  : "2+ years"}
              </p>

              <div>
                <strong className="text-gray-700 text-sm">
                  Available Days:
                </strong>{" "}
                <span className="text-gray-600 text-sm">
                  {trainer.availableDays?.join(", ") || "N/A"}
                </span>
              </div>

              <div className="flex gap-4 mt-2 text-blue-600 text-lg">
                <FaFacebookF className="hover:text-blue-800 cursor-pointer" />
                <FaInstagram className="hover:text-pink-600 cursor-pointer" />
                <FaTwitter className="hover:text-sky-500 cursor-pointer" />
              </div>

              <Link
                to={`/trainerDetails/${trainer._id}`}
                className="inline-block mt-4 w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
              >
                Know More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllTrainer;
