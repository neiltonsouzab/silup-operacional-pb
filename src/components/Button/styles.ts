import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonContainer = styled.View`
  padding: 0 24px;
  margin: 24px 0;
`;

export const ButtonContent = styled(RectButton)`
  flex-direction: row;
  height: 64px;
  align-items: center;
  justify-content: center;

  background: #1163ad;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #fff;
`;
