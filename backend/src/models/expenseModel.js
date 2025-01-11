import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
        min: [0, 'Amount cannot be negative']
    },
    type: {
        type: String,
        required: [true, 'Please add a type'],
        enum: ['food', 'transport', 'laundry']
    }
}, {
    timestamps: true
});

export default mongoose.model('Expense', expenseSchema);