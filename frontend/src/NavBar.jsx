import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to={'/'}>Home</Link>
      <Link to={'/companies'}>companies</Link>
      <Link to={'/jobs'}>Jobs</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/signup'}>Signup</Link>
      <Link to={'/profile'}>Profile</Link>
    </nav>
  );
};

export default NavBar;
