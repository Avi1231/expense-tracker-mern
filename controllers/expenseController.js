import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const expense = await Expense.create({
      userId: req.userId,
      title,
      amount,
      category
    });

    res.status(201).json(expense);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to create expense' });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findOneAndDelete({ _id: id, userId: req.userId });
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
};

export const updateExpense = async (req, res) => {
    try {
      const expense = await Expense.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId }, // find by ID & user
        req.body,
        { new: true } // return updated doc
      );
  
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found or unauthorized' });
      }
  
      res.status(200).json(expense);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Error updating expense', error });
    }
  };
  