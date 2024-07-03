import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'This Year',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [65, 59, 80, 81, 56, 55],
    },
    {
      label: 'Last Year',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 86, 27],
    },
  ],
};

const options: ChartOptions<'bar'> = {
  indexAxis: 'y', // Display months on y-axis
  responsive: true,
  maintainAspectRatio: false, // Allow chart to adjust size based on container
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Expenses Comparison',
      font: {
        size: 22,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const Monthlychart = () => {
  return (
    <StyledCard className='card'>
      <Title>Expenses Comparison</Title>
      <Content>
        <Bar data={data} options={options} />
      </Content>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh; /* Set the card height */
  max-height: 800px; /* Optional: Set a maximum height to ensure it doesn't exceed a certain limit */
  width: 100%; /* Ensure the chart takes full width */

  /* Additional styling for responsiveness */
  @media (max-width: 768px) {
    height: auto; /* Adjust to auto height on smaller screens */
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
  flex: 1; /* Expand content to fill available space */
  flex-direction: column;
  padding: 24px;
  overflow: hidden; /* Ensure content does not overflow */
`;

export default Monthlychart;
