import React from 'react';
import styled from 'styled-components';
import { auth, storage, db } from '../../config/firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';  

const BillCard: React.FC = () => {
  const [billsData, setBillsData] = React.useState([]);
  React.useEffect(() => { 
    let tempArray = [];
    let bills_collection = collection(db, 'Bills', auth.currentUser.uid, 'Bill');
    getDocs(bills_collection)
      .then((snapshot) => {
        snapshot.forEach((document) => {
          tempArray.push({ date: document.id, description: document.data().description, amount: document.data().amount });
        })
        setBillsData(tempArray)
      }).catch(err => {
        console.error(err);
      })
    console.log(billsData);
  }, []);
  return (
    <CardContainer className='card'>
      <Bills>Upcoming Bills</Bills>
      <BillRow>
        <MonthWrapper>

          <Date>{}</Date>
        </MonthWrapper>
        <BillDetails>

          <BillInfo>
            <BillTitle></BillTitle>
            <LastCharge>Last Charge - Date</LastCharge>
          </BillInfo>
        </BillDetails>
        <Amount>ksh 0</Amount>
      </BillRow>
      <BillRow>
        <MonthWrapper>
          <Month></Month>
          <Date>{}</Date>
        </MonthWrapper>
        <BillDetails>


          <BillInfo>
            <BillTitle></BillTitle>
            <LastCharge>Charge</LastCharge>
          </BillInfo>
        </BillDetails>
        <Amount>Ksh 0 </Amount>
      </BillRow>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 352px;
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 97%;
`;
const Bills = styled.div`  color: var(--Secondary, #525256);
  text-align: right;
  text-transform: capitalize;
  align-self: start;
  font: 500 12px/120% Inter, sans-serif;
  padding-right: 10px;
`;

const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 27px;
`;

const MonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Month = styled.div`
  color: #666;
  font-weight: 300;
  font-size: 12px;
`;

const Date = styled.div`
  color: #191919;
  font-weight: 800;
  font-size: 18px;
`;

const BillDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BillIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
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
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  color: #525256;
  text-align: center;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 16px;
  align-self: flex-start;
`;

export default BillCard;
