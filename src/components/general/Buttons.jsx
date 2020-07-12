import styled from 'styled-components/macro';
import { primaryColor, lightGrayColor } from '../../constants/websiteColors';

export const PrimaryButton = styled.button`
  background: none;
  border-radius: 10px;
  border: 5px solid ${lightGrayColor};
  box-sizing: border-box;
  color: ${primaryColor};
  font-family: Merriweather;
  font-size: 36px;
  font-weight: bold;
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
  border: 5px solid ${lightGrayColor};
  box-sizing: border-box;
  color: ${lightGrayColor};
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding: 20px 40px;
  text-align: center;
  cursor: pointer;
  transition-duration: 200ms;
  &:hover {
    border-color: ${primaryColor};
  }
`;
