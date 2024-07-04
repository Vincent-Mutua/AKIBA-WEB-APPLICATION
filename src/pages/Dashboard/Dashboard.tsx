import * as React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TotalBalanceCard from '../../components/Balance/TotalBalanceCard';
import Goals from '../../components/Goals/Goals';
import BillCard from '../../components/Bill/Bill';
import TransactionCard from '../../components/Transactions/Transactions';
import WeeklyComparisonGraph from '../../components/Expenses/WeeklyComparisonGraph';
import styled from 'styled-components';
import Footer from '../../components/Footer/Footer';
const ParentContainer = styled.div`
  width: 60%;
  padding: 20px;
  margin-bottom:100px
`;
const Dashboard: React.FC = () => {
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
            <br />

            {/* Cards Row */}
            <div className="row">
              <div className="col-md-4 mb-4">
                <TotalBalanceCard />
              </div>
              <div className="col-md-4 mb-4">
                <Goals/>
              </div>
              <div className="col-md-4 mb-4">
                <BillCard />
              </div>
              <div className="col-md-4 mb-4">
                <TransactionCard />
                </div>
                <div className="col-md-8">
  <div className="card" style={{ height: '200px' }}>
    <WeeklyComparisonGraph />
  </div>
</div>

    <div>
      <Footer />
    </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  );
};

export default Dashboard;
