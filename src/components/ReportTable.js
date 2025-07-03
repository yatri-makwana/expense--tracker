import React from "react";

const groupByMonth = (expenses) => {
  return expenses.reduce((acc, exp) => {
    const date = new Date(exp.date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[month] = acc[month] || [];
    acc[month].push(exp);
    return acc;
  }, {});
};

const ReportTable = ({ expenses }) => {
  const monthly = groupByMonth(expenses);
  const months = Object.keys(monthly).sort((a, b) => b.localeCompare(a));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Monthly Report</h3>
      <table className="min-w-full">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4">Month</th>
            <th className="py-2 px-4">Total Expenses</th>
            <th className="py-2 px-4">Number of Entries</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month) => {
            const total = monthly[month].reduce((sum, exp) => sum + Number(exp.amount), 0);
            return (
              <tr key={month} className="border-t">
                <td className="py-2 px-4">{month}</td>
                <td className="py-2 px-4">₹{total}</td>
                <td className="py-2 px-4">{monthly[month].length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
