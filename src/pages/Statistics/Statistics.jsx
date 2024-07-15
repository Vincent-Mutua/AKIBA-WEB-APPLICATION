import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import { db, auth } from '../../config/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, PolarGrid, Cell, Label, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import './statistics.css'


export default function Statistics() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [filterType, setFilterType] = useState('daily');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [expDist, setExpDist] = useState([]);
    const [revDist, setRevDist] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userId = auth.currentUser?.uid;
                if (userId) {
                    const transactionsQuery = query(
                        collection(db, 'transactions'),
                        where('userId', '==', userId),
                        orderBy('uploadedAt', 'desc'),
                        limit(1)
                    );
                    const querySnapshot = await getDocs(transactionsQuery);

                    if (!querySnapshot.empty) {
                        const latestTransactionDoc = querySnapshot.docs[0].data();
                        if (latestTransactionDoc.transactions && latestTransactionDoc.transactions.length > 0) {
                            let expensesArray = [];
                            let revArray = [];
                            let expenseDistributionArray = [];
                            let sendMoney = { type: 'Family and friends', value: 0 };
                            let tillNumber = { type: 'Goods and Services', value: 0 };
                            let payBill = { type: 'Bills', value: 0 };
                            for (let transaction of latestTransactionDoc.transactions) {
                                if (transaction.details.match('Transfer')) {
                                    sendMoney.value += Math.abs(transaction.withdrawn);
                                }
                                if (transaction.details.match('Merchant')) {
                                    tillNumber.value += Math.abs(transaction.withdrawn);
                                }
                                if (transaction.details.match('Online')) {
                                    payBill.value += Math.abs(transaction.withdrawn);
                                }
                                if (transaction.withdrawn < 0) {
                                    expensesArray.push(transaction);
                                } else {
                                    revArray.push(transaction);
                                }
                            }
                            expenseDistributionArray.push(sendMoney, tillNumber, payBill);
                            setExpDist(expenseDistributionArray);
                            setTransactions(latestTransactionDoc.transactions);
                            setRevenue(revArray);
                            let friendsAndFamily = { type: 'Friends and Family', value: 0 };
                            let mShwari = { type: 'Mshwari', value: 0 };
                            let revStatsArr = [];
                            for (let rev of revArray) {
                                if (rev.details.match('received')) {
                                    friendsAndFamily.value += rev.paidIn;
                                } else if (rev.details.match('M-Shwari')) {
                                    mShwari.value += rev.paidIn;
                                }
                            }
                            revStatsArr.push(friendsAndFamily, mShwari);
                            setRevDist(revStatsArr);
                            setExpenses(expensesArray);
                        }
                    } else {
                        console.log('No transactions found!');
                    }
                } else {
                    console.log('No user ID found!');
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setError('Error fetching transactions. Please try again later.');
            }
        };

        fetchTransactions();
    }, []);

    useEffect(() => {
        const processTransactions = () => {
            const expenseData = [];
            const revenueData = [];

            transactions.forEach((transaction) => {
                const date = transaction.completionTime.split(' ')[0];
                if (transaction.withdrawn < 0) {
                    expenseData.push({ date, amount: -transaction.withdrawn });
                }
                if (transaction.paidIn !== null) {
                    revenueData.push({ date, amount: transaction.paidIn });
                }
            });

            const mergedData = [];

            expenseData.forEach((expense) => {
                const existingEntry = mergedData.find(entry => entry.date === expense.date);
                if (existingEntry) {
                    existingEntry.expenses += expense.amount;
                } else {
                    mergedData.push({ date: expense.date, expenses: expense.amount, revenue: 0 });
                }
            });

            revenueData.forEach((revenue) => {
                const existingEntry = mergedData.find(entry => entry.date === revenue.date);
                if (existingEntry) {
                    existingEntry.revenue += revenue.amount;
                } else {
                    mergedData.push({ date: revenue.date, expenses: 0, revenue: revenue.amount });
                }
            });

            setGraphData(filterGraphData(mergedData));
        };

        processTransactions();
    }, [transactions, filterType, startDate, endDate]);

    const filterGraphData = (data) => {
        switch (filterType) {
            case 'daily':
                return filterDailyData(data);
            case 'weekly':
                return filterWeeklyData(data);
            case 'monthly':
                return filterMonthlyData(data);
            default:
                return data;
        }
    };

    const filterDailyData = (data) => {
        return data.filter(d => {
            const date = new Date(d.date);
            return date >= startDate && date <= endDate;
        });
    };

    const filterWeeklyData = (data) => {
        const result = [];
        const weeks = {};

        data.forEach(d => {
            const date = new Date(d.date);
            const weekNumber = getWeekNumber(date);

            if (!weeks[weekNumber]) {
                weeks[weekNumber] = { date: `Week ${weekNumber}`, expenses: 0, revenue: 0 };
                result.push(weeks[weekNumber]);
            }

            weeks[weekNumber].expenses += d.expenses;
            weeks[weekNumber].revenue += d.revenue;
        });

        return result;
    };

    const filterMonthlyData = (data) => {
        const result = [];
        const months = {};

        data.forEach(d => {
            const date = new Date(d.date);
            const month = date.getMonth();
            const year = date.getFullYear();
            const monthYear = `${month + 1}-${year}`;

            if (!months[monthYear]) {
                months[monthYear] = { date: monthYear, expenses: 0, revenue: 0 };
                result.push(months[monthYear]);
            }

            months[monthYear].expenses += d.expenses;
            months[monthYear].revenue += d.revenue;
        });

        return result;
    };

    const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((date.getDay() + 1 + days) / 7);
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className='statistics-page'>
            <Header />
            <Sidebar />
            <div className="statistics-content">
                <div className='expenses'>
                    <h2>Expenses and Revenue Graph</h2>
                    <div className="form-control">
                        <div>
                            <label>Filter by: </label>
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        {filterType === 'daily' && (
                            <div>
                                <label>Start Date: </label>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                <label>End Date: </label>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>
                        )}
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                            data={graphData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="expenses" fill='#4c4d4d' />
                            <Bar dataKey="revenue" fill='#82ca9d' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="pie-charts">
                    <div className="expenses-pie">
                    <div className="expenses-heading">
    <h2>Expenses</h2>
</div>

                        <ResponsiveContainer width="100%" height={300}  >
                            <PieChart>
                                <PolarGrid />
                                <Pie
                                    data={expDist}
                                    dataKey="value"
                                    nameKey="type"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {expDist.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                
                                <Tooltip />
                                <Legend
    wrapperStyle={{ display: 'block' }}
    align="left"
    verticalAlign="middle"
    layout="vertical"
    formatter={(value, entry) => <p>{value} : {entry.payload.value}</p>}
/>

                            </PieChart>
                        </ResponsiveContainer>
                        <div className="revenue-pie">
    <div className="expenses-heading">
        <h2>Revenue</h2>
    </div>
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <PolarGrid />
            <Pie
                data={revDist}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
            >
                {revDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                wrapperStyle={{ display: 'block' }}
                align="left"
                verticalAlign="middle"
                layout="vertical"
                formatter={(value, entry) => <p>{value} : {entry.payload.value}</p>}
            />
        </PieChart>
    </ResponsiveContainer>
</div>

                    </div>
                </div>
            </div>
        </div>
    );
}
