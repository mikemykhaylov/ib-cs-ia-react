import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Switch, Route, useRouteMatch, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '../components/General/Navbar';
import Footer from '../components/General/Footer';

import SelectWay from '../components/Reservation/SelectWay';
import SelectTime from '../components/Reservation/SelectTime';
import SelectBarber from '../components/Reservation/SelectBarber';
import GetDetails from '../components/Reservation/GetDetails';
import Success from '../components/Reservation/Success';

const pageVariants = {
  initial: { x: 500, opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: -500, opacity: 0 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};

const ReservationContainer = styled.section`
  position: relative;
`;

const MotionContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin-top: calc(100vh * 96 / 1080);
  padding: 0 calc(100vw * 196 / 1920);
  margin-bottom: 100px;
  min-height: calc(100vh - 45px - 100vh * 96 / 1080);
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  & > * {
    text-align: center;
  }
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
`;

function Reservation() {
  const location = useLocation();
  const match = useRouteMatch();

  // Determines whether user wants specific time or specific master
  const [timeFirst, setTimeFirst] = useState(null);

  // Setting up default appointment variables
  const currentLocalDate = new Date();
  const currentPolandISODate = `${currentLocalDate.toISOString().slice(0, 11)}02:00:00+02:00`;
  const currentPolandDate = new Date(currentPolandISODate);
  const [time, setTime] = useState(currentPolandDate);
  const [currentBarber, setCurrentBarber] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    profileImageURL: '',
    id: '',
  });
  const [currentService, setCurrentService] = useState({
    price: 0,
    title: '',
    hourHalves: 0,
  });
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  // Determines whether user has finished the reservation
  const [finishedReservation, setFinishedReservation] = useState(false);

  // By default, time comes before master
  let Step2Component = (
    <SelectTime
      timeFirst={timeFirst}
      currentBarber={currentBarber}
      time={time}
      setTime={setTime}
      currentService={currentService}
      setCurrentService={setCurrentService}
    />
  );
  let Step3Component = (
    <SelectBarber
      timeFirst={timeFirst}
      time={time}
      currentBarber={currentBarber}
      setCurrentBarber={setCurrentBarber}
    />
  );
  let Step4Component = (
    <GetDetails
      time={time}
      currentBarber={currentBarber}
      currentService={currentService}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      setFinishedReservation={setFinishedReservation}
    />
  );

  // Success page is available only after user finished the reservation
  const SuccessComponent = finishedReservation ? (
    <Success />
  ) : (
    <Redirect to={`${match.path}/step1`} />
  );

  // If user chose master before time, we swap the components
  // If user has not decided yet, we make all next steps unavailable
  switch (timeFirst) {
    case false:
      [Step2Component, Step3Component] = [Step3Component, Step2Component];
      break;
    case null:
      Step2Component = <Redirect to={`${match.path}/step1`} />;
      Step3Component = <Redirect to={`${match.path}/step1`} />;
      Step4Component = <Redirect to={`${match.path}/step1`} />;
      break;
    default:
      break;
  }

  // Mapping routes to components
  const routes = [
    {
      path: '/step1',
      component: <SelectWay setTimeFirst={setTimeFirst} />,
    },
    {
      path: '/step2',
      component: Step2Component,
    },
    {
      path: '/step3',
      component: Step3Component,
    },
    {
      path: '/step4',
      component: Step4Component,
    },
    {
      path: '/success',
      component: SuccessComponent,
    },
  ];
  return (
    <>
      <Navbar />
      <ReservationContainer>
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            {routes.map((route) => (
              <Route key={route.path} path={`${match.path}${route.path}`} exact>
                <MotionContainer
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ContentContainer>{route.component}</ContentContainer>
                  <Footer />
                </MotionContainer>
              </Route>
            ))}
          </Switch>
        </AnimatePresence>
      </ReservationContainer>
    </>
  );
}

export default Reservation;
