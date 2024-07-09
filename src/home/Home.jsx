import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../helper';

const Home = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    useEffect(() => {
        // Fetch income data from the API
        const fetchIncomeData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/get-incomes`);
                const data = await response.json();
                setIncomeData(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching income data:', error);
            }
        };

        // Fetch expense data from the API
        const fetchExpenseData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/get-expenses`);
                const data = await response.json();
                setExpenseData(data);
                // console.log(data);

            } catch (error) {
                console.error('Error fetching expense data:', error);
            }
        };

        fetchIncomeData();
        fetchExpenseData();

    },[]);

    // Calculate total income and total expense
    const totalIncome = incomeData.reduce((total1, item1) => total1 + item1.amount, 0);
    const totalExpense = expenseData.reduce((total2, item2) => total2 + item2.amount, 0);
    console.log("hi")   
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full mb-8">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Home</h1>
            <div className="flex flex-col space-y-4 justify-center">
                <div className="flex sm:space-x-4">
                    <Link
                        to="/income"
                        className="flex-1 block text-base sm:text-lg text-black uppercase bg-gray-200 rounded py-2 px-4 text-center hover:bg-blue-700 hover:text-white transition-colors duration-300"
                    >
                        Income
                    </Link>
                    <Link
                        to="/expense"
                        className="flex-1 block text-base sm:text-lg text-black uppercase bg-gray-200 rounded py-2 px-4 text-center hover:bg-blue-700 hover:text-white transition-colors duration-300"
                    >
                        Expense
                    </Link>
                </div>
                <div className="flex">
                    <Link
                        to="/alltransactions"
                        className="flex-1 block text-base sm:text-lg text-black uppercase bg-gray-200 rounded py-2 px-4 text-center hover:bg-blue-700 hover:text-white transition-colors duration-300"
                    >
                        Transactions
                    </Link>
                </div>
            </div>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">Summary</h2>
            <div>
                <p className="text-center mb-2">Total Income: ${totalIncome.toFixed(2)}</p>
                <p className="text-center">Total Expense: ${totalExpense.toFixed(2)}</p>
            </div>
        </div>
    </div>
);
};

export default Home;
