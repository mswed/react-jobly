import { Card, Row, Button } from 'react-bootstrap';
const Job = ({ title, company, salary, equity }) => {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <p>{company !== undefined ? company : ''}</p>
            <div>
              <ul>
                <li>Salary: {salary}</li>
                <li>Equity: {equity}</li>
              </ul>
            </div>
          </Card.Text>
          <div className="d-flex justify-content-end">
            <Button variant="warning">Apply</Button>
          </div>
        </Card.Body>
      </Row>
    </Card>
  );
};

export default Job;
