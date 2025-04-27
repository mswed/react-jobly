import { useParams } from 'react-router-dom';
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
    <div>
      <h1>{companyData.name}</h1>
      <h2>{companyData.description}</h2>
      {companyData.jobs && companyData.jobs.map((job) => <Job title={job.title} salary={job.salary} equity={job.equity} key={job.id} />)}
    </div>
  );
};

export default Company;
