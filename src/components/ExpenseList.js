import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  if (!expenses.length) return <div className="text-center text-gray-500 mt-8">No expenses yet.</div>;

  return (
    <div className="overflow-x-auto mt-8 max-w-2xl mx-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id} className="border-t">
              <td className="py-2 px-4">
                {exp.date}
                {exp.time && <span className="block text-xs text-gray-400">{exp.time}</span>}
              </td>
              <td className="py-2 px-4">{exp.category}</td>
              <td className="py-2 px-4">{exp.description}</td>
              <td className="py-2 px-4">₹{exp.amount}</td>
              <td className="py-2 px-4">
                <button onClick={() => deleteExpense(exp.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
