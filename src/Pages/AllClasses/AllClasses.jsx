import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FaUserShield, FaUserTie } from "react-icons/fa";

const roleBadge = {
  admin: <FaUserShield className="text-red-500" />,
  trainer: <FaUserTie className="text-green-500" />,
};

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const limit = 6;

  const { data, isLoading, error } = useQuery({
    queryKey: ["all-classes", page, search, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allClasses?page=${page}&limit=${limit}&search=${search}&filter=${filter}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const classes = data?.classes || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
        🎓 Explore Our Classes
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 w-full">
        <input
          type="text"
          placeholder="🔍 Search classes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded shadow"
        >
          <option value="">All Categories</option>
          <option value="yoga">Yoga</option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-blue-600 font-medium">Loading classes...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load classes.</p>
      ) : classes.length === 0 ? (
        <p className="text-center text-gray-600">No classes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={cls.image} alt={cls.className} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{cls.className}</h2>
                <p className="text-gray-600 text-sm mb-2">{cls.details}</p>
                {cls.additionalInfo && (
                  <p className="text-xs text-gray-500 italic">{cls.additionalInfo}</p>
                )}
                {cls.trainers?.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Trainers:</p>
                    <div className="flex -space-x-2">
                      {cls.trainers.slice(0, 5).map((trainer) => (
                        <div
                          key={trainer._id}
                          onClick={() => navigate(`/trainer/${trainer._id}`)}
                          className="relative group cursor-pointer"
                        >
                          <img
                            src={trainer.image}
                            alt={trainer.name}
                            className="w-10 h-10 rounded-full border-2 border-white hover:scale-110 transition"
                          />
                          {trainer.role && (
                            <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
                              {roleBadge[trainer.role]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 text-sm rounded border font-medium transition-all duration-200 shadow ${
                page === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllClasses;