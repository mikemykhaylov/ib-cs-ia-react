import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading2, Heading3 } from '../general/Headings';
import { PrimaryButton } from '../general/Buttons';

function Success() {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <>
      <Heading2>{t('Thank you for your reservation!')}</Heading2>
      <Heading3>{t('We are waiting for you')}</Heading3>
      <PrimaryButton onClick={() => history.push('/')}>{t('Go back to main page')}</PrimaryButton>
    </>
  );
}

export default Success;
