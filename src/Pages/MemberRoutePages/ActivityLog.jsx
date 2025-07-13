import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaEye } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState("");

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["myTrainerApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/trainerApplications/user/${user.email}`
      );
      return res.data.filter((app) => app.status !== "confirmed");
    },
  });

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedFeedback("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">📋 Activity Log</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">
          No pending or rejected applications found.
        </p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow border p-5 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{app.fullName}</h3>
                <p className="text-sm text-gray-500">{app.email}</p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      app.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </p>
              </div>

              {app.status === "rejected" && (
                <button
                  onClick={() => openModal(app.feedback)}
                  className="text-blue-600 hover:text-blue-800"
                  title="View Feedback"
                >
                  <FaEye size={22} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Rejection Feedback"
        className="max-w-md w-full mx-auto bg-white rounded p-6 shadow-md mt-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          🛑 Rejection Feedback
        </h2>
        <p className="text-gray-700">
          {selectedFeedback || "No feedback provided."}
        </p>
        <div className="text-right mt-6">
          <button
            onClick={closeModal}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ActivityLog;
