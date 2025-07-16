import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-4 text-white">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              Empowering fitness enthusiasts with the best trainers and classes.
              Join us to reach your health goals with expert guidance.
            </p>
            <div className="flex space-x-4 mt-6 text-gray-400 hover:text-white">
              <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          <div className="md:w-1/4 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/allTrainer" className="hover:text-white transition">Trainers</a></li>
                <li><a href="/allClasses" className="hover:text-white transition">Classes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-white">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/login" className="hover:text-white transition">Login</a></li>
                <li><a href="/register" className="hover:text-white transition">Register</a></li>
                <li><a href="/beATrainer" className="hover:text-white transition">Become a Trainer</a></li>
              </ul>
            </div>
          </div>

          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-3 text-white">Contact Us</h4>
            <p className="text-gray-400 mb-2">123 Fitness St.<br />Dhaka, Bangladesh</p>
            <p className="text-gray-400 mb-2">Phone: +880 1234 567 890</p>
            <p className="text-gray-400">Email: support@example.com</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm select-none">
          &copy; {new Date().getFullYear()} FitnessApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
