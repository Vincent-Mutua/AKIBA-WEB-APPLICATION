import * as React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import AllBills from '../../components/Bill/AllBills';
import Footer from '../../components/Footer/Footer';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { auth, storage, db } from '../../config/firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';


const AllBills1: React.FC = () => {
  const [addAmmount, setAddAmmount] = React.useState<number>(0);
  const [addDescription, setAddDescription] = React.useState<string>('');
  const [dueDate, setDueDate] = React.useState<any>(new Date());

  const [billsData, setBillsData] = React.useState([]);
  React.useEffect(()=>{
    let tempArray = [];
    let bills_collection = collection(db,'Bills',auth.currentUser.uid,'Bill');
    getDocs(bills_collection)
      .then((snapshot)=>{
        snapshot.forEach((document)=>{
          tempArray.push({date:document.id, description: document.data().description, amount: document.data().amount});
        })
        setBillsData(tempArray)
      }).catch(err=>{
        console.error(err);
      })
    
  },[]);

  const addBill = async (): Promise<void> => {
    let date = dueDate.toUTCString()
    alert(date);
    const bill_ref = doc(db, 'Bills', auth.currentUser.uid, 'Bill', date);
    setDoc(bill_ref, { description: addDescription, amount: addAmmount })
      .then(() => {

      }).catch(err => console.error(err));
  }

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
              <Container>
              <Table>
                  <thead>
                    <TableRow>
                      <TableHeader>Due Date</TableHeader>
                      <TableHeader>Description</TableHeader>
                      <TableHeader>Amount</TableHeader>
                    </TableRow>
                  </thead>
                  <tbody>
                    {billsData.map((bill,index)=>(
                      <TableRow key={index}>
                        <TableCell>{bill.date}</TableCell>
                        <TableCell>{bill.description}</TableCell>
                        <TableCell>{bill.amount}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              </Container>
              <div className="col-md-12 mb-1">
                <Form>
                  <Form.Group className="mb-3" >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Amount"
                      value={addAmmount}
                      onChange={(text) => setAddAmmount(text.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Description"
                      value={addDescription}
                      onChange={(text) => setAddDescription(text.target.value)} />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label> Due Date </Form.Label>
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
                  </Form.Group>
                  <Button variant="primary" onClick={() => addBill()}>
                    Submit
                  </Button>
                </Form>
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

const Tabs = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Tab = styled.div`
  padding: 10px 10px;
  font-size: 14px;
  font-weight: bold;
  color: #525252;
  cursor: pointer;

  &.active {
    color: #14b8a6;
    border-bottom: 2px solid #14b8a6;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;


const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;

const TableCell = styled.td`
  padding: 5px;
  text-align: left;
  font-size: 14px;
  color: #27272a;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
`;


export default AllBills1;
