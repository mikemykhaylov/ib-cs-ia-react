import styled from 'styled-components/macro';
import { lightGrayColor } from '../../constants/websiteColors';

export const Heading1 = styled.h1`
  margin: 0;
  font-family: "Helvetica Neue Condensed";
  letter-spacing: 0.15em;
  font-style: normal;
  font-weight: bold;
  font-size: 4rem;
  color: ${(props) => props.color || lightGrayColor};
  @media (min-width: 576px) {
    font-size: 5rem;
  }
`;

export const Heading2 = styled.h2`
  margin: 0;
  font-family: Merriweather;
  font-style: normal;
  font-weight: 900;
  font-size: 3rem;
  color: ${(props) => props.color || lightGrayColor};
`;
export const Heading3 = styled.h3`
  margin: 0;
  font-family: Merriweather;
  font-style: normal;
  font-weight: bold;
  font-size: 2.25rem;
  color: ${(props) => props.color || lightGrayColor};
  font-feature-settings: 'pnum' on, 'lnum' on;
`;
export const Heading4 = styled.h4`
  margin: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  color: ${(props) => props.color || lightGrayColor};
`;
export const Heading5 = styled.h5`
  margin: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  color: ${(props) => props.color || lightGrayColor};
`;
export const Text = styled.p`
  margin: 0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.color || lightGrayColor};
`;

export const LinkText = styled(Text)`
  text-decoration: underline;
`;
