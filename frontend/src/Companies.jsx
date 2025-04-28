import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CompanyItem from './CompanyItem.jsx';
import SearchForm from './SearchForm.jsx';
import JoblyApi from './api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      try {
        const res = await JoblyApi.getCompanies(searchTerm);
        setCompanies(res.companies);
      } catch (error) {
        console.error('Error fetching companies', error);
      } finally {
        setIsLoading(false);
      }
    }
    getCompanies();
  }, [searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <SearchForm search={setSearchTerm} />
      <div>
        {companies &&
          companies.map((company) => (
            <Link to={`/companies/${company.handle}`}>
              <CompanyItem name={company.name} description={company.description} logo={company.logoUrl} key={company.handle} />
            </Link>
          ))}
      </div>
    </Container>
  );
};

export default Companies;
