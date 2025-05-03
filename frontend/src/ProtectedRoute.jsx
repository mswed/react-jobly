import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Wraps other components to test if the user is allowed to access them
 *
 * @param {Array} children - components to protect
 * @returns {Element}
 */

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  // Get the page being accessed url
  const location = useLocation();

  // User is not logged in, kick them to the hompage
  if (!token) {
    return (
      <Navigate
        to="/"
        state={{
          showWarning: true,
          warningMessage: `You must be logged in to view ${location} that page`,
        }}
        replace
      />
    );
  }
  return children;
};

export default ProtectedRoute;
