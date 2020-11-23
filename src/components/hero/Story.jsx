import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import { Heading2 as StoryTitle, Heading4, Text } from '../general/Headings';

import { secondaryColor } from '../../constants/websiteColors';
import storyImage from '../../images/storyImage.webp';
import { SecondaryButton } from '../general/Buttons';

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
    align-self: center;
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
  @media (min-width: 992px) {
    width: 50vw;
  }
  @media (min-width: 1200px) {
    width: calc(100vw / 2 - 40px - 100vw * 245 / 1920);
  }
`;

function Story() {
  const { t } = useTranslation();
  return (
    <StoryContainer>
      <StoryImage alt="Front view of our barbershop" src={storyImage} />
      <StoryWrap>
        <StoryTitle>{t('Who are we?')}</StoryTitle>
        <StorySubtitle color={secondaryColor}>
          {t('Scisor prosthetics are on our todo list')}
        </StorySubtitle>
        <StoryDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit, doloribus
          perferendis unde ea aliquid non nobis cum molestias fuga facere autem eaque consectetur
          ratione! Eligendi ipsam minima ex sint. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolores, et quam minus accusantium mollitia sed asperiores, illum magni quod eveniet
          repellendus autem ratione velit beatae doloribus dolore quisquam ab. Sed!
        </StoryDescription>
        <SecondaryButton>{t('More')}</SecondaryButton>
      </StoryWrap>
    </StoryContainer>
  );
}

export default Story;
