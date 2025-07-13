import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const ManageSlots = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: slots = [], isLoading, refetch } = useQuery({
    queryKey: ["slots", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
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
          refetch(); // Re-fetch updated slot list
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">🗓️ Manage Slots</h2>

      {isLoading ? (
        <p>Loading slots...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
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
              {slots.map((slot, idx) => (
                <tr key={slot._id} className="border-t">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{slot.slotName}</td>
                  <td className="px-4 py-3">{slot.availableDays?.join(", ")}</td>
                  <td className="px-4 py-3">{slot.slotTime}</td>
                  <td className="px-4 py-3">{slot.className}</td>
                  <td className="px-4 py-3 capitalize">
                    {slot.status || "available"}
                  </td>
                  <td className="px-4 py-3">
                    {slot.bookedBy ? (
                      <div>
                        <p className="font-semibold">{slot.bookedBy.name}</p>
                        <p className="text-xs text-gray-500">{slot.bookedBy.email}</p>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Not booked</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
              {slots.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-gray-500">
                    No slots found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSlots;
