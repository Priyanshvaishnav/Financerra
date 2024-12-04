import React, { useState } from "react";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, deleteExpense }) => {
  const [filter, setFilter] = useState({
    category: "",
    minAmount: "",
    maxAmount: "",
    date: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      !filter.category || expense.category.toLowerCase().includes(filter.category.toLowerCase());
    const matchesMinAmount =
      !filter.minAmount || parseFloat(expense.amount) >= parseFloat(filter.minAmount);
    const matchesMaxAmount =
      !filter.maxAmount || parseFloat(expense.amount) <= parseFloat(filter.maxAmount);
    const matchesDate = !filter.date || expense.date === filter.date;

    return matchesCategory && matchesMinAmount && matchesMaxAmount && matchesDate;
  });

  return (
    <div className="expense-list">
      <h3>Expenses</h3>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          name="category"
          placeholder="Filter by category"
          value={filter.category}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minAmount"
          placeholder="Min amount"
          value={filter.minAmount}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxAmount"
          placeholder="Max amount"
          value={filter.maxAmount}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
        />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => {
              const formattedDate = new Date(expense.date).toLocaleDateString();
              return (
                <tr key={expense._id}>
                  <td>{expense.category}</td>
                  <td>${expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>{formattedDate}</td>
                  <td>
                    <button onClick={() => deleteExpense(expense._id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No expenses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
