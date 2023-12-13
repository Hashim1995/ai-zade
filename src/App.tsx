import { useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import routesList from '@core/routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from './core/static-components/suspense-loader';
import { fetchUserData } from './redux/auth/auth-slice';
import { AppDispatch, RootState } from './redux/store';
import statisticsSocket from './utils/functions/socket-config';
import { setStatisticsCount } from './redux/statistics/statistics-slice';
import { StatisticsUpdateData } from './models/common';

function App() {
  const router = useRoutes(routesList);
  const dispatch = useDispatch<AppDispatch>();

  // const { isDarkMode } = useDarkMode();

  const userToken: any = JSON.parse(localStorage.getItem('userToken') || '{}');
  const getme = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken?.token) {
      navigate('/login');
    } else {
      dispatch(fetchUserData());
    }
  }, []);

  useEffect(() => {
    if (userToken?.token) {
      if (statisticsSocket.state === 'Disconnected') {
        statisticsSocket
          .start()
          .then(() => {
            statisticsSocket.on(
              'StatisticsUpdate',
              (z: StatisticsUpdateData) => {
                dispatch(setStatisticsCount(z));
              }
            );
          })
          .catch(error => console.error('SignalR connection failed:', error));
      }
    }

    return () => {
      statisticsSocket.stop();
    };
  }, [dispatch]);

  return (
    <main
      className={`${
        ' bg-foreground-200'
        // isDarkMode
        //   ? 'dark h-screen text-foreground bg-background'
        //   : 'h-screen text-foreground bg-background'
      }`}
    >
      {getme.status !== 'succeeded' ? (
        <SuspenseLoader />
      ) : (
        <Suspense fallback={<SuspenseLoader />}>{router}</Suspense>
      )}
    </main>
  );
}

export default App;
