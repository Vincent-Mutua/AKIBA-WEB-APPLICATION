import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Button, Form } from 'react-bootstrap';
import Speedometer from 'react-d3-speedometer';
import { auth, storage, db } from '../../config/firebase';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import GaugeChart from 'react-gauge-chart'

const Goals: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [targetAmount, setTargetAmount] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);
  const [remoteAmount, setRemoteAmount] = useState(0);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSave = () => {
    addTarget();
    addAmount();
    handleCloseModal();
  };

  const readFromFirebase = async () => {
    const docRef = doc(db, 'Goals', auth.currentUser?.uid);
    const data = await getDoc(docRef);
    if (data.exists()) {
      setSavedAmount(parseInt(data.data().amount, 10));
      setTargetAmount(parseInt(data.data().target, 10));
      setRemoteAmount(parseInt(data.data().amount, 10));
    }
  }

  const readSavingsData = async () => {
    const savingsRef = collection(db, 'Goals', auth.currentUser?.uid, 'Savings');
    const snapshot = await getDocs(savingsRef);
    const tempArray = [];
    snapshot.forEach(document => {
      const savingsKey = document.id.slice(0, 16);
      tempArray.push({ date: savingsKey, amount: document.data().amount });
    });
    console.log(tempArray);
  }

  const addTarget = async () => {
    await readFromFirebase();
    const docRef = doc(db, 'Goals', auth.currentUser?.uid);
    await setDoc(docRef, { target: targetAmount }, { merge: true });
  }

  const addAmount = async () => {
    const date = new Date().toUTCString();
    const docRef = doc(db, 'Goals', auth.currentUser?.uid);
    const amountRef = doc(db, 'Goals', auth.currentUser?.uid, 'Savings', date);
    const finalAmount = remoteAmount + savedAmount;
    await setDoc(docRef, { amount: finalAmount, date }, { merge: true });
    await setDoc(amountRef, { amount: savedAmount });
  }

  useEffect(() => {
    readFromFirebase();
    readSavingsData();
  }, []);

  return (
    <StyledCard className='card'>
      <TopSection>
        <TopLeft>
          <GoalAmount>{`Ksh ${targetAmount}`}</GoalAmount>
          <IconContainer>
            <Icon
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5e72175061bdd0ba49d7d156825eb3c5ca91f747545ab5a96fd2a8f99047cf8?"
              loading="lazy"
              onClick={handleOpenModal}
            />
          </IconContainer>
        </TopLeft>
        <Month>Goals</Month>
      </TopSection>
      <BottomSection>
        <SpeedometerWrapper>
        <Speedometer
            width={200}
            minValue={0}
            maxValue={targetAmount || 100000}
            value={savedAmount}
            segments={5}
            needleColor="red"
            startColor="green"
            endColor="blue"
          />
        </SpeedometerWrapper>
      </BottomSection>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Set Target</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Target Amount</Form.Label>
              <Form.Control
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount to Save</Form.Label>
              <Form.Control
                type="number"
                value={savedAmount}
                onChange={(e) => setSavedAmount(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 8px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background-color: var(--White, #fff);
  display: flex;
  max-width: 352px;
  flex-direction: column;
  padding: 16px;
  border: 1px solid rgba(243, 243, 243, 1);
  height: 97%;
`;

const TopSection = styled.div`
  padding-bottom: 5px;
  justify-content: space-between;
  align-items: start;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  gap: 10px;
`;

const TopLeft = styled.div`
  display: flex;
  gap: 6px;
`;

const GoalAmount = styled.div`
  color: var(--Default-Black, #191919);
  font: 600 16px/145% Inter, sans-serif;
`;

const IconContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: var(--Special-BG, rgba(210, 210, 210, 0.25));
  display: flex;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: cover;
  width: 100%;
`;

const Month = styled.div`
  color: var(--Secondary, #525256);
  text-align: right;
  text-transform: capitalize;
  align-self: start;
  font: 500 12px/120% Inter, sans-serif;
`;

const BottomSection = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  padding: 8px 0;
`;

const SpeedometerWrapper = styled.div`
 .gauge-percent {
    fill: #118fa8; /* Change this to your desired color */
  }
  width: 200px;
  height: 120px;
   margin: 0 auto;
   margin-top: auto;
 text-color: #118fa8;
 
`;

export default Goals;
