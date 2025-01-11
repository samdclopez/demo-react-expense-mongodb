import Expense from '../models/expenseModel.js';

class ExpenseService {
    async getAllExpenses() {
        return await Expense.find().sort({ createdAt: -1 });
    }

    async createExpense(expenseData) {
        return await Expense.create(expenseData);
    }

    async deleteExpense(id) {
        return await Expense.findByIdAndDelete(id);
    }

    async getExpenseById(id) {
        return await Expense.findById(id);
    }

    async updateExpense(id, expenseData) {
        return await Expense.findByIdAndUpdate(id, expenseData, {
            new: true,
            runValidators: true
        });
    }
}

export default new ExpenseService();