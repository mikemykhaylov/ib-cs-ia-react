import React from 'react';
import { useHistory } from 'react-router-dom';
import { Heading2, Heading3 } from '../general/Headings';
import { grayColor, primaryColor } from '../../constants/websiteColors';
import { PrimaryButton } from '../general/Buttons';

function Success() {
  const history = useHistory();
  return (
    <>
      <Heading2>
        Thank you for your reservation!
        <br />
        We are waiting for you
      </Heading2>
      <div>
        <Heading3 color={grayColor}>
          We’ve also sent an email to the mail specified In it, you will find a link, by following
          which you will cancel the reservation
        </Heading3>
        <Heading3 color={primaryColor}>Please don’t delete the email until the visit</Heading3>
      </div>
      <PrimaryButton onClick={() => history.push('/')}>Go back to main page</PrimaryButton>
    </>
  );
}

export default Success;
