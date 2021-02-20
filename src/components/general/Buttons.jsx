import styled from 'styled-components/macro';

import { lighterGrayColor, primaryColor } from '../../constants/websiteColors';

export const PrimaryButton = styled.button`
  background: none;
  border-radius: 10px;
  border: 5px solid ${lighterGrayColor};
  box-sizing: border-box;
  color: ${primaryColor};
  font-family: SpaceGrotesk, sans-serif;
  font-size: 36px;
  font-variation-settings: 'wght' 700;
  margin: 0;
  padding: 15px 45px;
  text-align: center;
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    border-color: ${primaryColor};
  }
`;

export const SecondaryButton = styled.button`
  background: none;
  border-radius: 10px;
  border: 5px solid ${lighterGrayColor};
  box-sizing: border-box;
  color: ${lighterGrayColor};
  font-family: SpaceGrotesk, sans-serif;
  font-size: 24px;
  font-variation-settings: 'wght' 600;
  margin: 0;
  padding: 20px 40px;
  text-align: center;
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    border-color: ${primaryColor};
  }
`;
