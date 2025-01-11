import { useState, useEffect } from 'react'
import ListItem from './components/ListItem';
import { formatValueToMoney } from './helpers';
import { expenseService } from './services/expenseService.js';

//let expenses = []; //|| localStorage.getItem('expenses');

function App() {

    const [selectedType, setSelectedType] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [errors, setErrors] = useState([]);

    const typesExpenses = [
        { value: '', name: 'Select Type Expense' },
        { value: 'food', name: 'Food' },
        { value: 'transport', name: 'Transport' },
        { value: 'laundry', name: 'Laundry' }
    ]

    const handleSelectType = (e) => {
        setSelectedType(e.target.value);
    }

    const handleSetExpenseDescription = (e) => {
        setExpenseDescription(e.target.value);
    }

    const handleSetExpenseAmount = (e) => {
        const value = parseInt(e.target.value, 10);
        if(value < 0 || isNaN(value)) return;
        
        setExpenseAmount(value);
    }

    const fetchExpenses = async () => {
        try {
            const data = await expenseService.getAll();
            setExpenses(data);
        } catch (err) {
            console.error('Error fetching expenses:', err);
        } 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const arrayErrors = [];

        if (expenseDescription === '') {
            arrayErrors.push('Description is required');
        }
        if (expenseAmount === 0) {
            arrayErrors.push('Amount is required');
        }
        if (selectedType === '') {
            arrayErrors.push('Type is required');
        }

        if (arrayErrors.length > 0) {
            setErrors(arrayErrors);
            setTimeout(() => {
                setErrors([]);
            }, 3000);
            return;
        }

        const expenseItem = {
            //id: Date.now(),
            description: expenseDescription,
            amount: expenseAmount,
            type: selectedType
        };

        try{
            const newExpense = await expenseService.create(expenseItem);
            setExpenses([...expenses, newExpense]);
            resetExpense();
        } catch (error) {
            console.error('Error creating expense:', error);
        }
        //localStorage.setItem('expenses', JSON.stringify(expenses));
        //setExpenses([...expenses, expenseItem]);
    }

    function resetExpense() {
        setExpenseDescription('');
        setExpenseAmount(0);
        setSelectedType('');
    }

    const handleClickDelete = async (e) => {
        const expenseId = e.target.dataset.id;
        try{
            await expenseService.delete(expenseId);
            setExpenses(expenses.filter(expense => expense.id !== expenseId));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
        finally {
            fetchExpenses();
        }
    }


    useEffect(() => {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalAmount(total);
      }, [expenses]);

    //localStorage expenses useEffect
    useEffect(() => {
        fetchExpenses();
      }
    , []);
  

  return (

    <div className="bg-gray-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 font-bold text-blue-700">Expense Tracker</h1>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 font-bold text-blue-700">React & Mongo DB</h1>

        <form onSubmit={handleSubmit} className="w-full px-2 sm:px-0 sm:max-w-md mx-auto space-y-2 sm:space-y-4">

            <label htmlFor="description" className="w-full max-w-md text-lg font-bold mb-2">Description:</label>
            <input type="text" id="description" name="description" 
            className="w-full max-w-md px-3 py-2 mb-4 text-lg border rounded-lg focus:outline-none focus:shadow-outline" 
            onChange={handleSetExpenseDescription}
            value={expenseDescription}
            />

            <label htmlFor="amount" className="w-full max-w-md text-lg font-bold mb-2">Amount:</label>
            <input type="number" id="amount" name="amount" 
            className="w-full max-w-md px-3 py-2 mb-4 text-lg border rounded-lg focus:outline-none focus:shadow-outline" 
            onChange={handleSetExpenseAmount}
            value={expenseAmount}
            />
        
            <label htmlFor="type" className="w-full max-w-md text-lg font-bold mb-2">Type:</label>
            <select 
                id="type"
                name="type"
                className="w-full max-w-md px-3 py-2 mb-4 text-lg border rounded-lg focus:outline-none focus:shadow-outline"
                onChange={handleSelectType}
                value={selectedType}
                >
              {typesExpenses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
            </select>

            <button 
                type="submit" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                Save Expense
            </button>
        </form>

        {errors.length > 0 && (
            <div className="text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl my-4 font-bold text-red-600">
                {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
        )}
        

        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 font-bold text-blue-700">Expense History</h2>
        <ul id="expense-list" name="expense-list" className="list-none  my-4 flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
            { expenses.length > 0 ? expenses.map((expense, index) => (
                <ListItem 
                    key={index}
                    id = {expense._id} 
                    description={expense.description} 
                    amount={expense.amount} 
                    type={expense.type} 
                    handleClickDelete={ handleClickDelete}/>
            )) : <li className="text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl my-4 font-bold text-red-600">No expenses found</li>}

        </ul>
               
        <div id="total-amount" className="mx-auto text-center items-center bg-gray-800 text-white p-4 rounded font-mono max-w-md">
            <label htmlFor="totalAmount" className="w-full text-xl sm:text-2xl md:text-4xl lg:text-4xl font-bold mb-2">Total Amount</label>
            <div>
            <span id="total" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{formatValueToMoney(totalAmount)}</span>
            </div>
        </div>
    </div>
</div>
  )
}

export default App
