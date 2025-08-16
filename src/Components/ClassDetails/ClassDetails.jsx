import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: classData, isLoading } = useQuery({
    queryKey: ["class-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/allClasses/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!classData) {
    return <p className="text-center mt-10 text-gray-600">Class not found.</p>;
  }

  const { className, image, details, bookings, trainers } = classData;
  console.log(trainers)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      >
        <img src={image} alt={className} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">{className}</h2>
          <p className="text-gray-600 mb-3">{details || "No details available."}</p>
          <p className="text-sm text-gray-400">Total Bookings: {bookings}</p>
        </div>
      </motion.div>

      <h3 className="text-2xl font-semibold text-gray-700 mb-5 text-center">
        Trainers
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {trainers?.map((trainer, index) => (
          <motion.div
            key={trainer.trainerId}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-bold text-gray-800">{trainer.name}</h4>
              <p className="text-gray-500 capitalize">{trainer.role}</p>
              <Link
  to={`/trainerDetails/${trainer.trainerId}`}
  className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold shadow-lg hover:scale-105 transform transition-all inline-block"
>
  View Profile
</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClassDetails;
