import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { data: trainers = [] } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers");
      return res.data;
    },
  });
  console.log(trainers)

  return (
    <section className="py-12 px-4 lg:px-0 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">Meet Our Trainers 💪</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow rounded-lg p-4 space-y-3 transition duration-300 hover:shadow-lg flex flex-col justify-between"
          >
            <img
              src={trainer.profileImage}
              alt={trainer.fullName}
              className="w-full h-52 object-cover rounded"
            />
            <h3 className="text-xl font-bold">{trainer.fullName}</h3>
            <p><strong>Experience:</strong> {trainer.experience || "2+ years"}</p>
            <div className="flex gap-3 text-xl text-blue-600">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>
            <div>
              <strong>Available Slots:</strong>{" "}
              <span className="text-gray-700">{trainer.availableDays?.join(", ")}</span>
            </div>
            <Link
              to={`/trainerDetails/${trainer._id}`}
              className="mt-2 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition w-full text-center"
            >
              Know More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllTrainer;
