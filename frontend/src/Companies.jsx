import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CompanyItem from './CompanyItem.jsx';
import SearchForm from './SearchForm.jsx';
import JoblyApi from './api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getCompanies() {
      const res = await JoblyApi.getCompanies(searchTerm);
      setCompanies(res.companies);
      console.log(companies);
    }
    getCompanies();
  }, [searchTerm]);
  return (
    <div>
      <SearchForm search={setSearchTerm} />
      <div>
        {companies.map((company) => (
          <Link to={`/companies/${company.handle}`}>
            <CompanyItem name={company.name} description={company.description} logo={company.logoUrl} key={company.handle} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Companies;
