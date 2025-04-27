import { useState } from 'react';

const SearchForm = ({ search }) => {
  const INITIAL_STATE = '';
  const [searchField, setSearchField] = useState(INITIAL_STATE);
  const handleChange = (evt) => {
    setSearchField(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    search(searchField);
    setSearchField(INITIAL_STATE);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" placeholder="Enter search term..." onChange={handleChange} value={searchField} />
      <button type="submit">Search!</button>
    </form>
  );
};

export default SearchForm;
