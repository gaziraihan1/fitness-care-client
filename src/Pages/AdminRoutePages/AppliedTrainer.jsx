import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router";

Modal.setAppElement("#root");

const AppliedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate()

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
      .then(() => {
        return axiosSecure.patch(`/users/promote/${email}`, {
          role: "trainer",
        });
      })
      .then(() => {
        Swal.fire("Success", "Trainer Confirmed", "success");
        refetch();
      });
  };

  const openRejectModal = (trainer) => {
    setSelectedTrainer(trainer);
    setFeedback(""); // reset feedback
    setModalIsOpen(true);
  };

  const submitRejection = () => {
    axiosSecure
      .patch(`/trainerApplications/reject/${selectedTrainer._id}`, {
        feedback,
      })
      .then(() => {
        Swal.fire("Rejected", "Trainer application rejected.", "info");
        setModalIsOpen(false);
        setSelectedTrainer(null);
        setFeedback("");
        refetch();
      });
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Trainer Applications</h2>
      <table className="min-w-full table-auto text-sm text-left">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2">#</th>
      <th className="px-4 py-2">Profile</th>
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Skills</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody className="px-4">
          {trainers.map((trainer, idx) => (
            <tr key={trainer._id}>
              <td>{idx + 1}</td>
              <td>
                <img
                  src={trainer.profileImage}
                  className="w-10 h-10 rounded-full"
                  alt="Profile"
                />
              </td>
              <td>{trainer.fullName}</td>
              <td>{trainer.email}</td>
              <td>{trainer.skills.join(", ")}</td>
              <td>{trainer.status}</td>
              <td className="flex gap-3">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() =>
                    navigate(`/dashboard/appliedTrainer/${trainer._id}`)
                  }
                >
                  <FaEye size={20}/>
                </button>
                {/* Confirm */}
                <button
                  className="text-green-600 tooltip"
                  data-tip="Confirm"
                  onClick={() => handleConfirm(trainer._id, trainer.email)}
                >
                  <FaCheckCircle size={20} />
                </button>

                {/* Reject */}
                <button
                  className="text-red-600 tooltip"
                  data-tip="Reject"
                  onClick={() => openRejectModal(trainer)}
                >
                  <FaTimesCircle size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
</table>


      <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Reject Trainer Modal"
  className="max-w-xl w-full mx-4 sm:mx-auto mt-24 bg-white rounded-lg shadow-lg p-6 border border-gray-200 relative"
  overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
>
  {selectedTrainer && (
    <div>
      {/* Title */}
      <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
        ❌ Reject Trainer Application
      </h2>

      {/* Profile section */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={selectedTrainer.profileImage}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-red-400"
        />
        <div>
          <p className="text-lg font-medium text-gray-800">{selectedTrainer.fullName}</p>
          <p className="text-sm text-gray-500">{selectedTrainer.email}</p>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <p><span className="font-semibold text-gray-800">Age:</span> {selectedTrainer.age}</p>
        <p><span className="font-semibold text-gray-800">Skills:</span> {selectedTrainer.skills.join(", ")}</p>
        <p><span className="font-semibold text-gray-800">Available Days:</span> {selectedTrainer.availableDays.join(", ")}</p>
        <p><span className="font-semibold text-gray-800">Time:</span> {selectedTrainer.availableTime}</p>
        <p className="col-span-1 sm:col-span-2"><span className="font-semibold text-gray-800">Additional Info:</span> {selectedTrainer.additionalInfo}</p>
      </div>

      {/* Feedback input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rejection Feedback
        </label>
        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
          rows={4}
          placeholder="Explain the reason for rejection..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setModalIsOpen(false)}
          className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100"
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
