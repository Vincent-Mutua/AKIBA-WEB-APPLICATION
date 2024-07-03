import * as React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Monthlychart from '../../components/Expenses/MonthlyExpenses';
import Footer from '../../components/Footer/Footer';


const AllExpenses: React.FC = () => {
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
                <Monthlychart/>
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
