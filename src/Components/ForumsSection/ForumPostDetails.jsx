import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { useEffect } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ForumPostDetails = () => {
  useEffect(() => {
    document.title = "Fitness Care | Forum Details";
  }, []);


  const {user} = useAuth()
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()

  const { data: post, isLoading, error, refetch } = useQuery({
    queryKey: ["forumPost", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/forum/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

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
  

  if (isLoading) {
    return <p className="text-center py-10 text-lg animate-pulse">Loading post details...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500 text-lg">
        Failed to load post details.
      </p>
    );
  }

  if (!post) {
    return <p className="text-center py-10 text-gray-500 dark:text-gray-300 text-lg">Post not found.</p>;
  }

  return (
    <article className="max-w-4xl mx-4 lg:mx-auto py-6 px-2 sm:px-4 md:px-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-2xl mt-10 border border-gray-200 dark:border-gray-600">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 text-gray-800 dark:text-gray-200 tracking-wide">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="bg-blue-100 dark:bg-gray-600 dark:text-gray-300 text-blue-800 px-2 py-1 rounded-full">
            {post.author || "Anonymous"}
          </span>
          <time dateTime={post.createdAt} className="italic text-gray-500 dark:text-gray-300">
            {new Date(post.createdAt).toLocaleDateString()}
          </time>
        </div>
        <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
      </header>
      <div className="prose prose-lg max-w-none mb-8 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
        {post.content}
      </div>
      <div className="flex items-center gap-6 text-gray-600 dark:text-gray-300 text-lg">
        <button
        onClick={() => handleVote(post._id, "up")} className="flex items-center gap-2 hover:text-blue-500 transition">
          <FaThumbsUp /> {post.upvotes || 0}
        </button>
        <button
        onClick={() => handleVote(post._id, "down")} className="flex items-center gap-2 hover:text-red-500 transition">
          <FaThumbsDown /> {post.downvotes || 0}
        </button>
      </div>

     
    </article>
  );
};

export default ForumPostDetails;
