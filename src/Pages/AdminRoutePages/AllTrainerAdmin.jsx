import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

// ✅ Material UI table components
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
import DeleteIcon from "@mui/icons-material/Delete";

const AllTrainerAdmin = () => {
  useEffect(() => {
      document.title = "Fitness Care | All Trainer";
    }, []);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=trainer");
      return res.data;
    },
  });

  const downgradeTrainer = useMutation({
    mutationFn: async (trainer) => {
      const res = await axiosSecure.patch(`/users/downgrade/${trainer.email}`, {
        role: "member",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trainers"]);
      Swal.fire("Success", "Trainer successfully downgraded", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to remove trainer", "error");
    },
  });

  const handleDeleteTrainer = (trainer) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Remove ${trainer.name} as trainer?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        downgradeTrainer.mutate(trainer);
      }
    });
  };

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);
  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <p>Loading trainers...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">All Trainers</h2>

      {/* Search */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* ✅ Material UI Table inside a horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Photo</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedTrainers.map((trainer, idx) => (
                <TableRow key={trainer._id} hover>
                  <TableCell>
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </TableCell>
                  <TableCell>
                    <Avatar src={trainer.photoURL} alt={trainer.name} />
                  </TableCell>
                  <TableCell>{trainer.name}</TableCell>
                  <TableCell>{trainer.email}</TableCell>
                  <TableCell className="capitalize">{trainer.role}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTrainer(trainer)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedTrainers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No trainers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md border ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllTrainerAdmin;
