import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Navbar from '../components/General/Navbar';
import { Heading2, Heading3 } from '../components/General/Headings';
import { FormContainer, FormRow, Input } from '../components/General/Form';
import { PrimaryButton } from '../components/General/Buttons';

import firebase from '../utils/firebaseSetup';
import { isEmail } from '../utils/validateInput';
import Footer from '../components/General/Footer';

const ForgotPasswordContainer = styled.section`
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

const FormControls = styled.div`
  text-align: center;
  & > *:first-child {
    margin-bottom: 16px;
  }
`;

const ErrorContainer = styled.div`
  width: 100%;
  text-align: center;
`;

function ForgotPassword() {
  // The email user enters
  const [userEmail, setUserEmail] = useState('');

  // Determines, if the user has submitted the reset form
  const [sentPasswordReset, setSentPasswordReset] = useState(false);

  // Validation and db errors
  const [errorsObj, setErrorsObj] = useState(null);
  const [DBErrors, setDBErrors] = useState({ error: null });

  // Form input handler
  const handleInput = (e) => {
    setUserEmail(e.target.value);
  };

  // Form submit handler
  const handleSubmit = async () => {
    let newErrorsObj = null;
    if (!isEmail(userEmail)) {
      newErrorsObj = { valid: false, errors: { email: 'Must be a valid email' } };
    }
    if (!userEmail || userEmail.trim().length === 0) {
      newErrorsObj = { valid: false, errors: { email: 'Must not be empty' } };
    }
    if (newErrorsObj && !newErrorsObj.valid) {
      setErrorsObj({ ...newErrorsObj });
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(userEmail);
    } catch (err) {
      let errorMsg = err.code.split('/')[1].replace(/-/g, ' ');
      errorMsg = errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1);
      setDBErrors({ error: errorMsg });
      return;
    }
    setSentPasswordReset(true);
  };
  return (
    <>
      <Navbar />
      <ForgotPasswordContainer>
        <Heading2>
          {sentPasswordReset ? 'Successfully sent password reset link' : 'Reset password'}
        </Heading2>
        {!sentPasswordReset && (
          <>
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
                  value={userEmail}
                  onChange={handleInput}
                  errorsObj={errorsObj}
                />
              </FormRow>
            </FormContainer>
            <FormControls>
              <PrimaryButton onClick={handleSubmit}>Reset password</PrimaryButton>
            </FormControls>
          </>
        )}
      </ForgotPasswordContainer>
      <Footer />
    </>
  );
}

export default ForgotPassword;
