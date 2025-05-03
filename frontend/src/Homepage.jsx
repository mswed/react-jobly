import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ToastContainer, Toast } from 'react-bootstrap';
const Homepage = () => {
  // Set up a Flask Flash like system using bootstrap
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('warning');
  const [toastMessage, setToastMessage] = useState('');
  // Grab the url info, if we were unauthorized there will be a warning
  // on the location's state prop
  const location = useLocation();

  useEffect(() => {
    // Unauthorized warning
    if (location.state?.showWarning) {
      // We got a warning!
      setToastMessage(location.state.warningMessage);
      setToastVariant('warning');
      setShowToast(true);

      // Remove the state from the location
      window.history.replaceState({}, document.title);
    }

    // Successful logout
    if (location.state?.logoutSuccess) {
      // We got a warning!
      setToastMessage(location.state.message);
      setToastVariant('success');
      setShowToast(true);

      // Remove the state from the location
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center" style={{ marginTop: '-5rem' }}>
      <h1 className="text-shadow">Jobly</h1>
      <h2 className="text-shadow">All the jobs in on e, convenient place.</h2>
      <ToastContainer position="top-center" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide bg={toastVariant}>
          <Toast.Header>
            <strong className="me-auto">{toastVariant === 'warning' ? 'Authentication Required' : 'success'}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Homepage;
