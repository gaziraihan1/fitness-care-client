import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import bannerImg from "../../assets/gym-fitness.jpg"; // replace with your image

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden w-full ">
      <img
        src={bannerImg}
        alt="Gym Banner"
        className="w-full h-[60vh] lg:h-[80vh] object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/60 to-black/40 flex items-center justify-center">
        <motion.div
          className="text-center text-white max-w-3xl px-4"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-5 drop-shadow-md leading-tight">
            Build Strength. Transform Your Life.
          </h1>
          <p className="md:text-lg lg:text-xl text-gray-200 mb-8 drop-shadow">
            Join expert trainers and crush your fitness goals with
            personalized plans and top-class facilities.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/allClasses")}
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
          >
            Explore Classes
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;

