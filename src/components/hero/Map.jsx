import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

import ReactMapboxGl, { Marker, ZoomControl } from 'react-mapbox-gl';

import { Heading2 as MapTitle, Heading4 } from '../general/Headings';
import Location from '../icons/Location';

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
  scrollZoom: false,
});

function Map() {
  const { t } = useTranslation();
  return (
    <MapContainer>
      <MapTitle>{t('Location')}</MapTitle>
      <MapSubtitle color={primaryColor}>{t('We are waiting for you')}</MapSubtitle>
      <MapGL
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/jayteejee/ckab8ccdh2dt31io598i49sz3"
        containerStyle={{
          height: '50vh',
          width: '100%',
        }}
        center={[21.03337213397026, 52.20676099997715]}
        zoom={[12]}
      >
        <Marker coordinates={[21.03337213397026, 52.20676099997715]} anchor="bottom">
          <Location color={primaryColor} height={48} />
        </Marker>
        <ZoomControl />
      </MapGL>
    </MapContainer>
  );
}

export default Map;
