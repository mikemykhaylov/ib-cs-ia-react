import React from 'react';
import styled from 'styled-components/macro';

import { primaryColor } from '../../constants/websiteColors';

import Barber from '../Icons/Barber';
import Equipment from '../Icons/Equipment';
import BarbershopLocation from '../Icons/BarbershopLocation';

import { Heading2 as AdvantagesTitle, Heading3, Heading4, Text } from '../General/Headings';

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
  return (
    <AdvantagesContainer>
      <AdvantagesTitle>Zalety</AdvantagesTitle>
      <AdvantagesSubtitle color={primaryColor}>
        Nie mogliśmy zmieścić ich wszystkich tutaj
      </AdvantagesSubtitle>
      <AdvantagesWrap>
        <Advantage>
          <Barber color={primaryColor} height={70} />
          <Heading3>Profesjonalni barberzy</Heading3>
          <Text>Barberzy, którzy zmienią twoja fryzurę, a z nimlą właśnie Ciebie</Text>
        </Advantage>
        <Advantage>
          <Equipment color={primaryColor} height={70} />
          <Heading3>Najlepszy sprzęt</Heading3>
          <Text>Używany kosmetyków i narzędzi, które są znane na całym świecie</Text>
        </Advantage>
        <Advantage>
          <BarbershopLocation color={primaryColor} height={70} />
          <Heading3>Przyzwoita lokalizacja</Heading3>
          <Text>Jesteśmy w samym sercu Warszawy, nawprost Łazienek Królewskich</Text>
        </Advantage>
      </AdvantagesWrap>
    </AdvantagesContainer>
  );
}

export default Advantages;
