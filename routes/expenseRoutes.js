import express from 'express'
import { createExpense, getExpenses, deleteExpense, updateExpense } from '../controllers/expenseController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware)

router.post('/create',createExpense)
router.get('/', getExpenses)
router.delete('/delete/:id',deleteExpense)
router.put('/update/:id', updateExpense);


export default router;