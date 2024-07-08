import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Monthlychart from '../../components/Expenses/MonthlyExpenses';
import Footer from '../../components/Footer/Footer';
import { db, auth } from '../../config/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { BarChart, XAxis, YAxis, Legend, Tooltip, Bar, CartesianGrid, LineChart, Line } from 'recharts';
import ExpenseCard from '../../components/Expenses/ExpenseCard';
import { Button, Card, CardBody, CardGroup, CardSubtitle, CardTitle } from 'react-bootstrap';
import { House, Phone, TrainFreightFront, MusicNote } from 'react-bootstrap-icons';


const AllExpenses: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  React.useEffect(() => {
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
              for (let transaction of latestTransactionDoc.transactions) {
                if (transaction.withdrawn < 0) {
                  expensesArray.push({...transaction, amount:Math.abs(transaction.withdrawn)});
                  console.log(transaction);
                } else {
                  revArray.push(transaction)
                }
              }
              setTransactions(expensesArray);
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
    <div className="container-fluid">
      <Header />
      <div className="row">

        {/* Sidebar (Left) */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Cards Section (Right) */}
        <div className="col-md-10">
          <div className="container-fluid">
            {/* Cards Row */}
            <div className="row">
              Expenses
              <div className="col-md-12 mb-1">
                {transactions &&
                  <LineChart width={1200} height={400} data={transactions}>
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="completionTime" />
                    <YAxis />
                    <Tooltip/>
                  </LineChart>}
              </div>
              <div className="expenses-div">
                  <CardGroup>
                    <Card>
                      <CardBody>
                        <CardTitle tag="h2"> Housing </CardTitle>
                        <CardSubtitle> Money Spent on Rent </CardSubtitle>
                        <House/>
                        <Card.Text>
                          Ksh 7500
                        </Card.Text>
                        <Button> See Transactions </Button>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <CardTitle> Transport </CardTitle>
                        <CardSubtitle> Money Spent on Transport </CardSubtitle>
                        <TrainFreightFront/>
                        <Card.Text>
                          Ksh 3500
                        </Card.Text>
                        <Button> See Transactions </Button>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <CardTitle> Entertainment </CardTitle>
                        <CardSubtitle> Money spent on streaming services </CardSubtitle>
                        <MusicNote/>
                        <Card.Text>
                          Ksh 2000
                        </Card.Text>
                        <Button> See Transactions </Button>
                      </CardBody>
                    </Card>
                  </CardGroup>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AllExpenses;
