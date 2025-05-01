import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import JoblyApi from './api';
import { useState, useEffect } from 'react';
import Job from './Job';

const Company = () => {
  const { name } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      try {
        const res = await JoblyApi.getCompany(name);
        setCompanyData(res);
      } catch (error) {
        console.error('Error fetching company', error);
      } finally {
        setIsLoading(false);
      }
    }
    getCompany();
  }, [name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <h2 className="text-shadow">{companyData.name}</h2>
      <h3 className="text-shadow">{companyData.description}</h3>
      {companyData.jobs && companyData.jobs.map((job) => <Job title={job.title} salary={job.salary} equity={job.equity} key={job.id} />)}
    </Container>
  );
};

export default Company;
