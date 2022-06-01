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
  FinishButton,
  FinishButtonText,
} from './styles';

const NotificationCreated: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleNavigateToRoundDetails = useCallback(() => {
    navigation.navigate('RoundList');
  }, [navigation]);

  // const handleNavigateToNotificationFinishStepOne = useCallback(() => {
  //   navigation.navigate('RoundNotificationFinishStepOne', {
  //     roundNotificationId,
  //     roundId,
  //   });
  // }, [navigation, roundNotificationId, roundId]);

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

        {/* <FinishButton onPress={handleNavigateToNotificationFinishStepOne}>
          <FinishButtonText>CONCLUIR NOTIFICAÇÃO</FinishButtonText>
        </FinishButton> */}

        <BackButton onPress={handleNavigateToRoundDetails}>
          <BackButtonText>Voltar</BackButtonText>
        </BackButton>
      </Body>
    </Container>
  );
};

export default NotificationCreated;
