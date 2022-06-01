import styled from 'styled-components/native';
import MapView, { Marker, Callout } from 'react-native-maps';

const OsStatusColor = {
  1: '#1163ad',
  2: '#1163ad',
  3: '#1bce89',
  7: '#ffd31d',
  8: '#ffd31d',
  9: '#ffd31d',
  10: '#ffd31d',
};

interface OsStatusProps {
  status: 1 | 2 | 3 | 7 | 8 | 9 | 10;
}

export const Container = styled.View`
  background: #fff;
  flex: 1;
`;

export const OsMap = styled(MapView).attrs({
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

export const OsMarker = styled(Marker)`
  align-items: center;
`;

export const OsCallout = styled(Callout)`
  flex: 1;
  align-items: center;
  padding: 8px 16px;
`;

export const OsNumber = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  color: #1163ad;
`;

export const OsStatus = styled.Text<OsStatusProps>`
  padding: 4px 8px;
  margin-top: 4px;

  font-family: 'RopaSans_400Regular';
  font-size: 8px;
  color: #fff;
  background: ${(props) => OsStatusColor[props.status]};

  border-radius: 8px;
`;

export const OsAddress = styled.Text`
  margin-top: 8px;
  max-width: 150px;

  font-family: 'RopaSans_400Regular';
  font-size: 10px;
  color: #c4c4c4;
  text-align: center;
`;

export const OsNavigate = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
`;

export const OsNavigateText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 10px;
  color: #1163ad;

  margin-left: 4px;
`;
