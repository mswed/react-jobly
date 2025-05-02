import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: '',
    password: '',
  };

  // Get functions from AuthContext
  const { login } = useContext(AuthContext);

  // Manage the form inputs
  const [loginForm, setLoginForm] = useState(INITIAL_STATE);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginForm((originalData) => ({ ...originalData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const success = await login(loginForm.username, loginForm.password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Username" name="username" onChange={handleChange} value={loginForm.username} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password" name="password" onChange={handleChange} value={loginForm.password} />
      </Form.Group>
      <Button type="submit" className="w-100">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
