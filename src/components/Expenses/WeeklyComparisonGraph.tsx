import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

// Example data, replace with your actual data source
/*const data = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 9800 },
  { name: 'Thu', revenue: 2780, expenses: 3908 },
  { name: 'Fri', revenue: 1890, expenses: 4800 },
  { name: 'Sat', revenue: 2390, expenses: 3800 },
  { name: 'Sun', revenue: 3490, expenses: 4300 },
];*/

const WeeklyComparisonGraph: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState([]);
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
              //console.log(latestTransactionDoc.transactions[0].withdrawn);
              let expensesArray = [];
              let revArray = [];
              let TempArray = []
              for (let transaction of latestTransactionDoc.transactions) {
                if (transaction.withdrawn < 0) {
                  expensesArray.push({expenses:Math.abs(transaction.withdrawn),time:transaction.completionTime.slice(0,10)});
                } else {
                  revArray.push({revenue:transaction.paidIn, time:transaction.completionTime.slice(0,10)})
                }
              }
              revArray = revArray.slice(0,7);
              expensesArray = expensesArray.slice(0,7);
              TempArray = revArray.concat(expensesArray);
              console.log(TempArray);
              setData(TempArray);
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
    console.log(typeof (transactions))
  }, []);
  return (
    <Card>
    <Container>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="var(--Special-BG2,rgba(19, 116, 75, 0.6))" />
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
