import React, { useState } from "react";
import { Form, Button, Alert, Container, Row,Card, Col, InputGroup } from "react-bootstrap";
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../config/firebase"; // Adjust Firebase imports as per your setup
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { getErrorMessage } from "../../utils/errorMessages";
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';


const Profile: React.FC = () => {
  const currentUser = auth.currentUser;
  const [firstName, setFirstName] = useState(currentUser?.displayName?.split(" ")[0] ?? "");
  const [lastName, setLastName] = useState(currentUser?.displayName?.split(" ").slice(1).join(" ") ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState("");

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess("");

      // Re-authenticate user before changing email
      const credential = EmailAuthProvider.credential(currentUser!.email!, password);
      await reauthenticateWithCredential(currentUser!, credential);

      // Update email in Firebase Authentication
      await updateEmail(currentUser!, newEmail);

      // Send email verification to new email
      await sendEmailVerification(currentUser!);

      // Update email in Firestore (if necessary)
      // Example: await updateEmailInFirestore(currentUser!.uid, newEmail);

      // Display success message
      setSuccess("Email changed successfully. Please check your new email to verify.");
    } catch (error:any) {
      setError(getErrorMessage(getErrorMessage(error.code)));
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess("");

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      // Update password in Firebase Authentication
      await updatePassword(currentUser!, newPassword);

      // Display success message
      setSuccess("Password changed successfully.");
    } catch (error:any ){
      setError(getErrorMessage(error.code));
    }
  };

  const handleEditName = () => {
    setEditingName(!editingName);
  };

  const handleEditEmail = () => {
    setEditingEmail(!editingEmail);
  };

  const handlePhotoChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    // Implement photo change functionality as per your requirements
  };

  return (
    <div className="container-fluid">
        <Header />
        <div className="row">
        <div className="col-md-2 p-3">
          <Sidebar />
        </div>
        <div className="col-md-10">
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-12 mb-1">
     
      <Card>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h4>User Details</h4>
              <Form onSubmit={handleChangeEmail}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={!editingName}
                      required
                    />
                    {!editingName && (
                      <InputGroup.Text onClick={handleEditName} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
    
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={!editingName}
                      required
                    />
                    {!editingName && (
                      <InputGroup.Text onClick={handleEditName} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
    
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!editingEmail}
                      required
                    />
                    {!editingEmail && (
                      <InputGroup.Text onClick={handleEditEmail} style={{ cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                </Form.Group>
    
                {editingEmail && (
                  <>
                    <Form.Group controlId="formNewEmail">
                      <Form.Label>New Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
    
                    <Form.Group controlId="formPassword">
                      <Form.Label>Current Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </Button>
                      </InputGroup>
                    </Form.Group>
    
                    <Button variant="primary" type="submit">
                      Change Email
                    </Button>
                  </>
                )}
              </Form>
            </Col>
    
            <Col md={6} className="text-center">
              <h4>Profile Photo</h4>
              <div className="mb-3">
                <img
                  src={currentUser?.photoURL || "URL_TO_DEFAULT_PHOTO"}
                  alt="Profile"
                  className="rounded-circle"
                  width="150"
                  height="150"
                />
              </div>
              <Form.Group>
                <Form.Label>Change Profile Photo</Form.Label>
                <Form.Control type="file" onChange={handlePhotoChange} />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <h4>Password</h4>
              <Form onSubmit={handleChangePassword}>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </Button>
                  </InputGroup>
                </Form.Group>
    
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </Button>
                  </InputGroup>
                  {confirmPassword && (
                    <p className="mt-2" style={{ color: newPassword !== confirmPassword ? "red" : "green" }}>
                      {newPassword !== confirmPassword ? "Passwords do not match" : "Passwords match"}
                    </p>
                  )}
                </Form.Group>
    
                <Button variant="primary" type="submit">
                  Update Details
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {error && <Alert variant="danger" className="mt-4">{error}</Alert>}
      {success && <Alert variant="success" className="mt-4">{success}</Alert>}
      </div>
      </div>
      </div>
        </div>
        </div>
        </div>
  );
};

export default Profile;