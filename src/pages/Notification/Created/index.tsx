import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
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

type RouteParams = {
  latitude: number;
  longitude: number;
};

const Created: React.FC = () => {
  const navigation = useNavigation();
  const routeParams = useRoute();

  const { latitude, longitude } = routeParams.params as RouteParams;

  const handleNavigateToNotificationMap = useCallback(() => {
    navigation.navigate('NotificationHome', {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, [navigation, latitude, longitude]);

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

        <SuccessText>Notificação criada com sucesso!</SuccessText>

        <BackButton onPress={handleNavigateToNotificationMap}>
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
      </Body>
    </Container>
  );
};

export default Created;
