import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaDumbbell, FaFire } from "react-icons/fa";

const FeaturedClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredClasses = [], isLoading } = useQuery({
    queryKey: ["featured-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/featured");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-12 font-semibold text-blue-500">Loading featured classes...</div>;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700">🔥 Featured Classes</h2>
          <p className="text-gray-600 mt-2">Explore our most popular and highly booked classes!</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
            >
              <img
                src={cls.image}
                alt={cls.className}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <FaDumbbell className="text-blue-600" /> {cls.className}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {cls.details.length > 100 ? cls.details.slice(0, 100) + "..." : cls.details}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FaFire className="text-red-500" /> {cls.bookingCount || 0} Bookings
                </span>
                <Link
                  to={`/class/${cls._id}`}
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
