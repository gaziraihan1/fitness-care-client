import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SubscriptionCards from "../../Components/Payment/SubscriptionCards";
import { motion } from "framer-motion";

const TrainerBooked = () => {
  useEffect(() => {
      document.title = "Fitness Care | Book Trainer";
    }, []);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const slotId = new URLSearchParams(location.search).get("slotId");

  const {
    data: trainer,
    isLoading: trainerLoading,
    isError: trainerError,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
      return res.data;
    },
  });

  const {
    data: slotData,
    isLoading: slotLoading,
    isError: slotError,
  } = useQuery({
    queryKey: ["slot", slotId],
    enabled: !!slotId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/${slotId}`);
      return res.data;
    },
  });
  slotData;

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    navigate("/payment", {
      state: {
        trainer,
        package: pkg,
        classId: slotData.classId,
        slotId: slotData._id,
      },
    });
  };

  if (trainerLoading || slotLoading)
    return (
      <p className="text-center text-lg text-blue-600 mt-10">
        Loading trainer and slot details...
      </p>
    );

  if (trainerError || slotError || !trainer || !slotData)
    return (
      <p className="text-center text-red-600 mt-10">
        Failed to load data. Please try again.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-blue-700 dark:text-gray-100"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Book {trainer.fullName}
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden p-6 mb-10 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center md:justify-start">
          <img
            src={trainer.profileImage}
            alt={trainer.fullName}
            className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-full border-4 border-blue-400 dark:border-blue-800"
          />
        </div>

        <div className="space-y-2 text-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-white">
            {trainer.fullName}
          </h2>

          <p>
            <strong>Slot Name:</strong>{" "}
            <span className="text-blue-500 dark:text-blue-200">{slotData.slotName}</span>
          </p>

          <p>
            <strong>Time:</strong> {slotData.slotTime}
          </p>

          <p>
            <strong>Days:</strong> {slotData.days?.join(", ") || "N/A"}
          </p>

          <p>
            <strong>Class:</strong> {slotData.className || "Not Assigned"}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {trainer.experience ? `${trainer.experience} years` : "N/A"}
          </p>

          <p>
            <strong>Skills:</strong>{" "}
            {trainer.skills?.length ? trainer.skills.join(", ") : "N/A"}
          </p>

          <p>
            <strong>Bio:</strong>{" "}
            <span className="text-sm text-gray-600 dark:text-gray-300 italic">
              {trainer.additionalInfo || "No additional info provided."}
            </span>
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">
          Choose Your Membership Plan
        </h2>
        <SubscriptionCards onSelect={handlePackageSelect} />
      </motion.div>
    </div>
  );
};

export default TrainerBooked;
