import React, { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 

const Expense = () => {
  const navigate = useNavigate();
  const expenseCategories = [
    '--select--',
    'Rent/Mortgage',
    'Utilities (Electricity, Water, Gas)',
    'Groceries',
    'Dining Out/Food',
    'Transportation (Fuel, Public Transport)',
    'Insurance (Health, Car, Home)',
    'Entertainment',
    'Clothing',
    'Travel/Vacation',
    'Health/Medical',
    'Education',
    'Debt Payments',
    'Gifts/Donations',
    'Home Maintenance/Repairs',
    'Personal Care',
    'Other'
  ];

  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState(expenseCategories[0]);

  const handleChangeSelectedValue = (event) => {
    setSelectedExpenseCategory(event.target.value);
  };

  // Handle expense submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const amount = parseInt(form.amount.value, 10); // Ensure amount is an integer
    const type = 'expense';
    const date = new Date(form.date.value).toISOString();
    const category = form.categoryName.value;
    const description = form.description.value;

    const incomeObj = {
      title,
      amount,
      type,
      date,
      category,
      description,
    };

    // Send data to DB
    fetch(`${BASE_URL}/api/v1/add-expense`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(incomeObj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Expense uploaded successfully!');
        form.reset();
        navigate('/'); // Navigate to home page after successful upload
      })
      .catch((error) => {
        console.error('Error uploading expense:', error);
        alert('Failed to upload expense. Please try again.');
      });
  };

  return (
    <div className='px-4 my-12'>
      <Link to="/" className="absolute top-4 left-4 p-2 rounded-full bg-blue-400 text-white shadow-md hover:bg-blue-600 transition-colors duration-300">
        <FontAwesomeIcon icon={faHome} size="lg" /> {/* Adjusted size="lg" */}
      </Link>
      <h2 className='mb-8 text-3xl font-bold'>Upload Expense</h2>

      <form onSubmit={handleSubmit} className='flex flex-col flex-wrap gap-4 lg:w-[1180px]'>
        {/* First Row */}
        <div className='flex flex-col gap-8 md:flex-row'>
          {/* Expense Source */}
          <div className='md:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='title' value='Expense Source' />
            </div>
            <TextInput id='title' name='title' type='text' placeholder='Expense Source' required />
          </div>

          {/* Amount */}
          <div className='md:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='amount' value='Amount' />
            </div>
            <TextInput id='amount' name='amount' type='number' placeholder='Amount' required />
          </div>
        </div>

        {/* Second Row */}
        <div className='flex flex-col gap-8 md:flex-row'>
          {/* Date */}
          <div className='md:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='date' value='Date' />
            </div>
            <TextInput id='date' name='date' type='date' placeholder='Date' required />
          </div>

          {/* Category */}
          <div className='md:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='categoryName' value='Expense Category' />
            </div>
            <select
              id='categoryName'
              name='categoryName'
              className='w-full rounded'
              value={selectedExpenseCategory}
              onChange={handleChangeSelectedValue}
            >
              {expenseCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <div className='mb-2 block'>
            <Label htmlFor='description' value='Description' />
          </div>
          <Textarea
            id='description'
            name='description'
            placeholder='Write a description...'
            required
            rows={6}
            className='w-full'
          />
        </div>

        <Button type='submit' className='mt-5'>
          Upload Expense
        </Button>
      </form>
    </div>
  );
}

export default Expense;