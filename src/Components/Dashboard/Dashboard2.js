import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import moment from 'moment'; // for date handling
import { jsPDF } from 'jspdf'; // Import jsPDF
import Navigation2 from '../Navigation/Navigation2';
import Navigation from '../Navigation/Navigation';
import Dashboard from './Dashboard';
import Income from '../Income/Income';
import POS from '../POS/POS';
import Expenses from '../Expenses/Expenses';

function Dashboard2() {
    const {
        incomes,
        expenses,
        getIncomes,
        getExpenses
    } = useGlobalContext();

    const [searchMonth, setSearchMonth] = useState('');
    const [category, setCategory] = useState('');
    const [filteredIncomes, setFilteredIncomes] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    // Filter incomes and expenses by month and category
    const filterTransactions = (month, category) => {
        let monthFilteredIncomes = incomes;
        let monthFilteredExpenses = expenses;

        if (month) {
            monthFilteredIncomes = incomes.filter(income => moment(income.date).format('MMMM') === month);
            monthFilteredExpenses = expenses.filter(expense => moment(expense.date).format('MMMM') === month);
        }

        if (category) {
            monthFilteredIncomes = monthFilteredIncomes.filter(income => income.category === category);
            monthFilteredExpenses = monthFilteredExpenses.filter(expense => expense.category === category);
        }

        setFilteredIncomes(monthFilteredIncomes);
        setFilteredExpenses(monthFilteredExpenses);
    };

    // Handle month dropdown change
    const handleMonthChange = (e) => {
        const month = e.target.value;
        setSearchMonth(month);
        filterTransactions(month, category);
    };

    // Handle category dropdown change
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setCategory(category);
        filterTransactions(searchMonth, category);
    };

    // Calculate total income and total expenses
    const calculateTotal = (transactions) => {
        return transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
    };

    // Create a heading string for both incomes and expenses
    const getHeading = (type) => {
        if (searchMonth && category) {
            return `${type.charAt(0).toUpperCase() + type.slice(1)} for the month of ${searchMonth} from the ${category} category`;
        }
        if (searchMonth) {
            return `${type.charAt(0).toUpperCase() + type.slice(1)} for the month of ${searchMonth}`;
        }
        if (category) {
            return `${type.charAt(0).toUpperCase() + type.slice(1)} from the ${category} category`;
        }
        return `${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    };

    // Function to generate and download the PDF (only the filtered data)
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Title for the PDF
        doc.setFontSize(16);
        doc.text('Filtered Income and Expenses', 20, 20);

        // Incomes heading
        doc.setFontSize(12);
        doc.text(getHeading('income'), 20, 30);
        doc.autoTable({
            startY: 40,
            head: [['Title', 'Amount', 'Date']],
            body: filteredIncomes.map((income) => [
                income.title,
                `+K${income.amount}`,
                moment(income.date).format('DD MMM YYYY')
            ])
        });

        // Total income
        const totalIncome = calculateTotal(filteredIncomes);
        doc.text(`Total Income: +K${totalIncome.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);

        // Expenses heading
        doc.addPage();
        doc.text(getHeading('expense'), 20, 30);
        doc.autoTable({
            startY: 40,
            head: [['Title', 'Amount', 'Date']],
            body: filteredExpenses.map((expense) => [
                expense.title,
                `-K${expense.amount}`,
                moment(expense.date).format('DD MMM YYYY')
            ])
        });

        // Total expense
        const totalExpense = calculateTotal(filteredExpenses);
        doc.text(`Total Expense: -K${totalExpense.toFixed(2)}`, 20, doc.lastAutoTable.finalY + 10);

        // Save the PDF
        doc.save('filtered-income-expenses.pdf');
    };

    return (
        <DashboardStyled>
            <POS/>
           
            
            <InnerLayout>
                <h1>Filtered Transactions</h1>

                <div className="history-con">
                    {/* Month Dropdown */}
                    <div className="month-dropdown">
                        <label htmlFor="month">Select Month:</label>
                        <select
                            id="month"
                            value={searchMonth}
                            onChange={handleMonthChange}
                        >
                            <option value="">All Months</option>
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Dropdown */}
                    <div className="category-dropdown">
                        <label htmlFor="category">Select Business Component</label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Business Components</option>
                            {['media', 'restaurant', 'farm', 'salon', 'laundry', 'legal-bag', 'philanthropy', 'other'].map((category) => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Display Heading for Filtered Incomes */}
                    <h2>{getHeading('income')}</h2>
                    <div className="transaction-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredIncomes.map((income) => {
                                    const { _id, title, amount, date } = income;
                                    return (
                                        <tr key={_id}>
                                            <td>{title}</td>
                                            <td style={{ color: 'green' }}>+{amount}</td>
                                            <td>{moment(date).format('DD MMM YYYY')}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Display the Total Income for the filtered transactions */}
                    {filteredIncomes.length > 0 && (
                        <div className="total-summary">
                            <p><strong>Total Income: </strong>+K{calculateTotal(filteredIncomes).toFixed(2)}</p>
                        </div>
                    )}

                    {/* Display Heading for Filtered Expenses */}
                    <h2>{getHeading('expense')}</h2>
                    <div className="transaction-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((expense) => {
                                    const { _id, title, amount, date } = expense;
                                    return (
                                        <tr key={_id}>
                                            <td>{title}</td>
                                            <td style={{ color: 'red' }}>-{amount}</td>
                                            <td>{moment(date).format('DD MMM YYYY')}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Display the Total Expense for the filtered transactions */}
                    {filteredExpenses.length > 0 && (
                        <div className="total-summary">
                            <p><strong>Total Expense: </strong>-K{calculateTotal(filteredExpenses).toFixed(2)}</p>
                        </div>
                    )}

                    {/* Download PDF Button */}
                    <button className="download-btn" onClick={downloadPDF}>Download PDF</button>
                </div>
            </InnerLayout>
            <Income/>
            <Expenses/>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .history-con {
        margin-top: 2rem;

        .month-dropdown, .category-dropdown {
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;

            label {
                font-size: 1rem;
                margin-bottom: 0.5rem;
            }

            select {
                padding: 0.5rem;
                border-radius: 5px;
                border: 1px solid #ddd;
                font-size: 1rem;
                max-width: 200px;
                width: 100%;
            }
        }

        h2 {
            margin-top: 1rem;
            font-size: 1.8rem;
        }

        .transaction-table {
            margin-top: 1rem;

            table {
                width: 100%;
                border-collapse: collapse;

                th, td {
                    padding: 8px;
                    text-align: left;
                    font-size: 0.9rem;
                    border-bottom: 1px solid #ddd;
                }

                th {
                    background-color: #f4f4f4;
                }

                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
            }
        }

        .total-summary {
            margin-top: 1rem;
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
        }

        .download-btn {
            margin-top: 2rem;
            padding: 1rem 2rem;
            background-color: #4CAF50;
            color: white;
            font-size: 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #45a049;
            }
        }
    }

    @media (max-width: 768px) {
        .history-con {
            .month-dropdown, .category-dropdown {
                display: block;

                select {
                    width: 100%;
                }
            }

            .transaction-table {
                table {
                    font-size: 0.8rem;
                }
            }

            .total-summary {
                font-size: 1rem;
            }
        }
    }
