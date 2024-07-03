import * as React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllTransactions from '../../components/Transactions/AllTransactions';
import Footer from '../../components/Footer/Footer';

const Transactions: React.FC = () => {
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
              <div className="col-md-12 mb-1">
                < AllTransactions/>
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

export default Transactions;
