import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const TrainerDetails = () => {
  useEffect(() => {
      document.title = "Fitness Care | Trainer Details";
    }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { data: trainer = {}} = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trainers/${id}`);
      return res.data;
    },
  });

  const { data: slots = [], isLoading: loading } = useQuery({
    queryKey: ["trainerSlots", trainer.email],
    enabled: !!trainer.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/slots?email=${trainer.email}`);
      return res.data;
    },
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl text-center mb-10 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          🌟 Ready to share your fitness journey?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1 mb-4">
          Apply to become a certified trainer on our platform.
        </p>
        <button
          onClick={() => navigate("/beATrainer")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Become a Trainer
        </button>
      </div>

      <div className="lg:flex gap-10">
        <motion.div
  className="lg:w-2/3 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-10"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
>
  <div className="relative h-80">
    <img
      src={trainer.profileImage}
      alt={trainer.fullName}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent p-6">
      <h2 className="text-3xl font-bold text-white">{trainer.fullName}</h2>
      <p className="text-white">{trainer.experience || "N/A"}</p>
    </div>
  </div>

  <div className="p-6 space-y-4">
    <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-300">
      <p>
        <strong>Email:</strong> {trainer.email}
      </p>
      <p>
        <strong>Age:</strong> {trainer.age || "N/A"}
      </p>
    </div>

    <div>
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Skills:</h3>
      <div className="flex flex-wrap gap-2">
        {trainer.skills?.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 dark:bg-gray-700 dark:text-gray-400 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div>
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Availability:</h3>
      <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <FaCalendarAlt />{" "}
        {trainer.availableDays?.length
          ? trainer.availableDays.join(", ")
          : "N/A"}{" "}
        | <FaClock /> {trainer.availableTime || "N/A"}
      </p>
    </div>

    {trainer.additionalInfo && (
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">About:</h3>
        <p className="text-gray-600">{trainer.additionalInfo}</p>
      </div>
    )}
  </div>
</motion.div>


        <div className="lg:w-1/3 mt-8 lg:mt-0 space-y-6">
          <div className=" rounded-xl shadow p-5">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Available Slots 🕒
            </h3>

            {
              loading? <div className="px-4 py-2">
                <div className="animate-pulse h-2 w-full bg-gray-300 mt-2"></div>
                <div className="animate-pulse h-2 w-full bg-gray-300 mt-2"></div>
                <div className="animate-pulse h-2 w-full bg-gray-300 mt-2"></div>
              </div>:
             <div className="grid grid-cols-1 gap-4">
                {
                  slots.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300 italic">No slots available</p>
            ):
                slots?.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() =>
                      navigate(`/bookTrainer/${trainer._id}?slotId=${slot._id}`)
                    }
                    className="bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-gray-400 px-4 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-gray-700 hover:text-white transition text-sm font-medium flex flex-col text-left"
                  >
                    <span className="flex items-center gap-2 text-base font-semibold">
                      <FaCheckCircle className="text-green-500" />{" "}
                      {slot.slotName}
                    </span>
                    <span className="text-xs mt-1 text-gray-400 dark:text-gray-300">
                      {slot.slotTime}
                    </span>
                    <span className="text-xs mt-1 italic">
                      Days: {slot.days?.join(", ") || "N/A"}
                    </span>
                  </button>
                ))}
                
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerDetails;
