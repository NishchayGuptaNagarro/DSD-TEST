import {useNavigate} from 'react-router';
import {useEffect} from 'react';
import {ProtectedRouteProps} from './propTypes/types.ts';
import {isTokenValid} from 'utilities/isTokenValid.ts';

function ProtectedRoute({children}: ProtectedRouteProps) {
  const navigate = useNavigate();

  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!localStorage.getItem('user') || (user && !isTokenValid(user))) {
      localStorage.clear();
      navigate('/');
    }
  });
  if (user && isTokenValid(user)) {
    return <>{children}</>;
  } else {
    return null;
  }
}

export default ProtectedRoute;
