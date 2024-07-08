import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';

import { auth, storage, db } from '../../config/firebase';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';

import { BarChart, XAxis, YAxis, Legend, Tooltip, Bar, CartesianGrid, LineChart, Line } from 'recharts';
import { CardGroup, Card } from 'react-bootstrap';

export default function Goals() {

  const [ammount, setAmmount] = useState(0);
  const [remoteAmmount, setRemoteAmmount] = useState(0);
  const [target, setTarget] = useState(1);
  const [Progress, setProgress] = useState(1);
  const [savingsData, setSavingsData] = useState([]);


  const readFromFirebase = async () => {
    let docref = doc(db, 'Goals', auth.currentUser.uid);
    let data = await getDoc(docref);
    setRemoteAmmount(parseInt(data.data().ammount));
    console.log(remoteAmmount)
    setTarget(parseInt(data.data().target));
    setProgress(parseInt(data.data().ammount) / parseInt(data.data().target) * 100);

  }

  const readSavingsData = async () => {
    let savings_ref = collection(db, 'Goals', auth.currentUser.uid, 'Savings');
    getDocs(savings_ref)
      .then((snapshot) => {
        let TempArray = [];
        snapshot.forEach(document => {
          let doc_date = new Date(document.id);
          let savings_key = document.id.slice(0, 16);
          TempArray.push({ date: savings_key, ammount: document.data().ammount });
        });
        console.log(TempArray);
        setSavingsData(TempArray);
      })
  }

  useEffect(() => {
    readFromFirebase();
    readSavingsData();
  }, []);


  const addTarget = async () => {
    readFromFirebase();
    let docref = doc(db, 'Goals', auth.currentUser.uid);
    setDoc(docref, { target }, { merge: true });
  }

  const AddAmmount = async () => {
    let date = new Date().toUTCString();
    let docref = doc(db, 'Goals', auth.currentUser.uid);
    let ammount_ref = doc(db, 'Goals', auth.currentUser.uid, 'Savings', date);
    let finalAmmount = parseInt(remoteAmmount) + parseInt(ammount);
    console.log(finalAmmount);
    setDoc(docref, { ammount: finalAmmount, date }, { merge: true });
    setDoc(ammount_ref, { ammount: parseInt(ammount) });
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
              <div className="col-md-12 mb-1">
                <div className='col-md-20'>
                  <CardGroup style={{ height: '250px' }}>
                    <Card style={{ justifyItems: 'self-start' }}>
                      <Card.Title>
                        Add Amount
                      </Card.Title>
                      <Card.Body>
                        <Form.Group>
                          <Form.Label> Enter Ammount </Form.Label>
                          <Form.Control type='number' placeholder='Add Ammount ?' value={ammount} onChange={(text) => setAmmount(text.target.value)} />
                          <Form.Text className="text-muted">
                            Target is {target}
                          </Form.Text>
                        </Form.Group>
                        <Form.Text className="text-muted">
                          You've Collected {remoteAmmount}
                        </Form.Text>
                      </Card.Body>
                      <Button variant="primary" onClick={() => AddAmmount()}>
                        Add
                      </Button>
                    </Card>
                    <Card>
                      <Card.Title> Set New Target  </Card.Title>
                      <Card.Body>
                        <Form.Group>
                          <Form.Label> Target </Form.Label>
                          <Form.Control type='number' placeholder='New Target ? ' value={target} onChange={(text) => setTarget(text.target.value)} />
                        </Form.Group>
                        <Form.Group>
                        </Form.Group>

                      </Card.Body>
                      <Button onClick={() => { addTarget() }}>
                        Set New Target
                      </Button>
                    </Card>
                  </CardGroup>
                  <div className="progress mt-3">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${Progress}%`, }}
                      aria-valuenow={Progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {Progress}%
                    </div>
                  </div>
                </div>
                <div className="col-md-2 p-0">
                  {savingsData &&
                    <LineChart width={1200} height={400} data={savingsData}>
                      <Line type="monotone" dataKey="ammount" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="date" />
                      <YAxis />
                    </LineChart>}
                </div>
              </div>

            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
