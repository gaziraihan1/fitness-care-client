import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

Modal.setAppElement("#root");

const AppliedTrainer = () => {
  useEffect(() => {
    document.title = "Fitness Care | Applied Trainer";
  }, []);

  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const { data: trainers = [], refetch } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainerApplications");
      return res.data.filter((trainer) => trainer.status === "pending");
    },
  });

  const handleConfirm = (id, email) => {
    axiosSecure
      .patch(`/trainerApplications/confirm/${id}`)
      .then(() =>
        axiosSecure.patch(`/users/promote/${email}`, { role: "trainer" })
      )
      .then(() => {
        Swal.fire("Success", "Trainer Confirmed", "success");
        refetch();
      });
  };

  const openRejectModal = (trainer) => {
    setSelectedTrainer(trainer);
    setFeedback("");
    setModalIsOpen(true);
  };

  const submitRejection = () => {
    axiosSecure
      .patch(`/trainerApplications/reject/${selectedTrainer._id}`, { feedback })
      .then(() => {
        Swal.fire("Rejected", "Trainer application rejected.", "info");
        setModalIsOpen(false);
        setSelectedTrainer(null);
        setFeedback("");
        refetch();
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white/90">
        Trainer Applications
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                #
              </th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                Profile
              </th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                Skills
              </th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                Status
              </th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-gray-200">
            {trainers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No trainer applications found
                </td>
              </tr>
            )}

            {trainers.map((trainer, idx) => (
              <tr
                key={trainer._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  {idx + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  <img
                    src={trainer.profileImage}
                    alt={trainer.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  {trainer.fullName}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  {trainer.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  {trainer.skills?.join(", ")}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  {trainer.status}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  <div className="flex gap-3">
                    <button
                      className="px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() =>
                        navigate(
                          `/dashboard/admin/appliedTrainer/${trainer._id}`
                        )
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      className="px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleConfirm(trainer._id, trainer.email)}
                    >
                      <FaCheckCircle />
                    </button>
                    <button
                      className="px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => openRejectModal(trainer)}
                    >
                      <FaTimesCircle />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for rejection */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Reject Trainer Modal"
        className="max-w-xl w-full mx-4 sm:mx-auto mt-24 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        {selectedTrainer && (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
              ❌ Reject Trainer Application
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedTrainer.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-red-400"
              />
              <div>
                <p className="text-lg font-medium dark:text-gray-200">
                  {selectedTrainer.fullName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedTrainer.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4 dark:text-gray-200">
              <p>
                <span className="font-semibold">Age:</span>{" "}
                {selectedTrainer.age}
              </p>
              <p>
                <span className="font-semibold">Skills:</span>{" "}
                {selectedTrainer.skills.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Available Days:</span>{" "}
                {selectedTrainer.availableDays.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Time:</span>{" "}
                {selectedTrainer.availableTime}
              </p>
              <p className="col-span-1 sm:col-span-2">
                <span className="font-semibold">Additional Info:</span>{" "}
                {selectedTrainer.additionalInfo}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                Rejection Feedback
              </label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white dark:bg-gray-700 text-black dark:text-white"
                rows={4}
                placeholder="Explain the reason for rejection..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalIsOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AppliedTrainer;
