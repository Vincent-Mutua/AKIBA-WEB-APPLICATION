import * as React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TotalBalanceCard from '../../components/Balance/TotalBalanceCard';
import AddAccount from '../../components/Balance/AddAccount';
import Footer from '../../components/Footer/Footer';

const Balances: React.FC = () => {
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
            <br/>

            {/* Cards Row */}
            <div className="row">
              <div className="col-md-4 mb-4">
                <TotalBalanceCard />
              </div>
              <div className="col-md-4 mb-4">
              <TotalBalanceCard />
              </div>
              <div className="col-md-4 mb-4">
              <TotalBalanceCard />
              </div>
              <div className="col-md-4 mb-4">
              <TotalBalanceCard />
                </div>
                <div className="col-md-4 mb-4">
              <TotalBalanceCard />
                </div>
                <div className="col-md-4 mb-4">
              <AddAccount />
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

export default Balances;
