import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../helper';

const AllTransactions = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/get-incomes`);
        const data = await response.json();
        setIncomeData(data);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    const fetchExpenseData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/get-expenses`);
        const data = await response.json();
        setExpenseData(data);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchIncomeData();
    fetchExpenseData();
  }, []);

  const handleDelete = (id, type) => {
    console.log(id);
    

    const url = type === 'income'
      ? `${BASE_URL}/api/v1/delete-income/${id}`
      : `${BASE_URL}/api/v1/delete-expense/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then(data => {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} transaction deleted successfully!`);
        if (type === 'income') {
          setIncomeData(prevData => prevData.filter(item => item._id !== id));
        } else {
          setExpenseData(prevData => prevData.filter(item => item._id !== id));
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert(`Failed to delete the ${type} transaction. Please try again.`);
      });
  };
  

  const allTransactions = [...incomeData, ...expenseData];

  return (
    <div className="px-4 my-12">
      <Link to="/" className="absolute top-4 left-4 p-2 rounded-full bg-blue-400 text-white shadow-md hover:bg-blue-600 transition-colors duration-300">
        <FontAwesomeIcon icon={faHome} size="lg" /> {/* Adjusted size="lg" */}
      </Link>
      <h2 className="mb-8 text-3xl font-bold">Manage Your Transactions</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit or Manage</span>
            </Table.HeadCell>
          </Table.Head>
          {allTransactions.map((transaction, index) => (
            <Table.Body className="divide-y" key={transaction._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {transaction.title}
                </Table.Cell>
                <Table.Cell>${transaction.amount.toFixed(2)}</Table.Cell>
                <Table.Cell>{new Date(transaction.date).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{transaction.type}</Table.Cell>
                <Table.Cell>{transaction.category}</Table.Cell>
                <Table.Cell>
                  <Link to={`/admin/dashboard/edit-transaction/${transaction._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction._id,transaction.type)}
                    className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
};

export default AllTransactions;
