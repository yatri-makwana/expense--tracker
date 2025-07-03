import React, { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext();

const getInitialLimit = () => {
  const stored = localStorage.getItem("expense_limit");
  return stored ? Number(stored) : 2000;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [limit, setLimitState] = useState(getInitialLimit());
  const [warning, setWarning] = useState("");

  // Calculate today's total
  const today = new Date().toISOString().slice(0, 10);
  const dailyTotal = expenses.filter(e => e.date === today).reduce((sum, e) => sum + Number(e.amount), 0);

  const setLimit = (newLimit) => {
    setLimitState(newLimit);
    localStorage.setItem("expense_limit", newLimit);
  };

  const addExpense = (expense) => {
    setExpenses((prev) => {
      const newExpenses = [expense, ...prev];
      // Calculate new today's total
      const newDailyTotal = newExpenses.filter(e => e.date === today).reduce((sum, e) => sum + Number(e.amount), 0);
      if (newDailyTotal > limit) {
        setWarning(`Warning: Daily limit of ₹${limit} exceeded!`);
      } else {
        setWarning("");
      }
      return newExpenses;
    });
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  // Clear warning after 4 seconds
  useEffect(() => {
    if (warning) {
      const t = setTimeout(() => setWarning(""), 4000);
      return () => clearTimeout(t);
    }
  }, [warning]);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, warning, limit, setLimit, dailyTotal }}>
      {children}
    </ExpenseContext.Provider>
  );
};
