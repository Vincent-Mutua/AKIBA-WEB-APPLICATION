import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, auth } from '../../config/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const AllTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
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
              setTransactions(latestTransactionDoc.transactions);
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

  return (
    <Container>
      <Title>Recent Transactions</Title>
      <Tabs>
        <Tab className="active">All</Tab>
        <Tab>Revenue</Tab>
        <Tab>Expenses</Tab>
      </Tabs>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Receipt No</TableHeader>
            <TableHeader>Completion Time</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Details</TableHeader>
            <TableHeader>Paid In</TableHeader>
            <TableHeader>Withdrawn</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>{transaction.receiptNo}</TableCell>
              <TableCell>{new Date(transaction.completionTime.seconds * 1000).toLocaleString()}</TableCell>
              <TableCell>{transaction.transactionStatus}</TableCell>
              <TableCell>{transaction.details}</TableCell>
              <TableCell>{transaction.paidIn}</TableCell>
              <TableCell>{transaction.withdrawn}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoadMore>Load More</LoadMore>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 15px;
  line-height: 32px;
  color: #737373;
  margin-bottom: 16px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Tab = styled.div`
  padding: 10px 10px;
  font-size: 14px;
  font-weight: bold;
  color: #525252;
  cursor: pointer;

  &.active {
    color: #14b8a6;
    border-bottom: 2px solid #14b8a6;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;

const TableCell = styled.td`
  padding: 5px;
  text-align: left;
  font-size: 14px;
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #14b8a6;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default AllTransactions;
