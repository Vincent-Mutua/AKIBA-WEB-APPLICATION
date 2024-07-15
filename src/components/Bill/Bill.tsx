import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const BillCard: React.FC = () => {
  const [billsData, setBillsData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        let tempArray = [];
        let bills_collection = collection(db, 'Bills', auth.currentUser.uid, 'Bill');
        let billsQuery = query(bills_collection, limit(4  ));
        
        getDocs(billsQuery)
          .then((snapshot) => {
            snapshot.forEach((document) => {
              tempArray.push({ date: document.id, description: document.data().description, amount: document.data().amount });
            });
            console.log(tempArray);
            setBillsData(tempArray);
          }).catch(err => {
            console.error(err);
          });
      } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const checkForNotifications = (bills) => {
    const today = new Date();
    const notifications = bills.filter(bill => {
      const dueDate = new Date(bill.dueDate);
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 1;
    });
    setNotifications(notifications);
  };

  fetchBills();
}, []);

useEffect(() => {
  if (notifications.length > 0) {
    // Trigger notifications (email or in-app)
    notifications.forEach(notification => {
      console.log(`Reminder: Your bill for ${notification.description} is due soon.`);
    });
  }
}, [notifications]);

return (
  <CardContainer className='card'>
    <Bills>Upcoming Bills</Bills>
    <AllBills to="/bills">View all</AllBills>
    
    {billsData.map((bill, index) => (
      <BillRow key={index}>
        <BillDetails>
          <BillInfo>
            <BillTitle>{bill.description}</BillTitle>
            <LastCharge>{new Date(bill.date).toLocaleDateString()}</LastCharge>
          </BillInfo>
        </BillDetails>
        <Amount>{`Ksh ${bill.amount}`}</Amount>
      </BillRow>
    ))}
    
  </CardContainer>
);
};
const AllBills = styled(NavLink)` color: var(--Secondary, #525256);
  text-align: right;
  text-decoration: none;
  text-transform: capitalize;
  align-self: start;
  font: 500 12px/120% Inter, sans-serif;
  padding-right: 10px;
  margin-left: auto;
  margin-top: -29px;
  text-color: #118fa8;
   &:hover {
   color: #118fa8; // Example hover effect, adjust as needed
    text-decoration: underline; // Example hover effect, adjust as needed
  }
 
   
`;

const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 352px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 97%;
  justify-content: space-between;
`;
const Bills = styled.div`  
  color: var(--Secondary, #525256);
  text-align: left;
  text-transform: capitalize;
  align-self: start;
  font: 500 12px/120% Inter, sans-serif;
  padding-right: 10px;
  width: 50%;
`;


const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 27px;
`;

const BillDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BillInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BillTitle = styled.div`
  color: #525256;
  font-weight: 700;
  font-size: 16px;
`;

const LastCharge = styled.div`
  color: #9f9f9f;
  font-weight: 400;
  font-size: 12px;
`;

const Amount = styled.div`
  color: #191919;
  font-weight: 700;
  font-size: 14px;
`;

export default BillCard;
