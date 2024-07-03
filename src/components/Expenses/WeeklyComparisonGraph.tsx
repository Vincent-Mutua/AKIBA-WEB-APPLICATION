import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { parseISO, startOfWeek, format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyComparisonGraph: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<number[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsQuery = query(
          collection(db, 'transactions'),
          orderBy('completionTime', 'desc')
        );
        const querySnapshot = await getDocs(transactionsQuery);

        const transactions = querySnapshot.docs.flatMap((doc) => {
          const data = doc.data();
          console.log('Document data:', data); // Log each document's data
          return data.transactions || [];
        });

        const withdrawnTransactions = transactions.filter((txn) => txn.withdrawn && txn.withdrawn.startsWith('-'));

        console.log('Fetched withdrawn transactions:', withdrawnTransactions);

        // Group transactions by week
        const groupedByWeek = withdrawnTransactions.reduce((acc: Record<string, number>, txn) => {
          const weekStart = format(startOfWeek(parseISO(txn.completionTime)), 'yyyy-MM-dd');
          acc[weekStart] = (acc[weekStart] || 0) + parseFloat(txn.withdrawn.replace('-', ''));
          return acc;
        }, {});

        console.log('Grouped transactions by week:', groupedByWeek);

        // Get last 10 weeks of data
        const weeklyExpenses = Object.entries(groupedByWeek)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .slice(0, 10)
          .reverse()
          .map(([, sum]) => sum);

        console.log('Weekly expenses:', weeklyExpenses);

        setWeeklyData(weeklyExpenses);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const data = {
    labels: Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: 'Expenses',
        data: weeklyData,
        backgroundColor: 'rgba(42, 170, 138)', // var(--Special-BG2)
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Expenses Comparison',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        barThickness: 30, // Increase or decrease to adjust the bar thickness
        categoryPercentage: 0.5,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        min: 0, // Minimum value for the y-axis
        max: 7500, // Adjust this value to lengthen the y-axis
        ticks: {
          stepSize: 100, // Adjust the step size between ticks
        },
      },
    },
  };

  return (
    <Card className="card">
      <Bar data={data} options={options} />
    </Card>
  );
};

const Card = styled.div`
  border-radius: 8px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background-color: var(--White, #fff);
  display: flex;
  flex-direction: column;
  padding: 0px 24px 34px;
  width: 150%;
  max-width: 112%;
  margin-top: -20px;
`;

export default WeeklyComparisonGraph;
