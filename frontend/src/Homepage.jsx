import { Container } from 'react-bootstrap';
const Homepage = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center" style={{ marginTop: '-5rem' }}>
      <h1 className="text-shadow">Jobly</h1>
      <h2 className="text-shadow">All the jobs in one, convenient place.</h2>
    </Container>
  );
};

export default Homepage;
