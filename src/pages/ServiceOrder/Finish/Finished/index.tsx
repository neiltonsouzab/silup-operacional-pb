import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  Header,
  Title,
  TitleText,
  Body,
  IconSuccess,
  SuccessText,
  BackButton,
  BackButtonText,
} from './styles';

const ServiceOrderFinished: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToServiceOrderListOrMap = useCallback(() => {
    navigation.navigate('ServiceOrderHome');
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Title>
          <TitleText>Parabéns</TitleText>
          <Feather name="thumbs-up" size={24} color="#FFF" />
        </Title>
      </Header>

      <Body>
        <IconSuccess>
          <Feather name="check" size={64} color="#1163ad" />
        </IconSuccess>

        <SuccessText>Ordem de serviço finalizada com sucesso!</SuccessText>

        <BackButton onPress={handleNavigateToServiceOrderListOrMap}>
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
      </Body>
    </Container>
  );
};

export default ServiceOrderFinished;
