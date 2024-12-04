import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import {
  deleteExpenseWithId,
  getExpenses,
  insertExpense,
} from "../services/expenses";
import "./Dashboard.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    insertExpense(expense).then((data) => {
      setExpenses([...expenses, data]);
    });
  };

  const deleteExpense = (id) => {
    deleteExpenseWithId(id).then((data) => {
      if (data === null) {
        return;
      }
      setExpenses(expenses.filter((expense) => expense._id !== id));
    });
  };

  useEffect(() => {
    getExpenses().then((data) => {
      console.log(data);
      if (data === null) {
        return;
      }
      setExpenses(data);
    });
  }, []);

  const totalSpent = expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount || 0),
    0
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>MintTrail</h2>
        <h3>Your Total Spent: ${totalSpent.toFixed(2)}</h3>
      </div>
      <div className="dashboard-content">
        <div className="form-container">
          <ExpenseForm addExpense={addExpense} />
        </div>
        <div className="list-container">
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
