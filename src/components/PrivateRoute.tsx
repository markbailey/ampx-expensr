import { useCallback, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';

type PrivateRouteProps = {
  user: UserState | null;
  isAuthenticating: boolean;
};

function PrivateRoute(Props: PrivateRouteProps) {
  const { user, isAuthenticating } = Props;
  const location = useLocation();
  const navigate = useNavigate();

  const render = useCallback(() => {
    if (isAuthenticating) return <Loading message="Authenticating" />;
    return <Outlet />;
  }, [isAuthenticating]);

  useEffect(() => {
    if (!isAuthenticating && !user) navigate(`/sign-in?r=${encodeURI(location.pathname)}`);
  }, [user, isAuthenticating, location, navigate]);

  return render();
}

export default PrivateRoute;
