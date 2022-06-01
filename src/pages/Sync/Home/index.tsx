import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  SyncButton,
  SyncButtonText,
  SyncButtonTextPrimary,
  SyncButtonTextSecondary,
  Border,
} from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <SyncButton onPress={() => navigation.navigate('SyncSend')}>
        <SyncButtonText>
          <SyncButtonTextPrimary>ENVIAR DADOS</SyncButtonTextPrimary>
          <SyncButtonTextSecondary>
            Utilize esta opção se você deseja enviar dados salvos no aplicativo
            localmente.
          </SyncButtonTextSecondary>
        </SyncButtonText>

        <Feather name="upload" size={32} color="#1163ad" />
      </SyncButton>

      <Border />

      <SyncButton onPress={() => navigation.navigate('SyncReceive')}>
        <SyncButtonText>
          <SyncButtonTextPrimary>RECEBER DADOS</SyncButtonTextPrimary>
          <SyncButtonTextSecondary>
            Utilize esta opção se você deseja receber dados do servidor.
          </SyncButtonTextSecondary>
        </SyncButtonText>

        <Feather name="download" size={32} color="#1163ad" />
      </SyncButton>

      <Border />
    </Container>
  );
};

export default Home;