`;

export default Dashboard2;





// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import moment from 'moment'; // for date handling

// function Dashboard2() {
//     const {
//         incomes,
//         expenses,
//         getIncomes,
//         getExpenses
//     } = useGlobalContext();

//     const [searchMonth, setSearchMonth] = useState('');
//     const [category, setCategory] = useState('');
//     const [filteredIncomes, setFilteredIncomes] = useState([]);
//     const [filteredExpenses, setFilteredExpenses] = useState([]);

//     useEffect(() => {
//         getIncomes();
//         getExpenses();
//     }, []);

//     // Filter incomes and expenses by month and category
//     const filterTransactions = (month, category) => {
//         let monthFilteredIncomes = incomes;
//         let monthFilteredExpenses = expenses;

//         if (month) {
//             monthFilteredIncomes = incomes.filter(income => moment(income.date).format('MMMM') === month);
//             monthFilteredExpenses = expenses.filter(expense => moment(expense.date).format('MMMM') === month);
//         }

//         if (category) {
//             monthFilteredIncomes = monthFilteredIncomes.filter(income => income.category === category);
//             monthFilteredExpenses = monthFilteredExpenses.filter(expense => expense.category === category);
//         }

//         setFilteredIncomes(monthFilteredIncomes);
//         setFilteredExpenses(monthFilteredExpenses);
//     };

//     // Handle month dropdown change
//     const handleMonthChange = (e) => {
//         const month = e.target.value;
//         setSearchMonth(month);
//         filterTransactions(month, category);
//     };

//     // Handle category dropdown change
//     const handleCategoryChange = (e) => {
//         const category = e.target.value;
//         setCategory(category);
//         filterTransactions(searchMonth, category);
//     };

//     // Calculate total income and total expenses
//     const calculateTotal = (transactions) => {
//         return transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
//     };

//     return (
//         <DashboardStyled>
//             <InnerLayout>
//                 <h1>Filtered Transactions</h1>

//                 <div className="history-con">
//                     {/* Month Dropdown */}
//                     <div className="month-dropdown">
//                         <label htmlFor="month">Select Month:</label>
//                         <select
//                             id="month"
//                             value={searchMonth}
//                             onChange={handleMonthChange}
//                         >
//                             <option value="">All Months</option>
//                             {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
//                                 <option key={month} value={month}>
//                                     {month}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Category Dropdown */}
//                     <div className="category-dropdown">
//                         <label htmlFor="category">Select Category:</label>
//                         <select
//                             id="category"
//                             value={category}
//                             onChange={handleCategoryChange}
//                         >
//                             <option value="">All Categories</option>
//                             {['salary', 'freelancing', 'investments', 'stocks', 'bitcoin', 'bank', 'youtube', 'other'].map((category) => (
//                                 <option key={category} value={category}>
//                                     {category.charAt(0).toUpperCase() + category.slice(1)}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Display Filtered Incomes */}
//                     <h2>Incomes</h2>
//                     <div className="transaction-table">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Title</th>
//                                     <th>Amount</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredIncomes.map((income) => {
//                                     const { _id, title, amount, date } = income;
//                                     return (
//                                         <tr key={_id}>
//                                             <td>{title}</td>
//                                             <td style={{ color: 'green' }}>+{amount}</td>
//                                             <td>{moment(date).format('DD MMM YYYY')}</td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Display the Total Income for the filtered transactions */}
//                     {filteredIncomes.length > 0 && (
//                         <div className="total-summary">
//                             <p><strong>Total Income: </strong>+K{calculateTotal(filteredIncomes).toFixed(2)}</p>
//                         </div>
//                     )}

//                     {/* Display Filtered Expenses */}
//                     <h2>Expenses</h2>
//                     <div className="transaction-table">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Title</th>
//                                     <th>Amount</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredExpenses.map((expense) => {
//                                     const { _id, title, amount, date } = expense;
//                                     return (
//                                         <tr key={_id}>
//                                             <td>{title}</td>
//                                             <td style={{ color: 'red' }}>-{amount}</td>
//                                             <td>{moment(date).format('DD MMM YYYY')}</td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Display the Total Expense for the filtered transactions */}
//                     {filteredExpenses.length > 0 && (
//                         <div className="total-summary">
//                             <p><strong>Total Expense: </strong>-K{calculateTotal(filteredExpenses).toFixed(2)}</p>
//                         </div>
//                     )}
//                 </div>
//             </InnerLayout>
//         </DashboardStyled>
//     );
// }

// const DashboardStyled = styled.div`
//     .history-con {
//         margin-top: 2rem;

