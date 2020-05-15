import React from 'react';
import styled from 'styled-components/macro';

import storyImage from '../../../images/Story Image.jpg';
import { Heading2 as StoryTitle, Heading4, Text } from '../../General/Headings';
import { SecondaryButton } from '../../General/Buttons';

import { primaryColor } from '../../../constants/websiteColors';

const StoryContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 0 calc(100vw * 245 / 1920);
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 64px;
  }
  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
    & > *:not(:last-child) {
      margin-bottom: 0px;
    }
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: auto;
  filter: grayscale(100%);
  @media (min-width: 1200px) {
    width: calc(100vw / 2 - 10px - 100vw * 245 / 1920);
  }
`;

const StoryWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  & > * {
    text-align: center;
  }
  @media (min-width: 1200px) {
    align-items: flex-end;
    & > * {
      text-align: right;
    }
  }
`;

const StorySubtitle = styled(Heading4)`
  margin-bottom: 32px;
`;

const StoryDescription = styled(Text)`
  width: 100%;
  margin-bottom: 64px;
  @media (min-width: 1200px) {
    max-width: calc(100vw / 2 - 10px - 100vw * 245 / 1920);
  }
`;

function Story() {
  return (
    <StoryContainer>
      <StoryImage src={storyImage} />
      <StoryWrap>
        <StoryTitle>Who are we?</StoryTitle>
        <StorySubtitle color={primaryColor}>Traditions coupled with innovation</StorySubtitle>
        <StoryDescription>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, incidunt. Corporis
          eligendi nam aut corrupti voluptate, quas officiis praesentium cum, odit atque quod magni
          voluptatum, dolorem voluptas blanditiis!
        </StoryDescription>
        <SecondaryButton>Learn More</SecondaryButton>
      </StoryWrap>
    </StoryContainer>
  );
}

export default Story;
