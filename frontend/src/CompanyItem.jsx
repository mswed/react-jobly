const CompanyItem = ({ name, description, logo }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>{description}</p>
      <img src={logo} alt={`Logo for ${name}`} />
    </div>
  );
};

export default CompanyItem;
