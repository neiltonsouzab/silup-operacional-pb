import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import RoundAddress from '../../../../database/model/RoundAddress';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const RoundAddressList = styled(
  FlatList as new () => FlatList<RoundAddress>,
)``;

export const RoundAddressItem = styled(RectButton).attrs({
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

export const RoundAddressItemAddress = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;
