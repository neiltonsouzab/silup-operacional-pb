import styled from 'styled-components/native';
import MapView, { Marker } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';

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
  height: 248px;
`;

export const OsMapMarker = styled(Marker)``;

export const OsHeader = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  background: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #eee;

  padding: 16px 24px;
`;

export const OsInfo = styled.View``;

export const OsActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const OsNumber = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 28px;

  color: #1163ad;
`;

export const OsStatus = styled.Text<OsStatusProps>`
  font-family: 'RopaSans_400Regular';
  font-size: 10px;
  text-align: center;

  background: ${(props) => OsStatusColor[props.status]};
  color: #fff;
  border-radius: 4px;

  padding: 4px 8px;
  margin-top: 4px;
`;

export const OsNavigateButton = styled.TouchableOpacity`
  align-items: center;
`;

export const OsNavigateButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  text-align: center;
  color: #c4c4c4;
`;

export const OsFinishButton = styled(RectButton)`
  padding: 16px 24px;
  margin-left: 16px;

  background: #1163ad;
  border-radius: 4px;
`;

export const OsFinishButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  color: #fff;
`;

export const OsContent = styled.View`
  flex: 1;
  padding: 0 24px;
  padding-bottom: 24px;

  background: #fff;
`;

export const OsDetail = styled.View`
  flex: 1;
  margin-top: 16px;
  align-items: center;
`;

export const OsDetailLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #c4c4c4;
`;

export const OsDetailValue = styled.Text`
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;
  color: #06393c;
`;

export const OsDetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const OsImage = styled.Image`
  width: 100%;
  height: 200px;

  margin-top: 8px;

  border-radius: 4px;
`;
