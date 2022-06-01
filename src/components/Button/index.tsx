import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { ButtonContainer, ButtonContent, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  label: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, loading, ...rest }) => {
  return (
    <ButtonContainer>
      <ButtonContent {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <ButtonText>{label}</ButtonText>
        )}
      </ButtonContent>
    </ButtonContainer>
  );
};

export default Button;
