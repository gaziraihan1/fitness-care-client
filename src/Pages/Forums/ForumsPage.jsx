import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield, FaUserTie } from "react-icons/fa";

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
  const axiosSecure = useAxiosSecure();

  const { data: forums = [], isLoading, error } = useQuery({
    queryKey: ["forums"],
    queryFn: async () => {
      const res = await axiosSecure.get("/forum?page=1&limit=6");
      return res.data.posts;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading forums...</p>;
  if (error) return <p className="text-red-500 text-center py-10">Error loading forums.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Forums</h1>

      {forums.length === 0 ? (
        <p className="text-center text-gray-600">No forum posts available.</p>
      ) : (
        forums.map((forum) => (
          <div key={forum._id} className="mb-6 bg-white border p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{forum.title}</h2>
              {forum.role && (
                <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full border">
                  {roleBadge[forum.role]?.icon}
                  <span className="font-medium text-gray-700">{roleBadge[forum.role]?.label}</span>
                </span>
              )}
            </div>
            <p className="text-gray-700 text-sm">{forum.content}</p>
            <p className="mt-2 text-xs text-gray-500">Posted by {forum.author}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ForumsPage;
