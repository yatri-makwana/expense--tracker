import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import StatsCard from "../components/StatsCard";
import CategoryBreakdown from "../components/CategoryBreakdown";

const Dashboard = () => {
  const { expenses, limit, setLimit, dailyTotal, warning } = useContext(ExpenseContext);
  const [limitInput, setLimitInput] = useState(limit);

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const monthly = expenses.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).reduce((sum, exp) => sum + Number(exp.amount), 0);
  const highest = expenses.length ? Math.max(...expenses.map(e => Number(e.amount))) : 0;
  const lowest = expenses.length ? Math.min(...expenses.map(e => Number(e.amount))) : 0;
  const average = expenses.length ? (total / expenses.length).toFixed(2) : 0;

  const handleLimitChange = (e) => setLimitInput(e.target.value);
  const handleLimitSave = (e) => {
    e.preventDefault();
    setLimit(Number(limitInput));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatsCard label="Total Spent" value={total} />
        <StatsCard label="This Month" value={monthly} />
        <StatsCard label="Highest Expense" value={highest} />
        <StatsCard label="Lowest Expense" value={lowest} />
        <StatsCard label="Average" value={average} />
      </div>
      <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-semibold text-gray-700">Today's Spending</div>
          <div className={`text-2xl font-bold ${dailyTotal > limit ? 'text-red-600' : 'text-green-700'}`}>₹{dailyTotal} / ₹{limit}</div>
          {warning && (
            <div className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center">
              {warning}
            </div>
          )}
        </div>
        <form onSubmit={handleLimitSave} className="flex items-center gap-2 mt-2 md:mt-0">
          <label className="font-medium text-gray-600">Set Daily Limit:</label>
          <input type="number" min="0" value={limitInput} onChange={handleLimitChange} className="border rounded px-2 py-1 w-24" />
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Save</button>
        </form>
      </div>
      <CategoryBreakdown expenses={expenses} />
    </div>
  );
};

export default Dashboard;
