import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { LoadingContainer, LoadingText } from './styles';

interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#C4C4C4" />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
