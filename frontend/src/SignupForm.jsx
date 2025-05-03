import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { validateForm } from './utils/formValidation';
import { MessageContext } from './MessageContext';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  const validations = {
    username: ['required'],
    password: ['required'],
    firstName: ['required'],
    lastName: ['required'],
    email: ['required', 'email'],
  };
  // Get functions from AuthContext
  const { register } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const navigate = useNavigate();
  // Manage the form inputs
  const [signupForm, setSignupForm] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setSignupForm((originalData) => ({ ...originalData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const errors = validateForm(signupForm, validations);
    if (errors.length === 0) {
      await register(signupForm.username, signupForm.password, signupForm.firstName, signupForm.lastName, signupForm.email);
      navigate('/');
      showMessage('You are now registered! Please login!', 'success');
    } else {
      showMessage(errors, 'warning');
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Username" name="username" onChange={handleChange} value={signupForm.username} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={signupForm.password} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="first-name">
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder="First Name" name="firstName" onChange={handleChange} value={signupForm.firstName} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="last-name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control placeholder="Last Name" name="lastName" onChange={handleChange} value={signupForm.lastName} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Email" name="email" onChange={handleChange} value={signupForm.email} />
      </Form.Group>
      <Button type="submit" className="w-100">
        Signup
      </Button>
    </Form>
  );
};

export default SignupForm;
