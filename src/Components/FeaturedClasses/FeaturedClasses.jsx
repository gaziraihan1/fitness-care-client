import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaDumbbell, FaFire, FaArrowRight } from "react-icons/fa";

const FeaturedClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredClasses = [], isLoading } = useQuery({
    queryKey: ["featured-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-classes");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Classes...</p>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            🔥 Featured Classes
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore our most popular and highly booked classes, carefully
            curated to help you reach your fitness goals.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredClasses.map((cls) => (
            <div
              key={cls._id}
              className="group bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-transparent hover:border-blue-200 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={cls.image}
                  alt={cls.className}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
                <FaDumbbell className="text-blue-600" /> {cls.className}
              </h3>

              <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                {cls.details.length > 120
                  ? cls.details.slice(0, 120) + "..."
                  : cls.details}
              </p>

              <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FaFire className="text-red-500" /> {cls.bookings || 0}{" "}
                  Bookings
                </span>

                <Link
                  to={`/class/${cls._id}`}
                  className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Know More <FaArrowRight />
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
