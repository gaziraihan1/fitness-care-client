import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
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
    error;
    return (
      <section>
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-center py-10 text-gray-500 animate-pulse">
          Loading latest posts...
        </p>
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        📝 Latest Community Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
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
            </article>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/forums"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow transition"
        >
          Explore All Posts
        </Link>
      </div>
    </section>
  );
};

export default LatestCommunityPosts;
