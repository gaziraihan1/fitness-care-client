import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AdminBalance = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-balance"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/balance");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">💰 Financial Overview</h2>

      <div className="mb-6 bg-blue-100 text-blue-800 p-4 rounded text-lg font-semibold">
        Total Balance: ${data.totalBalance.toFixed(2)}
      </div>

      <h3 className="text-xl font-semibold mb-3">Last 6 Transactions</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-200 text-left text-sm">
              <th className="p-2">User</th>
              <th className="p-2">Trainer</th>
              <th className="p-2">Package</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.recentTransactions.map((t, idx) => (
              <tr key={idx} className="border-t text-sm hover:bg-gray-50">
                <td className="p-2">{t.userName}</td>
                <td className="p-2">{t.trainerName}</td>
                <td className="p-2">{t.package}</td>
                <td className="p-2">${t.price}</td>
                <td className="p-2">
                  {new Date(t.date).toLocaleDateString()}{" "}
                  {new Date(t.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBalance;
