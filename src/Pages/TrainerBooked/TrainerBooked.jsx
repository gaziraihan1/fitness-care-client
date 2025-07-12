import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SubscriptionCards from "../../Components/Payment/SubscriptionCards";
import { motion } from "framer-motion";

const TrainerBooked = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const selectedSlot = new URLSearchParams(location.search).get("day");

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    navigate("/payment", {
      state: {
        trainer,
        slot: selectedSlot,
        package: pkg,
      },
    });
  };

  if (isLoading)
    return <p className="text-center text-lg text-blue-600 mt-10">Loading trainer details...</p>;
  if (isError || !trainer)
    return <p className="text-center text-red-600 mt-10">Failed to load trainer data.</p>;

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-blue-700"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Book {trainer.fullName}
      </motion.h1>

      {/* Trainer Info Card */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-10 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center md:justify-start">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-full border-4 border-blue-400"
          />
        </div>

        <div className="space-y-2 text-gray-800">
          <h2 className="text-2xl font-semibold text-blue-600">
            {trainer.fullName}
          </h2>
          <p>
            <strong>Slot:</strong> <span className="text-blue-500">{selectedSlot}</span>
          </p>
          <p>
            <strong>Experience:</strong>{" "}
            {trainer.experience ? `${trainer.experience} years` : "N/A"}
          </p>
          <p>
            <strong>Skills:</strong> {trainer.skills?.join(", ")}
          </p>
          <p>
            <strong>Available Days:</strong> {trainer.availableDays?.join(", ")}
          </p>
          <p>
            <strong>Time:</strong> {trainer.availableTime}
          </p>
          <p>
            <strong>Bio:</strong>{" "}
            <span className="text-sm text-gray-600 italic">
              {trainer.additionalInfo || "No additional info provided."}
            </span>
          </p>
        </div>
      </motion.div>

      {/* Membership Plans */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Choose Your Membership Plan
        </h2>
        <SubscriptionCards onSelect={handlePackageSelect} />
      </motion.div>
    </div>
  );
};

export default TrainerBooked;
