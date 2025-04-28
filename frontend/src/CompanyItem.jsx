import { Card, Row, Col } from 'react-bootstrap';
const CompanyItem = ({ name, description, logo }) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col md={8}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Col>
        <Col md={4}>
          <Card.Img src={logo} alt={`Logo for ${name}`} />
        </Col>
      </Row>
    </Card>
  );
};

export default CompanyItem;
