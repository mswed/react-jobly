import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ToastContainer, Toast } from 'react-bootstrap';
const Homepage = () => {
  // Set up a Flask Flash like system using bootstrap
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // Grab the url info, if we were unauthorized there will be a warning
  // on the location's state prop
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showWarning) {
      // We got a warning!
      setToastMessage(location.state.warningMessage);
      setShowToast(true);

      // Remove the state from the location
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center" style={{ marginTop: '-5rem' }}>
      <h1 className="text-shadow">Jobly</h1>
      <h2 className="text-shadow">
        All the jobs in on
        <ToastContainer position="top-center" className="p-3">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide bg="warning">
            <Toast.Header>
              <strong className="me-auto">Authentication Required</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
        e, convenient place.
      </h2>
    </Container>
  );
};

export default Homepage;
