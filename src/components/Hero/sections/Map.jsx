import React from 'react';
import styled from 'styled-components/macro';

import { Heading2 as MapTitle, Heading4 } from '../../General/Headings';

import mapImage from '../../../images/Map.png';
import { primaryColor } from '../../../constants/websiteColors';

const MapContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  & > * {
    text-align: center;
  }
`;

const MapSubtitle = styled(Heading4)`
  margin-bottom: 64px;
`;

const MapImage = styled.img.attrs(() => ({
  src: mapImage,
}))`
  width: 100%;
  height: 400px;
  object-fit: cover;
  @media (min-width: 992px) {
    height: 700px;
  }
`;

function Map() {
  return (
    <MapContainer>
      <MapTitle>Location</MapTitle>
      <MapSubtitle color={primaryColor}>We are waiting for you</MapSubtitle>
      <MapImage />
    </MapContainer>
  );
}

export default Map;
