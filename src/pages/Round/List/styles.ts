import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import Round from '../../../database/model/Round';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const RoundList = styled(FlatList as new () => FlatList<Round>)``;

export const RoundItem = styled(RectButton).attrs({
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 24px;

  background: #fff;
`;

export const RoundItemInfo = styled.View``;

export const RoundItemInfoLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;

export const RoundItemInfoValue = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #c4c4c4;

  margin-top: 8px;
`;

export const RoundEmptyText = styled.Text`
  margin-top: 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;