//         .month-dropdown, .category-dropdown {
//             margin-bottom: 1rem;
//             display: flex;
//             flex-direction: column;

//             label {
//                 font-size: 1rem;
//                 margin-bottom: 0.5rem;
//             }

//             select {
//                 padding: 0.5rem;
//                 border-radius: 5px;
//                 border: 1px solid #ddd;
//                 font-size: 1rem;
//                 max-width: 200px;
//                 width: 100%;
//             }
//         }

//         h2 {
//             margin-top: 1rem;
//             font-size: 1.8rem;
//         }

//         .transaction-table {
//             margin-top: 1rem;

//             table {
//                 width: 100%;
//                 border-collapse: collapse;

//                 th, td {
//                     padding: 8px;
//                     text-align: left;
//                     font-size: 0.9rem;
//                     border-bottom: 1px solid #ddd;
//                 }

//                 th {
//                     background-color: #f4f4f4;
//                 }

//                 tr:nth-child(even) {
//                     background-color: #f9f9f9;
//                 }
//             }
//         }

//         .total-summary {
//             margin-top: 1rem;
//             font-size: 1.2rem;
//             font-weight: bold;
//             color: #333;
//         }
//     }

//     @media (max-width: 768px) {
//         .history-con {
//             .month-dropdown, .category-dropdown {
//                 display: block;

//                 select {
//                     width: 100%;
//                 }
//             }

//             .transaction-table {
//                 table {
//                     font-size: 0.8rem;
//                 }
//             }

//             .total-summary {
//                 font-size: 1rem;
//             }
//         }
//     }
// `;

// export default Dashboard2;




// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import moment from 'moment'; // for date handling

// function Dashboard2() {
//     const {
//         incomes,
//         expenses,
//         getIncomes,
//         getExpenses
//     } = useGlobalContext();

//     const [searchMonth, setSearchMonth] = useState('');
//     const [category, setCategory] = useState('');
//     const [filteredIncomes, setFilteredIncomes] = useState([]);
//     const [filteredExpenses, setFilteredExpenses] = useState([]);

//     useEffect(() => {
//         getIncomes();
//         getExpenses();
//     }, []);

