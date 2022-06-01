import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;

  height: 64px;
  width: 64px;

  background: #1163ad;
  border-radius: 100px;

  position: absolute;

  bottom: 24px;
  right: 24px;
`;
