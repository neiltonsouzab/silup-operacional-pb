import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const ButtonsContainer = styled.View`
  position: absolute;
  flex-direction: row;
  flex: 1;

  top: 24px;
  left: 24px;
  right: 24px;
`;

export const EditAddressButton = styled(RectButton)`
  flex: 1;

  height: 54px;
  align-items: center;
  justify-content: center;

  background: #1163ad;
  border-radius: 20px;
`;

export const EditAddressButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #fff;
`;

export const InformPlateletButton = styled(RectButton)`
  margin-left: 8px;

  flex: 1;
  height: 54px;
  align-items: center;
  justify-content: center;

  background: #1163ad;
  border-radius: 20px;
`;

export const InformPlateletButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #fff;
`;

export const AddressContainer = styled.View`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;

  height: 54px;
  display: flex;
  flex-direction: row;
  align-items: center;

  background: #fff;
  border-radius: 20px;
  border: 1px solid #ccc;
`;

export const AddressDescription = styled.Text`
  flex: 1;
  padding: 0 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
`;

export const AddressButtonConfirm = styled(RectButton)`
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100%;

  background: #1163ad;
  border-radius: 20px;
`;

export const AddressButtonConfirmText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  text-align: center;
  color: #fff;
`;
