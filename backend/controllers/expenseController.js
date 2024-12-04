const Expense = require('../models/Expense');

// Create Expense
const addExpense = async (req, res) => {
  const { amount, category, description } = req.body;
  const newExpense = new Expense({
    userId: req.user.id, // From middleware
    amount,
    category,
    description,
  });

  await newExpense.save();
  res.status(201).json(newExpense);
};

// Get Expenses for a User
const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
};

module.exports = { addExpense, getExpenses };
