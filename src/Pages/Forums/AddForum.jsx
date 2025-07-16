import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";

const AddForum = () => {
  const [role, isLoading] = useUserRole();
  console.log(role);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const forumData = {
      title: data.title,
      content: data.content,
      author: user.displayName,
      email: user.email,
      role,
      createdAt: new Date(),
      upVotes: [],
      downVotes: [],
    };

    if (isLoading) return <p>Loading...</p>;

    await axiosSecure.post("/forum", forumData);
    Swal.fire("Success", "Forum post added", "success");
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Add New Forum Post
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 shadow-md rounded-lg"
      >
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter forum title"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Content</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full border px-4 py-2 rounded-md h-40 resize-none focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Write your thoughts..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
        >
          Post Forum
        </button>
      </form>
    </div>
  );
};

export default AddForum;
