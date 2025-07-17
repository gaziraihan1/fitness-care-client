import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";

const LatestCommunityPosts = () => {
  const axiosInstance = useAxios();
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestForumPosts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/forum/latest");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading latest posts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load posts. Please try again later.
      </p>
    );
  }

  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-blue-50 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            📝 Latest Community Posts
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover recent discussions, ideas, and insights shared by our
            community members.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between border border-transparent hover:border-indigo-200"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <Link to={`/forumDetails/${post._id}`} className="block mb-4">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2 hover:underline">
                    {post.title.length > 60
                      ? post.title.slice(0, 57) + "..."
                      : post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.content.length > 100
                      ? post.content.slice(0, 97) + "..."
                      : post.content}
                  </p>
                </Link>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                  <span>✍️ {post.author || "Community Member"}</span>
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/forums"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Explore All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestCommunityPosts;
