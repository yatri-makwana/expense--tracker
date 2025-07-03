import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ReportTable from "../components/ReportTable";
import CategoryBreakdown from "../components/CategoryBreakdown";

const Reports = () => {
  const { expenses } = useContext(ExpenseContext);
  return (
    <div className="space-y-8">
      <CategoryBreakdown expenses={expenses} />
      <ReportTable expenses={expenses} />
    </div>
  );
};

export default Reports;
