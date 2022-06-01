import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

export const InputContainer = styled.View`
  padding: 0 24px;
  margin-top: 24px;
`;

export const InputLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #1163ad;
`;

export const InputContent = styled.View`
  flex-direction: row;
  align-items: center;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Input = styled(TextInputMask)`
  flex: 1;
  padding: 8px 0;

  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  color: #888;
`;

export const Icon = styled.View``;
