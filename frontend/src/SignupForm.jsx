import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
const SignupForm = () => {
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  // Get functions from AuthContext
  const { register } = useContext(AuthContext);

  // Manage the form inputs
  const [signupForm, setSignupForm] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setSignupForm((originalData) => ({ ...originalData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log('submitting form');
    await register(signupForm.username, signupForm.password, signupForm.firstName, signupForm.lastName, signupForm.email);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Username" name="username" onChange={handleChange} value={signupForm.username} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password" name="password" onChange={handleChange} value={signupForm.password} />
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
