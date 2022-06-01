import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #fff;
`;

export const Point = styled.TouchableOpacity`
  border: 1px solid #eee;

  align-items: center;

  padding: 24px;

  background: #fff;
`;

export const PointAddress = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;

export const PointPlateletNumber = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #eb5757;

  margin-top: 16px;
`;
