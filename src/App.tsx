/* eslint-disable no-unused-vars */
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import routesList from '@core/routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';
import useDarkMode from 'use-dark-mode';
import { useMediaQuery } from 'usehooks-ts';
import { FcPrivacy } from 'react-icons/fc';
import SuspenseLoader from './core/static-components/suspense-loader';
import { fetchUserData } from './redux/auth/auth-slice';
import { AppDispatch, RootState } from './redux/store';
import { setStatisticsCount } from './redux/statistics/statistics-slice';
import { StatisticsUpdateData } from './models/common';
import generateStatisticsSocket from './utils/functions/socket-config';
import VerifyEmail from './core/static-components/verify-email';

/**
 * The main component of the application. It renders the routes and handles user authentication and verification.
 * @returns The main component of the application.
 */

function App() {
  const router = useRoutes(routesList);
  const dispatch = useDispatch<AppDispatch>();
  const notDesktop = useMediaQuery('(max-width: 1024px)');

  const userToken: any = JSON.parse(localStorage.getItem('userToken') || '{}');
  const getme = useSelector((state: RootState) => state.user);
  const { verified } = useSelector((state: RootState) => state?.user?.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: deviceWarningModalIsOpen,
    onOpen: deviceWarningModalOnOpen,
    onOpenChange: deviceWarningModalOnOpenChange
  } = useDisclosure();

  const navigate = useNavigate();
  const location = useLocation();

  /*
    This useEffect is responsible for handling user authentication and navigation.
    If the user token is not available, it navigates to the login page.
    Otherwise, it dispatches the fetchUserData action to retrieve user data.
  */
  useEffect(() => {
    // @ts-ignore
    const mode = import.meta.env.VITE_APP_MODE; // 'development' or 'production'
    document.title = mode === 'development' ? '(Dev) ABLARVA' : 'ABLARVA';

    if (!userToken?.token) {
      console.log(location?.pathname);
      if (location?.pathname !== '/terms-conditions') {
        navigate('/login');
      }
    } else {
      dispatch(fetchUserData());
    }
  }, []);

  useEffect(() => {
    // Open the modal if the screen is small and it's not already opened
    if (notDesktop) {
      deviceWarningModalOnOpen();
    }
  }, [notDesktop]);

  /*
    This useEffect is responsible for handling the statistics socket connection and updating the statistics count.
    It only runs when the screen size is not responsive. This is to prevent multiple socket connections on mobile devices.
    If the user token and current subscription are available, it creates a statistics socket and starts the connection.
    When a 'StatisticsUpdate' event is received, it dispatches the setStatisticsCount action to update the statistics count in the Redux store.
    If the socket connection fails, an error is logged to the console.
    When the component is unmounted, the socket connection is stopped. 
  */

  // useEffect(() => {
  //   if (userToken?.token && getme.user.currentSubscription) {
  //     const statisticsSocket = generateStatisticsSocket(
  //       JSON.parse(localStorage.getItem('userToken') || '{}').token
  //     );

  //     if (statisticsSocket.state === 'Disconnected') {
  //       statisticsSocket
  //         .start()
  //         .then(() => {
  //           statisticsSocket.on(
  //             'StatisticsUpdate',
  //             (z: StatisticsUpdateData) => {
  //               dispatch(setStatisticsCount(z));
  //             }
  //           );
  //         })
  //         .catch(error => console.error('SignalR connection failed:', error));
  //     }
  //   }
  //   return () => {
  //     generateStatisticsSocket(userToken?.token).stop();
  //   };
  // }, [getme]);

  /*
    This useEffect is responsible for checking if the user's email is verified.
    If the email is not verified and the user ID is available, it opens the email verification modal.
    It listens for changes in the 'verified' and 'getme' variables.
  */
  useEffect(() => {
    if (!verified && getme?.user?.id) {
      onOpen();
    }
  }, [verified, getme]);

  const darkMode = useDarkMode(false);

  return (
    <main
      className={`${
        darkMode.value ? 'dark gradient-bg' : 'bg-gray-50'
      } text-default-800  dark:text-white `}
    >
      <Suspense fallback={<SuspenseLoader />}>
        {router}
        {isOpen && <VerifyEmail onOpenChange={onOpenChange} isOpen={isOpen} />}
      </Suspense>
      {notDesktop && (
        <Modal
          hideCloseButton
          size="full"
          isDismissable={false}
          className="centerModalOnMobile"
          shouldBlockScroll
          isKeyboardDismissDisabled
          defaultOpen={notDesktop}
        >
          <ModalContent>
            <ModalBody className="py-10 dark:text-white">
              <div className="flex flex-col items-center gap-5">
                <FcPrivacy size={100} />

                <p className="text-gray-600 dark:text-gray-300">
                  The screen size is smaller than recommended. Please use a
                  device with a larger screen for a better experience.
                </p>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </main>
  );
}

export default App;
