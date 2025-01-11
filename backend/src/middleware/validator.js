import { body, validationResult } from 'express-validator';

const validateExpense = [
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 100 })
        .withMessage('Description must be less than 100 characters'),
    
    body('amount')
        .isNumeric()
        .withMessage('Amount must be a number')
        .custom(value => value >= 0)
        .withMessage('Amount cannot be negative'),
    
    body('type')
        .trim()
        .notEmpty()
        .withMessage('Type is required')
        .isIn(['food', 'transport', 'laundry'])
        .withMessage('Invalid expense type'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export { validateExpense };