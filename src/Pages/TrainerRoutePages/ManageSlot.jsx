import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect } from "react";

const ManageSlots = () => {
  useEffect(() => {
    document.title = "Fitness Care | Manage Slot";
  }, []);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: slots = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["slots", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const slotsWithClass = slots.map((slot) => {
    const matchedClass = classes.find((c) => c._id === slot.classId);
    return {
      ...slot,
      className: matchedClass?.className || "Unknown Class",
    };
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this slot?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/slots/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Slot has been removed.", "success");
          refetch();
        } else {
          Swal.fire("Error", "Slot not found or already deleted.", "error");
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete slot", "error");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        🗓️ Manage Slots
      </h2>

      {isLoading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading slots...</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Slot Name</th>
                <th className="px-4 py-2">Days</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Booked By</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {slotsWithClass.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 dark:text-gray-400 italic"
                  >
                    You haven’t added any slots yet.
                  </td>
                </tr>
              ) : (
                slotsWithClass.map((slot, idx) => (
                  <tr
                    key={slot._id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{slot.slotName}</td>
                    <td className="px-4 py-3">
                      {slot.days?.length ? slot.days.join(", ") : "N/A"}
                    </td>
                    <td className="px-4 py-3">{slot.slotTime}</td>
                    <td className="px-4 py-3">{slot.className}</td>
                    <td className="px-4 py-3 capitalize">
                      {slot.status || "available"}
                    </td>
                    <td className="px-4 py-3">
                      {slot.bookedBy ? (
                        <div>
                          <p className="font-semibold">{slot.bookedBy.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {slot.bookedBy.email}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 italic">
                          Not booked
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(slot._id)}
                        className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;
