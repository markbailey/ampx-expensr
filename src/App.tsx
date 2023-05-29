import { useEffect, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { RootState, onAuthChanged } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Loading from './components/Loading';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const SignIn = lazy(() => import('./pages/SignIn'));

function App() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticating } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const unsubcribe = onAuthChanged(dispatch);
    return () => unsubcribe();
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<PrivateRoute user={user} isAuthenticating={isAuthenticating} />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound item="Page" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
