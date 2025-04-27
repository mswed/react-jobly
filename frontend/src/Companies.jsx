import { useState, useEffect } from 'react';
import JoblyApi from './api';

const Companies = () => {
  console.log(JoblyApi.getCompanies());
  return (
    <div>
      <div>Search</div>
      <div>List of Companies</div>
    </div>
  );
};

export default Companies;
