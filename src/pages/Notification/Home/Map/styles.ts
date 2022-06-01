import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const OcurrenceMap = styled(MapView).attrs({
  customMapStyle: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
})`
  width: 100%;
  height: 100%;
`;

export const OcurrenceMapMarker = styled(Marker).attrs({})``;
