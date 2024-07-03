import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const RecentTransactionsCard: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]); // Adjust the type as per your actual transaction structure

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const transactionsQuery = query(
            collection(db, 'transactions'),
            orderBy('uploadedAt', 'desc'),
            limit(3) // Fetch up to 3 transactions
          );
          const querySnapshot = await getDocs(transactionsQuery);
          if (!querySnapshot.empty) {
            let recentTransactions: any[] = [];
            querySnapshot.forEach(doc => {
              const transactionData = doc.data();
              if (
                transactionData.transactions &&
                transactionData.transactions.length > 0
              ) {
                // Filter out transactions with details 'Customer Transfer of Funds Charge'
                const filteredTransactions = transactionData.transactions.filter(
                  (transaction: any) =>
                    transaction.details !== 'Customer Transfer of Funds Charge'
                );
                // Add valid transactions to the recentTransactions array until we have 3
                filteredTransactions.forEach((transaction: any) => {
                  if (recentTransactions.length < 3) {
                    recentTransactions.push({
                      details: transaction.details,
                      amount: transaction.paidIn || transaction.withdrawn,
                      completionTime: transaction.completionTime
                    });
                  }
                });
                // If we have 3 transactions, stop processing further
                if (recentTransactions.length === 3) {
                  return;
                }
              }
            });
            setTransactions(recentTransactions);
          } else {
            setTransactions([]);
          }
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <CardContainer className="card">
      <CardContent className="card-body">
        <Header>
          <Title>Recent Transactions</Title>
        </Header>
        <TransactionList>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TransactionItem key={index}>
                <TransactionDetails>{transaction.details}</TransactionDetails>
                <TransactionAmount>{`ksh ${transaction.amount}`}</TransactionAmount>
                <TransactionTime>{transaction.completionTime}</TransactionTime>
              </TransactionItem>
            ))
          ) : (
            <NoTransactions>No transactions found.</NoTransactions>
          )}
        </TransactionList>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background-color: var(--White, #fff);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding-bottom: 12px;
  justify-content: space-between;
  align-items: start;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  gap: 20px;
  text-transform: capitalize;
`;

const Title = styled.div`
  color: var(--Secondary, #525256);
  font: 600 15px/120% Inter, sans-serif;
`;

const TransactionList = styled.div`
  margin-top: 12px;
`;

const TransactionItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
`;

const TransactionDetails = styled.div`
  font: 500 14px/143% Inter, sans-serif;
  color: var(--Default-Black, #191919);
`;

const TransactionAmount = styled.div`
  font: 700 16px/150% Inter, sans-serif;
  color: var(--Primary-color, #299d91);
`;

const TransactionTime = styled.div`
  font: 400 12px/140% Inter, sans-serif;
  color: var(--Secondary, #525256);
`;

const NoTransactions = styled.div`
  text-align: center;
  color: var(--Secondary, #525256);
  font: 500 14px/143% Inter, sans-serif;
`;

export default RecentTransactionsCard;
