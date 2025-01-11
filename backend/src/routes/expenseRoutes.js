import express from 'express';
import ExpenseController from '../controllers/expenseController.js';
import { validateExpense } from '../middleware/validator.js';

const router = express.Router();
router.get('/', ExpenseController.getAllExpenses);
router.post('/', validateExpense, ExpenseController.createExpense);
router.delete('/:id', ExpenseController.deleteExpense);
router.get('/:id', ExpenseController.getExpenseById);

export default router;