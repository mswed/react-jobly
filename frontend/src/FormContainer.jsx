import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const FormContainer = ({ title, FormComponent }) => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8} lg={6}>
          <h3 className="text-shadow">{title}</h3>
          <Card className="shadow-lg  p-3">
            <FormComponent />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
