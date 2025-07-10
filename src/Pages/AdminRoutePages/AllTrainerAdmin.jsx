import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";

const AllTrainerAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch all trainers
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=trainer");
      return res.data;
    },
  });

  const downgradeTrainer = useMutation({
    mutationFn: async (trainer) => {
      return axiosSecure.patch(`/users/promote/${trainer.email}`, {
        role: "member",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["trainers"]);
      Swal.fire({
        icon: "success",
        title: "Trainer removed!",
        text: "This trainer is now a member.",
        timer: 2000,
        showConfirmButton: false,
      });
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

  // Filtered and paginated trainers
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
              setCurrentPage(1); // reset to page 1 on search
            }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow border rounded-md">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTrainers.map((trainer, idx) => (
              <tr key={trainer._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td className="px-4 py-2">
                  <img
                    src={trainer.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{trainer.name}</td>
                <td className="px-4 py-2">{trainer.email}</td>
                <td className="px-4 py-2 capitalize">{trainer.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteTrainer(trainer)}
                    className="text-red-600 hover:text-red-800"
                    title="Remove Trainer"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
