import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Monthly Expenses',
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: [1200, 1000, 800, 950, 1100, 1300, 1050, 1150, 1000, 1250, 900, 1100],
    },
  ],
};

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Monthly Expenses',
      font: {
        size: 22,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 200,
      },
    },
  },
};

const MonthlyExpensesChart = () => {
  return (
    <StyledCard className='card'>
      <Title>Monthly Expenses</Title>
      <Content>
        <Bar data={data} options={options} />
      </Content>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh;
  max-height: 800px;
  width: 100%;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Title = styled.div`
  color: var(--Gray-02, #878787);
  width: 100%;
  font: 400 22px/145% Inter, sans-serif;
`;

const Content = styled.div`
  border-radius: 16px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background-color: var(--White, #fff);
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
  overflow: hidden;
`;

export default MonthlyExpensesChart;
