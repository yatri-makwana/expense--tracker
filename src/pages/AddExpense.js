import React from "react";
import ExpenseForm from "../components/ExpenseForm";

const AddExpense = () => (
  <div className="max-w-xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Add a New Expense</h2>
    <ExpenseForm />
  </div>
);

export default AddExpense;
