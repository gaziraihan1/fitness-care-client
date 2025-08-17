import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

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

  if (isLoading)
    return <p className="text-black dark:text-white text-center">Loading trainers...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white/90">All Trainers</h2>

      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring focus:border-blue-400 bg-white dark:bg-gray-800"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">#</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Photo</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Name</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Email</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Role</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 dark:text-gray-200">
            {paginatedTrainers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No trainers found
                </td>
              </tr>
            )}

            {paginatedTrainers.map((trainer, idx) => (
              <tr key={trainer._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  <img
                    src={trainer.photoURL}
                    alt={trainer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{trainer.name}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">{trainer.email}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600 capitalize">{trainer.role}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => handleDeleteTrainer(trainer)}
                    className="text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md border ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
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
