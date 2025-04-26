import { useParams } from 'react-router-dom';
const Company = ({ name, description, jobs }) => {
  return (
    <div>
      <h1>Company Name</h1>
      <h2>Description</h2>
      <div>List of company jobs</div>
    </div>
  );
};

export default Company;
