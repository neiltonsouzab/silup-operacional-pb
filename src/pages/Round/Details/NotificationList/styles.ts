import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import { OcurrenceAux } from '.';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const RoundNotificationList = styled(
  FlatList as new () => FlatList<OcurrenceAux>,
)``;

export const RoundNotificationItem = styled(RectButton).attrs({
  borderRadius: 1,
  shadowColor: '#000',
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
})`
  align-items: center;

  padding: 24px;

  background: #fff;
`;

export const RoundNotificationItemAddress = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;

export const RoundNotificationItemType = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #eb5757;

  margin-top: 8px;
`;

export const RoundNotificationItemCreatedAt = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #c4c4c4;

  margin-top: 8px;
`;

export const RoundNotificationListEmptyText = styled.Text`
  margin-top: 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;
