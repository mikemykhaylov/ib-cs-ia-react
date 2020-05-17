import React from 'react';
import styled from 'styled-components/macro';

import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl';

import { Heading2 as MapTitle, Heading4 } from '../General/Headings';
import Location from '../Icons/Location';

import { primaryColor } from '../../constants/websiteColors';

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

const MapGL = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiamF5dGVlamVlIiwiYSI6ImNrYThrZ2hzbzBkcGoyeG8zc2NtaHQ2YzgifQ.1UiyuJ_rZkCd3W57XTAaPg',
    scrollZoom: false
});

function Map() {
  return (
    <MapContainer>
      <MapTitle>Location</MapTitle>
      <MapSubtitle color={primaryColor}>We are waiting for you</MapSubtitle>
      <MapGL
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/jayteejee/ckab8ccdh2dt31io598i49sz3"
        containerStyle={{
          height: '600px',
          width: '100%',
        }}
        center={[21.033424, 52.207035]}
        zoom={[12]}
      >
        <Marker coordinates={[21.033424, 52.207035]} anchor="bottom">
          <Location color={primaryColor} height={48} />
        </Marker>
        <ZoomControl />
        {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[21.033424, 52.207035]} properties={{}} />
        </Layer> */}
      </MapGL>
    </MapContainer>
  );
}

export default Map;