//     // Filter incomes and expenses by month and category
//     const filterTransactions = (month, category) => {
//         let monthFilteredIncomes = incomes;
//         let monthFilteredExpenses = expenses;

//         if (month) {
//             monthFilteredIncomes = incomes.filter(income => moment(income.date).format('MMMM') === month);
//             monthFilteredExpenses = expenses.filter(expense => moment(expense.date).format('MMMM') === month);
//         }

//         if (category) {
//             monthFilteredIncomes = monthFilteredIncomes.filter(income => income.category === category);
//             monthFilteredExpenses = monthFilteredExpenses.filter(expense => expense.category === category);
//         }

//         setFilteredIncomes(monthFilteredIncomes);
//         setFilteredExpenses(monthFilteredExpenses);
//     };

//     // Handle month dropdown change
//     const handleMonthChange = (e) => {
//         const month = e.target.value;
//         setSearchMonth(month);
//         filterTransactions(month, category);
//     };

//     // Handle category dropdown change
//     const handleCategoryChange = (e) => {
//         const category = e.target.value;
//         setCategory(category);
//         filterTransactions(searchMonth, category);
//     };

//     return (
//         <DashboardStyled>
//             <InnerLayout>
//                 <h1>Filtered Transactions</h1>

//                 <div className="history-con">
//                     {/* Month Dropdown */}
//                     <div className="month-dropdown">
//                         <label htmlFor="month">Select Month:</label>
//                         <select
//                             id="month"
//                             value={searchMonth}
//                             onChange={handleMonthChange}
//                         >
//                             <option value="">All Months</option>
//                             {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
//                                 <option key={month} value={month}>
//                                     {month}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Category Dropdown */}
//                     <div className="category-dropdown">
//                         <label htmlFor="category">Select Category:</label>
//                         <select
//                             id="category"
//                             value={category}
//                             onChange={handleCategoryChange}
//                         >
//                             <option value="">All Categories</option>
//                             {['salary', 'freelancing', 'investments', 'stocks', 'bitcoin', 'bank', 'youtube', 'other'].map((category) => (
//                                 <option key={category} value={category}>
//                                     {category.charAt(0).toUpperCase() + category.slice(1)}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Display Filtered Incomes and Expenses in a Table */}
//                     <h2>Incomes</h2>
//                     <div className="transaction-table">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Title</th>
//                                     <th>Amount</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredIncomes.map((income) => {
//                                     const { _id, title, amount, date } = income;
//                                     return (
//                                         <tr key={_id}>
//                                             <td>{title}</td>
//                                             <td style={{ color: 'green' }}>+{amount}</td>
//                                             <td>{moment(date).format('DD MMM YYYY')}</td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Expenses Table */}
//                     <h2>Expenses</h2>
//                     <div className="transaction-table">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Title</th>
//                                     <th>Amount</th>
//                                     <th>Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredExpenses.map((expense) => {
//                                     const { _id, title, amount, date } = expense;
//                                     return (
//                                         <tr key={_id}>
//                                             <td>{title}</td>
//                                             <td style={{ color: 'red' }}>-{amount}</td>
//                                             <td>{moment(date).format('DD MMM YYYY')}</td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </InnerLayout>
//         </DashboardStyled>
//     );
// }

// const DashboardStyled = styled.div`
//     .history-con {
//         margin-top: 2rem;

//         .month-dropdown, .category-dropdown {
//             margin-bottom: 1rem;
//             display: flex;
//             flex-direction: column;

//             label {
//                 font-size: 1rem;
//                 margin-bottom: 0.5rem;
//             }

//             select {
//                 padding: 0.5rem;
//                 border-radius: 5px;
//                 border: 1px solid #ddd;
//                 font-size: 1rem;
//                 max-width: 200px;
//                 width: 100%;
//             }
//         }

//         h2 {
//             margin-top: 1rem;
//             font-size: 1.8rem;
//         }

//         .transaction-table {
//             margin-top: 1rem;

//             table {
//                 width: 100%;
//                 border-collapse: collapse;

//                 th, td {
//                     padding: 8px;
//                     text-align: left;
//                     font-size: 0.9rem;
//                     border-bottom: 1px solid #ddd;
//                 }

//                 th {
//                     background-color: #f4f4f4;
//                 }

//                 tr:nth-child(even) {
//                     background-color: #f9f9f9;
//                 }
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         .history-con {
//             .month-dropdown, .category-dropdown {
//                 display: block;

//                 select {
//                     width: 100%;
//                 }
//             }

//             .transaction-table {
//                 table {
//                     font-size: 0.8rem;
//                 }
//             }
//         }
//     }
// `;

// export default Dashboard2;
