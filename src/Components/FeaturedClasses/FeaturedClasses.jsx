import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaDumbbell, FaFire, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";

const FeaturedClasses = () => {
  const axiosInstance = useAxios();

  const { data: featuredClasses = [], isLoading } = useQuery({
    queryKey: ["featured-classes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/featured-classes");
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
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 tracking-tight">
            🔥 Featured Classes
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore our most popular and highly booked classes, carefully
            curated to help you reach your fitness goals.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {featuredClasses.map((cls, index) => (
    <motion.div
      key={cls._id}
      className="group relative bg-white/30 backdrop-blur-md rounded-3xl shadow-lg border border-transparent hover:border-blue-300 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col"
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="relative mb-5 rounded-xl overflow-hidden">
        <img
          src={cls.image}
          alt={cls.className}
          className="w-full h-52 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity rounded-xl"></div>
        <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {cls.bookings || 0} Bookings
        </span>
      </div>

      <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2 mb-2">
        <FaDumbbell className="text-blue-600" /> {cls.className}
      </h3>

      <p className="text-gray-700 text-sm mb-5 line-clamp-3">
        {cls.details.length > 120
          ? cls.details.slice(0, 120) + "..."
          : cls.details}
      </p>

      <Link
        to={`/allClasses/${cls._id}`}
        className="mt-auto inline-flex items-center justify-center gap-2 text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300"
      >
        Know More <FaArrowRight />
      </Link>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
};

export default FeaturedClasses;
