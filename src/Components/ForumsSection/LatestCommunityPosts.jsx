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
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-gray-200">
            📝 Latest Community Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
            Discover recent discussions, ideas, and insights shared by our
            community members.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">No posts available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between border border-transparent hover:border-indigo-200"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link to={`/forumDetails/${post._id}`} className="block mb-4">
                  <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-500 mb-2 hover:underline">
                    {post.title.length > 60
                      ? post.title.slice(0, 57) + "..."
                      : post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {post.content.length > 100
                      ? post.content.slice(0, 97) + "..."
                      : post.content}
                  </p>
                </Link>
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-400">
                  <div className="flex justify-between sm:justify-start sm:gap-4">
                    <span>✍️ {post.author || "Community Member"}</span>
                    <time dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </time>
                  </div>

                  <Link
                    to={`/forumDetails/${post._id}`}
                    className="inline-block text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    Read Post →
                  </Link>
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
