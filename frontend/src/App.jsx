import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import NavBar from './NavBar';
import FormContainer from './FormContainer';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';
import { AuthProvider } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import Messages from './Messages';
import { MessagesProvider } from './MessageContext';

function App() {
  return (
    <MessagesProvider>
      <AuthProvider>
        <NavBar />
        <Messages />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/companies"
            element={
              <ProtectedRoute>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies/:name"
            element={
              <ProtectedRoute>
                <Company />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <FormContainer title={'Login'} FormComponent={LoginForm} />
            }
          />
          <Route
            path="/signup"
            element={
              <FormContainer title={'Signup'} FormComponent={SignupForm} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <FormContainer title={'Profile'} FormComponent={ProfileForm} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MessagesProvider>
  );
}

export default App;
