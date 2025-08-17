import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios()

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in both name and email.",
      });
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/newsletter", { name, email });
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thank you for subscribing to our newsletter.",
      });
      setName("");
      setEmail("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-gray-200">
          📬 Join Our Newsletter
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3 mb-10 max-w-2xl mx-auto">
          Stay updated with our latest classes, trainers, and special offers. Subscribe now and never miss an update!
        </p>

        <form
          onSubmit={handleSubscribe}
          className="rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 w-full border text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 w-full border text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium px-6 py-3 rounded-lg hover:shadow-xl transition-all"
          >
            {loading ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
