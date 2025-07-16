import { motion } from "framer-motion";
import aboutImage from "../../assets/gym-about.jpg";

const AboutSection = () => {
  return (
    <section className="bg-white overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={aboutImage}
            alt="About Us"
            className="w-full h-full rounded-lg shadow-lg object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About Our Fitness Journey 🏋️‍♀️
          </h2>
          <p className="text-gray-600 text-lg mb-4 leading-relaxed">
            At <span className="font-semibold text-blue-600">GYM ELITE</span>,
            we’re more than just a fitness platform. We are a passionate
            community focused on helping individuals achieve their best
            version—physically, mentally, and emotionally.
          </p>
          <p className="text-gray-600 text-base">
            From expert trainers and state-of-the-art classes to personalized
            programs and a vibrant member community, we’ve created a space where
            everyone can thrive. Whether you're a beginner or a pro, we welcome
            you to grow with us.
          </p>

          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Join Our Mission
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
