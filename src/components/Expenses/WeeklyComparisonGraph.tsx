import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const WeeklyComparisonGraph: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const transactionsQuery = query(
            collection(db, 'transactions'),
            where('userId', '==', userId), // Filter transactions for the logged-in user
            orderBy('uploadedAt', 'desc'),
            limit(1)
          );
          const querySnapshot = await getDocs(transactionsQuery);

          if (!querySnapshot.empty) {
            const latestTransactionDoc = querySnapshot.docs[0].data();
            if (latestTransactionDoc.transactions && latestTransactionDoc.transactions.length > 0) {
              const transactions = latestTransactionDoc.transactions;
              const groupedData = groupTransactionsByDay(transactions);
              const recentSevenDaysData = getRecentSevenDaysData(groupedData);
              setData(recentSevenDaysData);
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

  const groupTransactionsByDay = (transactions: any[]) => {
    const grouped: { [key: string]: { date: string; revenue: number; expenses: number } } = {};

    transactions.forEach((transaction: any) => {
      const date = transaction.completionTime.slice(0, 10);
      if (!grouped[date]) {
        grouped[date] = { date, revenue: 0, expenses: 0 };
      }
      if (transaction.withdrawn < 0) {
        grouped[date].expenses += Math.abs(transaction.withdrawn);
      } else {
        grouped[date].revenue += transaction.paidIn;
      }
    });

    return Object.values(grouped);
  };

  const getRecentSevenDaysData = (groupedData: any[]) => {
    const sortedData = groupedData.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
    return sortedData.slice(0, 7);
  };

  return (
    <Card>
      <Container>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="var(--Special-BG2, rgba(19, 116, 75, 0.6))" />
            <Bar dataKey="expenses" fill="var(--Special-BG2, rgba(0, 0, 0, 0.8))" />
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </Card>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

export default WeeklyComparisonGraph;
