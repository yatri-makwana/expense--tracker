import React, { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const initialForm = { amount: "", category: "", date: "", description: "" };

const ExpenseForm = () => {
  const [form, setForm] = useState(initialForm);
  const { addExpense, warning } = useContext(ExpenseContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    // Add time automatically
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    addExpense({ ...form, id: Date.now(), time });
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto mt-6">
      {warning && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-center">
          {warning}
        </div>
      )}
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input type="number" name="amount" value={form.amount} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select name="category" value={form.category} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2">
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <input type="text" name="description" value={form.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
