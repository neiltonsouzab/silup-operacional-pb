import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Container = styled(TouchableOpacity)`
  padding: 0 24px;
  margin-top: 24px;

  flex: 1;
`;

export const Label = styled.Text`
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

export const Input = styled.TextInput`
  flex: 1;
  padding: 8px 0;

  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  color: #888;
`;
