import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
// import Chart from '../Chart/Chart';
import moment from 'moment'; // for date handling

function Dashboard() {
    const {
        totalExpenses,
        incomes,
        expenses,
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses,
        transactionHistory
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

    return (
        <DashboardStyled>
            <InnerLayout>
                {/* <h1>All Transactions</h1> */}
                <div className="stats-con">
                    {/* Chart Full Width (2/3 of the row) */}
                    {/* <div className="chart-con">
                        <Chart />
                    </div> */}

                    {/* Totals (1/3 of the row) */}
                    {/* <div className="amount-con">
                        <div className="income">
                            <h2>Total Income</h2>
                            <p>K{totalIncome()}</p>
                        </div>
                        <div className="expense">
                            <h2>Total Expense</h2>
                            <p>K{totalExpenses()}</p>
                        </div>
                        <div className="balance">
                            <h2>Total Balance</h2>
                            <p>K {totalBalance()}</p>
                        </div>
                    </div> */}

                    {/* Income & Expense Tables with Filters in Full Width */}
                    <div className="history-con">
                        {/* Month Dropdown */}
                        {/* <div className="month-dropdown">
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
                        </div> */}

                        {/* Category Dropdown */}
                        {/* <div className="category-dropdown">
                            <label htmlFor="category">Select Category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                
                                <option value="">All Categories</option>
                                {['media', 'restaurant', 'farm', 'salon', 'laundry', 'legal-bag', 'philanthropy', 'other'].map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                        {/* Transaction History Table */}
                        {/* <h2>Transaction History</h2> */}
                        {/* <h3>{searchMonth || category ? `${searchMonth || category} Transactions` : 'All Transactions'}</h3> */}

                        {/* Display Filtered Incomes and Expenses in a Table */}
                        <div className="transaction-table">
                            {/* Incomes Table */}
                            {/* <h2>Incomes</h2> */}
                            {/* <table>
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
                            </table> */}

                            {/* Expenses Table */}
                            {/* <h2>Expenses</h2> */}
                            {/* <table>
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
                            </table> */}
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: 2fr 1fr; /* Chart takes 2/3, totals take 1/3 */

        gap: 2rem;

        .chart-con {
            width: 100%; /* Chart takes up full width of its column */
            height: auto;
            margin-bottom: 2rem;
        }

        .amount-con {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 0rem;

            .income, .expense, .balance {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: .1rem;
                font-size:1rem;
                

                p {
                    font-size: 1rem;
                    font-weight: 700;
                }
            }

            .balance {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                p {
                    color: var(--color-green);
                    opacity: 0.6;
                    font-size: 1.5rem;
                }
            }
            .income {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                p {
                    color: var(--color-green);
                    opacity: 0.6;
                    font-size: 1.5rem;
                }
            }
            .expense {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                p {
                    color: var(--color-green);
                    opacity: 0.6;
                    font-size: 1.5rem;
                }
            }
        }

        .history-con {
            grid-column: 1 / -1; /* Spans the full width of the grid */
            .month-dropdown, .category-dropdown {
                margin-bottom: 1rem;

                label {
                    margin-right: 0.5rem;
                    font-size: 1rem;
                }

                select {
                    padding: 0.5rem;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                    width: 100%;
                    max-width: 200px;
                    font-size: 1rem;
                }
            }

            h2 {
                margin: 1rem 0;
                font-size: 1rem;
            }

            .transaction-table {
                width: 100%;
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 1rem;

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
        }
    }

    @media (max-width: 768px) {
        .stats-con {
            grid-template-columns: 1fr; /* Stack everything on mobile */

            .chart-con {
                margin-bottom: 2rem;
            }

            .history-con {
                grid-column: 1 / -1;
            }
        }

        .month-dropdown, .category-dropdown select {
            width: 100%;
        }
    }
`;

export default Dashboard;







// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import Chart from '../Chart/Chart';
// import moment from 'moment'; // for date handling

// function Dashboard() {
//     const {
//         totalExpenses,
//         incomes,
//         expenses,
//         totalIncome,
//         totalBalance,
//         getIncomes,
//         getExpenses,
//         transactionHistory
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
//                 <h1>All Transactions</h1>
//                 <div className="stats-con">
//                     <div className="chart-con">
//                         <Chart />
//                         <div className="amount-con">
//                             <div className="income">
//                                 <h2>Total Income</h2>
//                                 <p>K{totalIncome()}</p>
//                             </div>
//                             <div className="expense">
//                                 <h2>Total Expense</h2>
//                                 <p>K{totalExpenses()}</p>
//                             </div>
//                             <div className="balance">
//                                 <h2>Total Balance</h2>
//                                 <p>K {totalBalance()}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="history-con">
//                         {/* Month Dropdown */}
//                         <div className="month-dropdown">
//                             <label htmlFor="month">Select Month:</label>
//                             <select
//                                 id="month"
//                                 value={searchMonth}
//                                 onChange={handleMonthChange}
//                             >
//                                 <option value="">All Months</option>
//                                 {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
//                                     <option key={month} value={month}>
//                                         {month}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Category Dropdown */}
//                         <div className="category-dropdown">
//                             <label htmlFor="category">Select Category:</label>
//                             <select
//                                 id="category"
//                                 value={category}
//                                 onChange={handleCategoryChange}
//                             >
//                                 <option value="">All Categories</option>
//                                 {['salary', 'freelancing', 'investments', 'stocks', 'bitcoin', 'bank', 'youtube', 'other'].map((category) => (
//                                     <option key={category} value={category}>
//                                         {category.charAt(0).toUpperCase() + category.slice(1)}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Transaction History Table */}
//                         <h2>Transaction History</h2>
//                         <h3>{searchMonth || category ? `${searchMonth || category} Transactions` : 'All Transactions'}</h3>

//                         {/* Display Filtered Incomes and Expenses in a Table */}
//                         <div className="transaction-table">
//                             {/* Incomes Table */}
//                             <h2>Incomes</h2>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Title</th>
//                                         <th>Amount</th>
//                                         <th>Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredIncomes.map((income) => {
//                                         const { _id, title, amount, date } = income;
//                                         return (
//                                             <tr key={_id}>
//                                                 <td>{title}</td>
//                                                 <td style={{ color: 'green' }}>+{amount}</td>
//                                                 <td>{moment(date).format('DD MMM YYYY')}</td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>

//                             {/* Expenses Table */}
//                             <h2>Expenses</h2>
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Title</th>
//                                         <th>Amount</th>
//                                         <th>Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredExpenses.map((expense) => {
//                                         const { _id, title, amount, date } = expense;
//                                         return (
//                                             <tr key={_id}>
//                                                 <td>{title}</td>
//                                                 <td style={{ color: 'red' }}>-{amount}</td>
//                                                 <td>{moment(date).format('DD MMM YYYY')}</td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </InnerLayout>
//         </DashboardStyled>
//     );
// }

// const DashboardStyled = styled.div`
//     .stats-con {
//         display: grid;
//          grid-template-columns: repeat(5, 1fr); 

//         gap: 2rem;

//         .chart-con {
//             grid-column: 1 / 4;
//             height: 400px;

//             .amount-con {
//                 display: grid;
//                 grid-template-columns: repeat(4, 1fr);
//                 gap: 2rem;
//                 margin-top: 2rem;

//                 .income, .expense {
//                     grid-column: span 2;
//                 }

//                 .income, .expense, .balance {
//                     background: #FCF6F9;
//                     border: 2px solid #FFFFFF;
//                     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//                     border-radius: 20px;
//                     padding: 1rem;

//                     p {
//                         font-size: 1.5rem;
//                         font-weight: 700;
//                     }
//                 }

//                 .balance {
//                     grid-column: 2 / 4;
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: center;
//                     align-items: center;

//                     p {
//                         color: var(--color-green);
//                         opacity: 0.6;
//                         font-size: 1.5rem;
//                     }
//                 }
//             }
//         }

//         .history-con {
//             grid-column: 4 / -1;

//             .month-dropdown, .category-dropdown {
//                 margin-bottom: 1rem;

//                 label {
//                     margin-right: 0.5rem;
//                     font-size: 1rem;
//                 }

//                 select {
//                     padding: 0.5rem;
//                     border-radius: 5px;
//                     border: 1px solid #ddd;
//                     width: 100%;
//                     max-width: 200px;
//                     font-size: 1rem;
//                 }
//             }

//             h2 {
//                 margin: 1rem 0;
//                 font-size: 1.8rem;
//             }

//             .transaction-table {
//                 width: 100%;
//                 table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     margin-top: 1rem;

//                     th, td {
//                         padding: 8px;
//                         text-align: left;
//                         font-size: 0.9rem;
//                         border-bottom: 1px solid #ddd;
//                     }

//                     th {
//                         background-color: #f4f4f4;
//                     }

//                     tr:nth-child(even) {
//                         background-color: #f9f9f9;
//                     }
//                 }
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         .stats-con {
//             grid-template-columns: 1fr;

//             .chart-con {
//                 grid-column: 1 / -1;
//                 margin-bottom: 2rem;
//             }

//             .history-con {
//                 grid-column: 1 / -1;
//             }
//         }

//         .month-dropdown, .category-dropdown select {
//             width: 100%;
//         }
//     }
// `;

// export default Dashboard;









// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext';
// import { InnerLayout } from '../../styles/Layouts';
// import Chart from '../Chart/Chart';
// import moment from 'moment'; // for date handling

// function Dashboard() {
//     const {
//         totalExpenses,
//         incomes,
//         expenses,
//         totalIncome,
//         totalBalance,
//         getIncomes,
//         getExpenses,
//         transactionHistory
//     } = useGlobalContext();

//     const [searchMonth, setSearchMonth] = useState('');
//     const [filteredIncomes, setFilteredIncomes] = useState([]);
//     const [filteredExpenses, setFilteredExpenses] = useState([]);

//     useEffect(() => {
//         getIncomes();
//         getExpenses();
//     }, []);

//     // Filter incomes and expenses by month based on the selected month
//     const filterTransactionsByMonth = (month) => {
//         if (!month) {
//             setFilteredIncomes(incomes);
//             setFilteredExpenses(expenses);
//             return;
//         }

//         const monthIncomes = incomes.filter(income => moment(income.date).format('MMMM') === month);
//         const monthExpenses = expenses.filter(expense => moment(expense.date).format('MMMM') === month);

//         setFilteredIncomes(monthIncomes);
//         setFilteredExpenses(monthExpenses);
//     };

//     // Handle month dropdown change
//     const handleMonthChange = (e) => {
//         const month = e.target.value;
//         setSearchMonth(month);
//         filterTransactionsByMonth(month);
//     };

//     return (
//         <DashboardStyled>
//             <InnerLayout>
//                 <h1>All Transactions</h1>
//                 <div className="stats-con">
//                     <div className="chart-con">
//                         <Chart />
//                         <div className="amount-con">
//                             <div className="income">
//                                 <h2>Total Income</h2>
//                                 <p>K{totalIncome()}</p>
//                             </div>
//                             <div className="expense">
//                                 <h2>Total Expense</h2>
//                                 <p>K{totalExpenses()}</p>
//                             </div>
//                             <div className="balance">
//                                 <h2>Total Balance</h2>
//                                 <p>K {totalBalance()}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="history-con">
//                         {/* Month Dropdown */}
//                         <div className="month-dropdown">
//                             <label htmlFor="month">Select Month:</label>
//                             <select
//                                 id="month"
//                                 value={searchMonth}
//                                 onChange={handleMonthChange}
//                             >
//                                 <option value="">All Months</option>
//                                 {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
//                                     <option key={month} value={month}>
//                                         {month}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Display Transaction History for Filtered Month */}
//                         <h2>Transaction History</h2>
//                         <h3>{searchMonth ? `${searchMonth} Transactions` : 'All Transactions'}</h3>
                        
//                         {/* Display Filtered Incomes */}
//                         <h2>Incomes</h2>
//                         <div className="transaction-list">
//                             {filteredIncomes.map((income) => {
//                                 const { _id, title, amount, date } = income;
//                                 return (
//                                     <div key={_id} className="transaction-item">
//                                         <p>{title}</p>
//                                         <p style={{ color: 'green' }}>+{amount}</p>
//                                         <p>{moment(date).format('DD MMM YYYY')}</p>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                         {/* Display Filtered Expenses */}
//                         <h2>Expenses</h2>
//                         <div className="transaction-list">
//                             {filteredExpenses.map((expense) => {
//                                 const { _id, title, amount, date } = expense;
//                                 return (
//                                     <div key={_id} className="transaction-item">
//                                         <p>{title}</p>
//                                         <p style={{ color: 'red' }}>-{amount}</p>
//                                         <p>{moment(date).format('DD MMM YYYY')}</p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </InnerLayout>
//         </DashboardStyled>
//     );
// }

// const DashboardStyled = styled.div`
//     .stats-con {
//         display: grid;
//         grid-template-columns: repeat(5, 1fr);
//         gap: 2rem;

//         .chart-con {
//             grid-column: 1 / 4;
//             height: 400px;

//             .amount-con {
//                 display: grid;
//                 grid-template-columns: repeat(4, 1fr);
//                 gap: 2rem;
//                 margin-top: 2rem;

//                 .income, .expense {
//                     grid-column: span 2;
//                 }

//                 .income, .expense, .balance {
//                     background: #FCF6F9;
//                     border: 2px solid #FFFFFF;
//                     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//                     border-radius: 20px;
//                     padding: 1rem;

//                     p {
//                         font-size: 3.5rem;
//                         font-weight: 700;
//                     }
//                 }

//                 .balance {
//                     grid-column: 2 / 4;
//                     display: flex;
//                     flex-direction: column;
//                     justify-content: center;
//                     align-items: center;

//                     p {
//                         color: var(--color-green);
//                         opacity: 0.6;
//                         font-size: 4.5rem;
//                     }
//                 }
//             }
//         }

//         .history-con {
//             grid-column: 4 / -1;

//             .month-dropdown {
//                 margin-bottom: 1rem;

//                 label {
//                     margin-right: 0.5rem;
//                     font-size: 1rem;
//                 }

//                 select {
//                     padding: 0.5rem;
//                     border-radius: 5px;
//                     border: 1px solid #ddd;
//                     width: 100%;
//                     max-width: 200px;
//                     font-size: 1rem;
//                 }
//             }

//             h2 {
//                 margin: 1rem 0;
//                 font-size: 1.8rem;
//             }

//             .transaction-list {
//                 display: flex;
//                 flex-direction: column;
//                 gap: 1rem;
//                 margin-top: 1rem;
//             }

//             .transaction-item {
//                 background: #FCF6F9;
//                 border: 2px solid #FFFFFF;
//                 box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//                 padding: 1rem;
//                 border-radius: 10px;
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;

//                 p {
//                     font-size: 1.2rem;
//                     margin: 0;
//                 }
//             }
//         }
//     }

//     @media (max-width: 768px) {
//         .stats-con {
//             grid-template-columns: 1fr;

//             .chart-con {
//                 grid-column: 1 / -1;
//                 margin-bottom: 2rem;
//             }

//             .history-con {
//                 grid-column: 1 / -1;
//             }
//         }

//         .month-dropdown select {
//             width: 100%;
//         }
//     }
// `;

// export default Dashboard;
