import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import Navbar from '../components/General/Navbar';
import { Heading2, Heading3, LinkText } from '../components/General/Headings';
import { FormContainer, FormRow, Input } from '../components/General/Form';
import { PrimaryButton } from '../components/General/Buttons';

import firebase from '../utils/firebaseSetup';
import { validateUserCredentials } from '../utils/validateInput';
import Footer from '../components/General/Footer';
import { grayColor } from '../constants/websiteColors';
import Loading from '../components/General/Loading';

const LoginContainer = styled.section`
  margin-top: calc(100vh * 96 / 1080);
  padding: 0 calc(100vw * 196 / 1920);
  margin-bottom: 100px;
  height: calc(100vh - 45px - 100vh * 96 / 1080 - 100px);
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

const ErrorContainer = styled.div`
  width: 100%;
  text-align: center;
`;

function Login() {
  const history = useHistory();

  // Email and password user enters
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  // Validation and db errors
  const [errorsObj, setErrorsObj] = useState(null);
  const [DBErrors, setDBErrors] = useState({ error: null });

  // Determines if user has submitted the form
  const [inProcessOfLoggingIn, setInProcessOfLoggingIn] = useState(false);

  // Form input handler
  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInProcessOfLoggingIn(true);
    const barberData = { ...userInfo };
    const errors = validateUserCredentials(barberData, false);
    if (!errors.valid) {
      setErrorsObj(errors);
      setInProcessOfLoggingIn(false);
      return;
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(barberData.email, barberData.password);
    } catch (err) {
      let errorMsg = err.code.split('/')[1].replace(/-/g, ' ');
      errorMsg = errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
      setDBErrors({ error: errorMsg });
      setInProcessOfLoggingIn(false);
      return;
    }
    history.push('/dashboard');
  };
  return (
    <>
      <Navbar loginPage />
      <LoginContainer>
        <Heading2>Login</Heading2>
        {DBErrors.error && (
          <ErrorContainer>
            <Heading3>{DBErrors.error}</Heading3>
          </ErrorContainer>
        )}
        <FormContainer>
          <FormRow>
            <Input
              heading="Email"
              type="email"
              value={userInfo.email}
              onChange={handleInput}
              errorsObj={errorsObj}
            />
          </FormRow>
          <FormRow>
            <Input
              heading="Password"
              type="password"
              value={userInfo.password}
              onChange={handleInput}
              errorsObj={errorsObj}
            />
          </FormRow>
          <Link to="/forgotpassword">
            <LinkText color={grayColor}>Forgot your password?</LinkText>
          </Link>
          <PrimaryButton type="submit" onClick={handleSubmit}>
            {inProcessOfLoggingIn ? <Loading height="100%" width="100%" /> : 'Log in'}
          </PrimaryButton>
        </FormContainer>
      </LoginContainer>
      <Footer />
    </>
  );
}

export default Login;
