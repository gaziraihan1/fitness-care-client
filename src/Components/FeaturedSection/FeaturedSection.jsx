import {
  FaDumbbell,
  FaUserCheck,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaUsers,
  FaStar,
  FaHeartbeat,
  FaClipboardList,
} from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaDumbbell size={30} className="text-blue-600" />,
    title: "Personalized Training",
    description:
      "Customized workout plans from certified trainers tailored to your body type and goals.",
  },
  {
    icon: <FaCalendarCheck size={30} className="text-green-600" />,
    title: "Flexible Scheduling",
    description:
      "Easily book your preferred slots with live availability and instant confirmation.",
  },
  {
    icon: <FaUserCheck size={30} className="text-purple-600" />,
    title: "Verified Trainers",
    description:
      "Only approved and experienced professionals guide your fitness journey.",
  },
  {
    icon: <FaChalkboardTeacher size={30} className="text-yellow-600" />,
    title: "Live Forums & Tips",
    description:
      "Share your experiences and learn from others in our active fitness community.",
  },
  {
    icon: <FaUsers size={30} className="text-rose-600" />,
    title: "Community Support",
    description:
      "Join a positive, like-minded community pushing each other to reach fitness goals.",
  },
  {
    icon: <FaStar size={30} className="text-amber-500" />,
    title: "Top Rated Classes",
    description:
      "Popular classes with high ratings from members — join the best sessions.",
  },
  {
    icon: <FaHeartbeat size={30} className="text-red-500" />,
    title: "Health Tracking",
    description:
      "Monitor your progress, calories burned, and heart rate in real-time.",
  },
  {
    icon: <FaClipboardList size={30} className="text-indigo-600" />,
    title: "Activity Log",
    description:
      "Review your daily workout activities, schedules, and trainer interactions.",
  },
];

const FeaturedSection = () => {
  return (
    <section className=" bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Why Choose Our Platform?
        </h2>
        <p className="text-gray-600 text-lg">
          Everything you need to get stronger, healthier, and more confident.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center transition-all hover:shadow-lg hover:-translate-y-1"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: idx * 0.2, ease: [0.42, 0, 0.58, 1] }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
