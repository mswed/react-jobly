import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import SearchForm from './SearchForm';
import Loading from './Loading';
import JoblyApi from './api';
import { AuthContext } from './AuthProvider';

const Jobs = () => {
  const [jobs, setJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await JoblyApi.getJobs(searchTerm);
        const userData = await JoblyApi.getUser(currentUser);
        console.log(userData);
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
    return <Loading />;
  }
  return (
    <Container>
      <SearchForm search={setSearchTerm} />
      <div>{jobs && jobs.map((job) => <Job title={job.title} company={job.companyName} salary={job.salary} equity={job.equity} jobId={job.id} key={job.id} />)}</div>
    </Container>
  );
};

export default Jobs;
