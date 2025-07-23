import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield, FaUserTie, FaArrowUp, FaArrowDown } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";

const roleBadge = {
  admin: {
    icon: <FaUserShield className="text-red-500" />,
    label: "Admin",
  },
  trainer: {
    icon: <FaUserTie className="text-green-500" />,
    label: "Trainer",
  },
};

const ForumsPage = () => {
  useEffect(() => {
    document.title = "Fitness Care | Forums";
  }, []);

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const limit = 6;

  const {
    data = { forums: [], total: 0 },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["forums", page], 
    queryFn: async () => {
      const res = await axiosInstance.get(`/forum?page=${page}&limit=${limit}`);
      return res.data; 
    },
    keepPreviousData: true,
  });

  const forums = data.forums || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleVote = async (id, voteType) => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to vote", "info");
    }

    try {
      const res = await axiosSecure.patch(`/forum/vote/${id}`, {
        email: user.email,
        voteType,
      });

      if (res.data?.message === "Already voted") {
        Swal.fire(
          "Already Voted",
          "You already voted with the same option.",
          "warning"
        );
      } else {
        Swal.fire("Success", "Vote updated!", "success");
        refetch();
      }
    } catch (error) {
      console.error("Voting error:", error);
      Swal.fire("Error", "Something went wrong while voting.", "error");
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading)
    return (
      <p className="text-center py-10 text-lg font-semibold text-blue-500">
        Loading forums...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 text-center py-10 font-medium">
        Error loading forums.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        🌐 Community Forums
      </h1>

      {forums.length === 0 ? (
        <p className="text-center text-gray-600">No forum posts available.</p>
      ) : (
        <div className="grid gap-8">
          {forums.map((forum) => (
            <div
              key={forum._id}
              className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 p-6 relative"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {forum.title}
                </h2>
                {forum.role && (
                  <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full border shadow-sm">
                    {roleBadge[forum.role]?.icon}
                    <span className="font-semibold text-gray-700">
                      {roleBadge[forum.role]?.label}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 text-sm mb-3">{forum.content}</p>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <p>
                  Posted by{" "}
                  <span className="font-semibold text-gray-800">
                    {forum.author}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                    onClick={() => handleVote(forum._id, "up")}
                  >
                    <FaArrowUp /> <span>{forum.upvotes || 0}</span>
                  </button>
                  <button
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                    onClick={() => handleVote(forum._id, "down")}
                  >
                    <FaArrowDown /> <span>{forum.downvotes || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center gap-4 items-center">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`px-4 py-2 rounded shadow text-sm ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          ⬅️ Prev
        </button>
        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded shadow text-sm ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default ForumsPage;
