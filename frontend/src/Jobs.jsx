import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import SearchForm from './SearchForm';
import JoblyApi from './api';

const Jobs = () => {
  const [jobs, setJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await JoblyApi.getJobs(searchTerm);
        setJobs(res.jobs);
      } catch (error) {
        console.error('Error fetching jobs', error);
      } finally {
        setIsLoading(false);
      }
    }
    getJobs();
  }, [searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <SearchForm search={setSearchTerm} />
      <div>{jobs && jobs.map((job) => <Job title={job.title} company={job.companyName} salary={job.salary} equity={job.equity} key={job.id} />)}</div>
    </Container>
  );
};

export default Jobs;
