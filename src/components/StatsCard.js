import React from "react";

const StatsCard = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <div className="text-gray-500 text-sm mb-2">{label}</div>
    <div className="text-2xl font-bold text-blue-700">₹{value}</div>
  </div>
);

export default StatsCard;
