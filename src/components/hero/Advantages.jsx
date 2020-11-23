import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { primaryColor, secondaryColor } from '../../constants/websiteColors';

import Barber from '../icons/Barber';
import Equipment from '../icons/Equipment';
import BarbershopLocation from '../icons/BarbershopLocation';

import { Heading2 as AdvantagesTitle, Heading3, Heading4, Text } from '../general/Headings';

const AdvantagesContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 0 calc(100vw * 245 / 1920);
  margin-bottom: 100px;
  & > * {
    text-align: center;
  }
  @media (min-width: 992px) {
    & > * {
      text-align: left;
    }
  }
`;

const AdvantagesSubtitle = styled(Heading4)`
  margin-bottom: 64px;
`;

const AdvantagesWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const Advantage = styled.div`
  text-align: center;
  max-width: 390px;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
  @media (min-width: 576px) {
    width: 50%;
  }
  @media (min-width: 992px) {
    width: 30%;
  }
`;

function Advantages() {
  const { t } = useTranslation();
  return (
    <AdvantagesContainer>
      <AdvantagesTitle>{t('Advantages')}</AdvantagesTitle>
      <AdvantagesSubtitle color={secondaryColor}>
        {t('We could not fit all of them here')}
      </AdvantagesSubtitle>
      <AdvantagesWrap>
        <Advantage>
          <Barber color={primaryColor} height={70} />
          <Heading3>{t('Professional barbers')}</Heading3>
          <Text>{t('Barbers who will change your hairstyle and yourself')}</Text>
        </Advantage>
        <Advantage>
          <Equipment color={primaryColor} height={70} />
          <Heading3>{t('Best equipment')}</Heading3>
          <Text>{t('We use cosmetics and tools that are known all over the world')}</Text>
        </Advantage>
        <Advantage>
          <BarbershopLocation color={primaryColor} height={70} />
          <Heading3>{t('Suitable location')}</Heading3>
          <Text>{t('We are in the heart of Warsaw, next to the Royal Łazienki Park')}</Text>
        </Advantage>
      </AdvantagesWrap>
    </AdvantagesContainer>
  );
}

export default Advantages;
