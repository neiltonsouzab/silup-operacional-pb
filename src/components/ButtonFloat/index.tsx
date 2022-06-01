import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Container } from './styles';

interface ButtonFloatProps extends RectButtonProperties {
  icon: string;
}

const ButtonFloat: React.FC<ButtonFloatProps> = ({ icon, ...rest }) => {
  return (
    <Container {...rest}>
      <Feather name={icon} size={32} color="#FFF" />
    </Container>
  );
};

export default ButtonFloat;
