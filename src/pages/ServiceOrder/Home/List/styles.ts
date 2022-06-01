import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';

import styled from 'styled-components/native';

import ServiceOrder from '../../../../database/model/ServiceOrder';

const OsStatusColor = {
  0: '#1163ad',
  1: '#1163ad',
  2: '#1163ad',
  3: '#1bce89',
  7: '#ffd31d',
  8: '#ffd31d',
  9: '#ffd31d',
  10: '#ffd31d',
};

interface OsItemStatusProps {
  status: 0 | 1 | 2 | 3 | 7 | 8 | 9 | 10;
}

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const OsList = styled(FlatList as new () => FlatList<ServiceOrder>)``;

export const OsItem = styled(RectButton).attrs({
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

export const OsItemNumber = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 28px;

  color: #1163ad;
`;

export const OsItemStatus = styled.Text<OsItemStatusProps>`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  background: ${(props) => OsStatusColor[props.status]};
  color: #fff;
  border-radius: 4px;

  padding: 8px 16px;
  margin-top: 4px;
`;

export const OsSendButton = styled(RectButton)`
  padding: 8px 16px;
  margin-top: 4px;

  background-color: ${(props) => (props.enabled ? '#1bce89' : '#EB5757')};

  border-radius: 4px;
`;

export const OsSendButtonText = styled.Text`
  color: #fff;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
`;

export const OsItemDate = styled.Text`
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 16px;

  color: #c4c4c4;
`;

export const OsItemAddress = styled.Text`
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  text-align: center;

  color: #1163ad;

  text-transform: uppercase;
`;

export const OsItemObsTitle = styled.Text`
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #eb5757;
`;

export const OsItemObs = styled.Text`
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  text-align: center;

  color: #888;

  text-transform: uppercase;
`;

export const OsItemSequence = styled.View`
  align-items: center;

  position: absolute;

  top: 0px;
  left: 0px;

  padding: 8px;

  background: #eb5757;

  border-radius: 100px;
`;

export const OsItemSequenceLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 10px;
  text-align: center;

  max-width: 80px;

  color: #1163ad;
`;

export const OsItemSequenceNumber = styled.Text`
  padding: 8px 10px;
  position: absolute;
  top: 24px;
  left: 24px;

  border-radius: 100px;
  background: #eb5757;
  color: #fff;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;
`;

export const OsListEmptyText = styled.Text`
  margin-top: 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;
