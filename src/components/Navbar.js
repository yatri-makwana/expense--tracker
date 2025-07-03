import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
    <div className="font-bold text-xl tracking-wide">Expense Tracker</div>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Dashboard</Link>
      <Link to="/expenses" className="hover:underline">Expenses</Link>
      <Link to="/reports" className="hover:underline">Reports</Link>
    </div>
  </nav>
);

export default Navbar;
