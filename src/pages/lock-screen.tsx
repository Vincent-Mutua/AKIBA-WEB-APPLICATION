import React, { useState, FormEvent, useEffect } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUnlock = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, auth.currentUser?.email || '', password);
      setError(null);
      onUnlock();
      setPassword('');
    } catch (err: any) {
      console.error(err); // Log the actual error for debugging purposes
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Locked</h2>
      <Form onSubmit={handleUnlock}>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Enter Password to Unlock</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Unlock
        </Button>
      </Form>
    </Container>
  );
};

export default LockScreen;
