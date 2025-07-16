import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaMoneyBillWave, FaChartPie, FaChartBar } from "react-icons/fa";

const COLORS = ["#00C49F", "#FF8042"];

const Balance = () => {
  useEffect(() => {
    document.title = "Fitness Care | Balance";
  }, []);
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([
    { name: "Subscribers", value: 0 },
    { name: "Paid Members", value: 0 },
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminBalance"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/balance");
      return res.data;
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const subscribersRes = await axiosSecure.get("/newsletter/count");

        const membersRes = await axiosSecure.get("/payments/count");
        setChartData([
          { name: "Subscribers", value: subscribersRes.data.count || 0 },
          { name: "Paid Members", value: membersRes.data.count || 0 },
        ]);
      } catch (err) {
        console.error("Chart data fetch failed", err);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  if (isLoading)
    return <p className="text-center text-blue-500 py-10">Loading balance...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Failed to load data.</p>
    );

  const { totalBalance, recentTransactions } = data || {};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        💰 Admin Balance Overview
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Total Balance */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <FaMoneyBillWave className="text-green-500 text-3xl" />
            <h3 className="text-xl font-semibold">Total Balance</h3>
          </div>
          <p className="text-4xl font-bold text-green-600">
            ${totalBalance.toFixed(2)}
          </p>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <FaChartPie className="text-purple-500 text-2xl" />
            <h3 className="text-lg font-semibold">
              Subscribers vs Paid Members (Pie)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">🧾 Last 6 Transactions</h3>
        {recentTransactions?.length ? (
          <ul className="space-y-3">
            {recentTransactions.map((tx, i) => (
              <li
                key={i}
                className="bg-gray-100 p-4 rounded border flex justify-between items-center text-sm"
              >
                <div>
                  <p>
                    <strong>{tx.userName}</strong> booked{" "}
                    <strong>{tx.trainerName}</strong>
                  </p>
                  <p className="text-gray-600 text-xs">
                    {new Date(tx.date).toLocaleString()}
                  </p>
                </div>
                <span className="text-green-600 font-semibold">
                  ${tx.price}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default Balance;
