import { Card, Row, Button } from 'react-bootstrap';
const Job = ({ title, company, salary, equity }) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {company && <Card.Text>{company}</Card.Text>}
          <ul>
            <li>Salary: {salary}</li>
            <li>Equity: {equity}</li>
          </ul>
          <div className="d-flex justify-content-end">
            <Button variant="warning">Apply</Button>
          </div>
        </Card.Body>
      </Row>
    </Card>
  );
};

export default Job;
