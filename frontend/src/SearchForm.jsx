import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
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
    <Form onSubmit={handleSubmit}>
      <InputGroup className="m-3">
        <Form.Control placeholder="Enter search term..." onChange={handleChange} value={searchField} />
        <Button variant="primary" type="submit">
          Search!
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;
