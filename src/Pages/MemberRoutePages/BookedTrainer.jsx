import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex gap-1 text-yellow-400 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          className={star <= rating ? "text-yellow-400" : "text-gray-300"}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

const BookedTrainer = () => {
  useEffect(() => {
      document.title = "Fitness Care | Booked Trainer";
    }, []);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user.email}`);
      return res.data;
    },
  });

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setFeedback("");
    setRating(0);
    setShowModal(true);
  };

  const handleReviewSubmit = async (e) => {
  e.preventDefault();
  if (!selectedBooking || rating === 0) {
    Swal.fire({
      icon: "warning",
      title: "Rating Required",
      text: "Please select a star rating.",
    });
    return;
  }

  setSubmitting(true);
  try {
    const reviewData = {
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "/default-avatar.png",
      trainerId: selectedBooking.trainerId,
      trainerName: selectedBooking.trainerName,
      feedback,
      rating,
      date: new Date(),
    };

    await axiosSecure.post("/reviews", reviewData);

    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Review submitted successfully!",
    });

    setShowModal(false);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Could not submit review. Try again.",
    });
  } finally {
    setSubmitting(false);
  }
};

  if (isLoading) return <p className="text-center mt-10">Loading bookings...</p>;
  if (!bookings.length) return <p className="text-center mt-10">No trainers booked yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">📋 Your Booked Trainers</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {bookings.map((booking, idx) => (
          <div
            key={idx}
            className="bg-white/50 backdrop-blur-lg border shadow-xl rounded-xl p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={booking.trainerImage || "/default-avatar.png"}
                alt="Trainer"
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h3 className="text-xl font-semibold">{booking.trainerName}</h3>
                <p className="text-gray-600 text-sm">{booking.userEmail}</p>
              </div>
            </div>

            <div className="text-sm space-y-2">
  <p>
    <span className="font-medium text-blue-700">Class:</span>{" "}
    {booking.className || "N/A"}
  </p>
  <p>
    <span className="font-medium text-blue-700">Slot Name:</span>{" "}
    {booking.slot?.slotName || "N/A"}
  </p>
  <p>
    <span className="font-medium text-blue-700">Time:</span>{" "}
    {booking.slot?.slotTime || "N/A"}
  </p>
  <p>
    <span className="font-medium text-blue-700">Days:</span>{" "}
    {Array.isArray(booking.slot?.days)
      ? booking.slot.days.join(", ")
      : "N/A"}
  </p>
  <p>
    <span className="font-medium text-blue-700">Status:</span>{" "}
    {booking.status}
  </p>
</div>


            <button
              onClick={() => handleReviewClick(booking)}
              className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-full hover:shadow-lg transition"
            >
              ✍️ Leave a Review
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[95%] max-w-lg p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Submit Review for {selectedBooking.trainerName}</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                placeholder="Write your feedback..."
                className="w-full border border-gray-300 rounded p-3 focus:outline-blue-500 resize-none"
                required
              />
              <div>
                <p className="font-medium mb-1">Star Rating</p>
                <StarRating rating={rating} setRating={setRating} />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-all"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
