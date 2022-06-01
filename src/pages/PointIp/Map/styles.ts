import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const PointIpMap = styled(MapView).attrs({
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
  height: 100%;
  width: 100%;
`;

export const PointIpMarker = styled(Marker)``;
