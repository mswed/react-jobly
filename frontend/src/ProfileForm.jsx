import { Form, Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import JoblyApi from './api';
import { validateForm } from './utils/formValidation';
import { MessageContext } from './MessageContext';

const ProfileForm = () => {
  // Set up context
  const { token, currentUser } = useContext(AuthContext);
  const { showMessage } = useContext(MessageContext);

  const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
  };

  // Manage the form inputs
  const [profileForm, setProfileForm] = useState(INITIAL_STATE);

  const validations = {
    firstName: ['required'],
    lastName: ['required'],
    email: ['required', 'email'],
  };
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setProfileForm((originalData) => ({ ...originalData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const errors = validateForm(profileForm, validations);
    if (errors.length === 0) {
      await JoblyApi.updateUser(currentUser, profileForm.firstName, profileForm.lastName, profileForm.email);
      showMessage('Updated user profile!', 'success');
    } else {
      showMessage(errors, 'warning');
    }
  };

  useEffect(() => {
    if (currentUser && token && token.trim !== '') {
      // We only run if we have a token and a user
      async function getUser() {
        try {
          const res = await JoblyApi.getUser(currentUser);
          setProfileForm({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
          });
        } catch (error) {
          console.error('Error fetching user', error);
        }
      }
      getUser();
    }
  }, [token, currentUser]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Username" name="username" value={currentUser} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="first-name">
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder="First Name" name="firstName" onChange={handleChange} value={profileForm.firstName} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="last-name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control placeholder="Last Name" name="lastName" onChange={handleChange} value={profileForm.lastName} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Email" name="email" onChange={handleChange} value={profileForm.email} />
      </Form.Group>
      <Button type="submit" className="w-100">
        Save Changes
      </Button>
    </Form>
  );
};

export default ProfileForm;
