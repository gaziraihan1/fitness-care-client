import { Link } from "react-router";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaUserShield,
  FaUserTie,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";

const roleBadge = {
  admin: {
    icon: <FaUserShield className="text-blue-500" />,
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
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10 text-blue-700">
        🌐 Community Forums
      </h1>

      {forums.length === 0 ? (
        <p className="text-center text-gray-600">No forum posts available.</p>
      ) : (
        <div className="grid gap-5">
          {forums.map((forum) => (
            <div
              key={forum._id}
              className="relative flex items-center justify-between bg-white/30 backdrop-blur-lg border border-gray-200 
                 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 px-5 py-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                <div>
                  <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent transition">
                    {forum.title}
                  </h2>
                  <p className="text-sm text-gray-700 line-clamp-2 mt-1">
                    {forum.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Posted by{" "}
                    <span className="font-medium text-indigo-600">
                      {forum.author}
                    </span>{" "}
                    · {new Date(forum.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 ml-4 shrink-0">
                {forum.role && (
                  <div
                    className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm 
                        bg-gradient-to-r ${
                          forum.role === "admin"
                            ? "from-green-500 to-gray-500 text-white"
                            : forum.role === "moderator"
                            ? "from-blue-500 to-cyan-400 text-white"
                            : "from-gray-200 to-gray-100 text-gray-700"
                        }`}
                  >
                    {roleBadge[forum.role]?.icon}
                    <span>{roleBadge[forum.role]?.label}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-sm">
                  <button
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 transition transform hover:scale-110"
                    onClick={() => handleVote(forum._id, "up")}
                  >
                    <FaArrowUp /> <span>{forum.upVotes?.length || 0}</span>
                  </button>
                  <button
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition transform hover:scale-110"
                    onClick={() => handleVote(forum._id, "down")}
                  >
                    <FaArrowDown /> <span>{forum.downVotes?.length || 0}</span>
                  </button>
                </div>

                <Link
                  to={`/forumDetails/${forum._id}`}
                  className="text-xs md:text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 
                     text-white px-4 py-1.5 rounded-full shadow-md transition transform hover:scale-105"
                >
                  More Details
                </Link>
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
