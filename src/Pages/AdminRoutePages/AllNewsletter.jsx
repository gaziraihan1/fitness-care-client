import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useEffect } from "react";

const AllNewsletter = () => {
  useEffect(() => {
      document.title = "Fitness Care | All Subscriber";
    }, []);
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [], isLoading, isError } = useQuery({
    queryKey: ["allSubscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletter");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-medium py-10">
        Failed to load subscribers.
      </div>
    );
  }

  return (
    <section className="p-6 md:p-8 bg-gradient-to-r from-blue-50 via-white to-indigo-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        📧 All Newsletter Subscribers
      </h2>
      <div className="rounded-lg overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700">
            <tr>
              <th className=" py-3">#</th>
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3">Subscribed On</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subscribers.map((subscriber, idx) => (
              <tr key={subscriber._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 font-medium text-black dark:text-gray-100">{idx + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200">
                  {subscriber.name}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{subscriber.email}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {new Date(subscriber.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllNewsletter;
