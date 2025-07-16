import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useEffect } from "react";

const ForumPostDetails = () => {
  useEffect(() => {
      document.title = "Fitness Care | Forum Details";
    }, []);
  const { id } = useParams();
  const axiosInstance = useAxios();


  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forumPost", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/forum/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading post details...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load post details.
      </p>
    );
  }

  if (!post) {
    return <p className="text-center py-10 text-gray-500">Post not found.</p>;
  }

  return (
    <article className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="mb-6 text-gray-600 text-sm">
        <span>
          By <strong>{post.author || "Anonymous"}</strong>
        </span>{" "}
        &middot;{" "}
        <time dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </div>

      <div className="prose max-w-none mb-6 whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="flex space-x-4 text-gray-600 text-sm">
        <span>👍 {post.upvotes || 0}</span>
        <span>👎 {post.downvotes || 0}</span>
      </div>
    </article>
  );
};

export default ForumPostDetails;
