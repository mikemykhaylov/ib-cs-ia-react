import React from 'react';
import styled from 'styled-components/macro';

import { primaryColor } from '../../../constants/websiteColors';

import Barber from '../../icons/Barber';
import Equipment from '../../icons/Equipment';
import BarbershopLocation from '../../icons/BarbershopLocation';

import { Heading2 as AdvantagesTitle, Heading3, Heading4, Text } from '../../General/Headings';

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
      <AdvantagesTitle>Advantages</AdvantagesTitle>
      <AdvantagesSubtitle color={primaryColor}>We couldn’t fit all of them here</AdvantagesSubtitle>
      <AdvantagesWrap>
        <Advantage>
          <Barber color={primaryColor} height={70} />
          <Heading3>Professional Barbers</Heading3>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore libero minus expedita
            officia asperiores labore sit soluta et aliquam tempore, reiciendis voluptatem qui quos
            quasi! Perspiciatis delectus deleniti dignissimos eum.
          </Text>
        </Advantage>
        <Advantage>
          <Equipment color={primaryColor} height={70} />
          <Heading3>Best equipment</Heading3>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt necessitatibus
            suscipit deserunt ea, optio a possimus ad aspernatur magni atque repellat ratione
            voluptatibus laboriosam veritatis nulla illum aliquam excepturi dignissimos.
          </Text>
        </Advantage>
        <Advantage>
          <BarbershopLocation color={primaryColor} height={70} />
          <Heading3>Suitable location</Heading3>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum illo ipsam atque! Eum
            vel explicabo iusto laudantium necessitatibus rem provident nam saepe maiores iste,
            aliquid consequatur nisi, officia quaerat quidem.
          </Text>
        </Advantage>
      </AdvantagesWrap>
    </AdvantagesContainer>
  );
}

export default Advantages;
