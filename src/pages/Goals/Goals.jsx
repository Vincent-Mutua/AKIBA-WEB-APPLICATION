import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import { auth, storage, db } from '../../config/firebase';
import { doc, setDoc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import Speedometer from 'react-d3-speedometer';
import './goal-styles.css';

export default function Goals() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [remoteAmount, setRemoteAmount] = useState(0);
  const [target, setTarget] = useState(1);
  const [progress, setProgress] = useState(1);
  const [savingsData, setSavingsData] = useState([]);

  const readFromFirebase = async () => {
    setLoading(true);
    let docRef = doc(db, 'Goals', auth.currentUser.uid);
    getDoc(docRef).then(data => {
      setRemoteAmount(parseInt(data.data().amount) || 0);
      setTarget(parseInt(data.data().target) || 0);
      setProgress(parseInt(data.data().amount) / parseInt(data.data().target) * 100);
      setLoading(false);
    });
  };

  const readSavingsData = async () => {
    setLoading(true);
    let savingsRef = collection(db, 'Goals', auth.currentUser.uid, 'Savings');
    getDocs(savingsRef).then(snapshot => {
      let tempArray = [];
      snapshot.forEach(document => {
        let docDate = new Date(document.id);
        let savingsKey = document.id.slice(0, 16);
        tempArray.push({ date: savingsKey, amount: document.data().amount });
      });
      setLoading(false);
      setSavingsData(tempArray);
    });
  };

  useEffect(() => {
    readFromFirebase();
    readSavingsData();
  }, []);

  const addTarget = async () => {
    readFromFirebase();
    let docRef = doc(db, 'Goals', auth.currentUser.uid);
    setDoc(docRef, { target: target }, { merge: true });
  };

  const addAmount = async () => {
    setLoading(true);
    let date = new Date().toUTCString();
    let docRef = doc(db, 'Goals', auth.currentUser.uid);
    let amountRef = doc(db, 'Goals', auth.currentUser.uid, 'Savings', date);
    let finalAmount = parseInt(remoteAmount) + parseInt(amount);
    setDoc(docRef, { amount: finalAmount, date }, { merge: true }).then(async () => {
      setDoc(amountRef, { amount: parseInt(amount) }).then(async () => {
        await readFromFirebase();
        await readSavingsData();
        setLoading(false);
      });
    });
  };

  const handleUpdate = async () => {
    await addTarget();
    await addAmount();
  };

  const handleReset = async () => {
    setLoading(true);
    let deleteRef = doc(db, 'Goals', auth.currentUser.uid);
    deleteDoc(deleteRef).then(() => {
      setAmount(0);
      setTarget(0);
      setSavingsData([]);
      setLoading(false);
    });
  };

  return (
    <Container fluid>
      <Header />
      <Row>
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={10}>
          <Container fluid>
            <Row>
              <Col md={12} className="mb-1">
                <div className="col-md-20">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div className="goals-div">
                      <div className="goal-form">
                        <Form>
                          <Form.Group>
                            <Form.Label>Target Amount</Form.Label>
                            <Form.Control
                              type="number"
                              value={target}
                              onChange={(e) => setTarget(Number(e.target.value))}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Amount to Save</Form.Label>
                            <Form.Control
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(Number(e.target.value))}
                            />
                          </Form.Group>
                        </Form>
                        <div className="buttons-div">
                          <Button variant="primary" onClick={handleUpdate}>
                            Update
                          </Button>
                          <Button variant="secondary" onClick={handleReset}>
                            Reset
                          </Button>
                        </div>
                      </div>
                      <div className="goal-rate">
                        <div className="info-section">
                          <p>Target: {target}</p>
                          <p>Amount Saved: {remoteAmount}</p>
                        </div>
                        <div className="speedometer">
                          <Speedometer
                            minValue={0}
                            maxValue={target || 100000}
                            value={remoteAmount}
                            segments={1}
                            needleColor="rgb(91, 92, 92)"
                            startColor="rgb(7, 148, 148)"
                            endColor="rgb(20, 82, 82)"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-12 p-0">
                  {savingsData && (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={savingsData}>
                        <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="2">
                            <stop offset="5%" stopColor="#0d6e6e" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0d6e6e" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 'auto']} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="#0d6e6e" fill="url(#colorAmount)" />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}
