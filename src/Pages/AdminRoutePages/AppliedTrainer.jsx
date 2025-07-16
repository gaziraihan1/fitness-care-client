import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";

Modal.setAppElement("#root");

const AppliedTrainer = () => {
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
  console.log(trainers)

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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Trainer Applications</h2>

      {/* 🔥 Only table scrolls horizontally */}
      <div className="overflow-x-auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Profile</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {trainers.map((trainer, idx) => (
                <TableRow key={trainer._id} hover>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Avatar src={trainer.profileImage} alt={trainer.fullName} />
                  </TableCell>
                  <TableCell>{trainer.fullName}</TableCell>
                  <TableCell>{trainer.email}</TableCell>
                  <TableCell>
                    {trainer.skills && trainer.skills.join(", ")}
                  </TableCell>
                  <TableCell>{trainer.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() =>
                          navigate(`/dashboard/admin/appliedTrainer/${trainer._id}`)
                        }
                      >
                        <FaEye size={20} />
                      </button>

                      <IconButton
                        color="success"
                        title="Confirm"
                        onClick={() => handleConfirm(trainer._id, trainer.email)}
                      >
                        <FaCheckCircle size={20} />
                      </IconButton>

                      <IconButton
                        color="error"
                        title="Reject"
                        onClick={() => openRejectModal(trainer)}
                      >
                        <FaTimesCircle size={20} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {trainers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No trainer applications found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Modal for rejection */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Reject Trainer Modal"
        className="max-w-xl w-full mx-4 sm:mx-auto mt-24 bg-white rounded-lg shadow-lg p-6 border border-gray-200 relative"
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
                <p className="text-lg font-medium text-gray-800">
                  {selectedTrainer.fullName}
                </p>
                <p className="text-sm text-gray-500">{selectedTrainer.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
              <p>
                <span className="font-semibold text-gray-800">Age:</span>{" "}
                {selectedTrainer.age}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Skills:</span>{" "}
                {selectedTrainer.skills.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-800">
                  Available Days:
                </span>{" "}
                {selectedTrainer.availableDays.join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Time:</span>{" "}
                {selectedTrainer.availableTime}
              </p>
              <p className="col-span-1 sm:col-span-2">
                <span className="font-semibold text-gray-800">
                  Additional Info:
                </span>{" "}
                {selectedTrainer.additionalInfo}
              </p>
            </div>

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
