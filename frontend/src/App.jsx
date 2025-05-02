import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import NavBar from './NavBar';
import LoginForm from './LoginForm';
import FormContainer from './FormContainer';
import SignupForm from './SignupForm';
import Profile from './Profile';
import { AuthProvider } from './AuthProvider';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:name" element={<Company />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<FormContainer title={'Login'} FormComponent={LoginForm} />} />
        <Route path="/signup" element={<FormContainer title={'Signup'} FormComponent={SignupForm} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
