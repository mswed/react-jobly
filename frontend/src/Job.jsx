import { Card, Row, Button } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import JoblyApi from './api';
import { AuthContext } from './AuthProvider';

const Job = ({ title, company, salary, equity, jobId }) => {
  const { applyToJob, alreadyApplied } = useContext(AuthContext);
  const [applied, setApplied] = useState(alreadyApplied(jobId));
  const handleApply = () => {
    if (applied) return;
    applyToJob(jobId);
    setApplied(true);
  };

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
            <Button variant={applied ? 'primary' : 'warning'} onClick={handleApply}>
              Apply
            </Button>
          </div>
        </Card.Body>
      </Row>
    </Card>
  );
};

export default Job;
