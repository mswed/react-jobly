const Job = ({ title, company, salary, equity }) => {
  return (
    <div>
      <h5>{title}</h5>

      <p>{company !== undefined ? company : ''}</p>
      <ul>
        <li>Salary: {salary}</li>
        <li>Equity: {equity}</li>
      </ul>
      <button>Apply</button>
    </div>
  );
};

export default Job;
