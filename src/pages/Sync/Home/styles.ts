import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const SyncButton = styled(RectButton)`
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;

  padding: 16px;
`;

export const SyncButtonText = styled.View``;

export const SyncButtonTextPrimary = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;
`;

export const SyncButtonTextSecondary = styled.Text`
  max-width: 300px;
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
`;

export const Border = styled.View`
  border: 1px solid #eee;
`;
