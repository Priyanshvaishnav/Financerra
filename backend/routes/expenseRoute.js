const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

// Middleware to verify JWT token (used for protected routes)
const verifyToken = require('../middleware/authMiddleware.js');

// Get expenses for Dashboard
router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new expense
router.post('/', verifyToken, async (req, res) => {
  const { description, amount, category, date } = req.body;

  if (!amount || !category || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newExpense = new Expense({
      description,
      amount,
      category,
      date,
      userId: req.user.id
      
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an expense
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    console.log(expense);
    

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Expense.deleteOne({ _id: req.params.id });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.log(err);
    
  }
});

module.exports = router;
