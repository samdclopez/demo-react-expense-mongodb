import ExpenseService from '../services/expenseService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

class ExpenseController {
    async getAllExpenses(req, res) {
        try {
            const expenses = await ExpenseService.getAllExpenses();
            successResponse(res, 200, 'Expenses retrieved successfully', expenses);
        } catch (error) {
            errorResponse(res, 500, error.message);
        }
    }

    async createExpense(req, res) {
        try {
            const expense = await ExpenseService.createExpense(req.body);
            successResponse(res, 201, 'Expense created successfully', expense);
        } catch (error) {
            errorResponse(res, 500, error.message);
        }
    }

    async deleteExpense(req, res) {
        try {
            await ExpenseService.deleteExpense(req.params.id);
            successResponse(res, 200, 'Expense deleted successfully');
        } catch (error) {
            errorResponse(res, 500, error.message);
        }
    }

    async getExpenseById(req, res) {
        try {
            const expense = await ExpenseService.getExpenseById(req.params.id);
            successResponse(res, 200, 'Expense retrieved successfully', expense);
        } catch (error) {
            errorResponse(res, 500, error.message);
        }
    }
}

export default new ExpenseController(); 