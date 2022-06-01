import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import InputMask from '../../components/InputMask';
import Button from '../../components/Button';

import {
  Container,
  Title,
  BackButton,
  BackButtonText,
  ErrorMessageContainer,
  ErrorMessageContent,
  ErrorMessage,
} from './styles';

interface ForgotPasswordResponseData {
  status: boolean;
  message: string;
}

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleResetPassword = useCallback(async () => {
    try {
      if (!cpf && !whatsapp) {
        Alert.alert('Atenção', 'Informe todos os campos obrigatórios (*).');
        return;
      }

      setLoading(true);
      setErrorMessage(undefined);

      const response = await api.post<ForgotPasswordResponseData>(
        '/resetar_senha',
        null,
        {
          params: {
            usuario: cpf,
            celular: whatsapp,
          },
        },
      );

      const { status, message } = response.data;

      if (!status) {
        throw new Error(message);
      }

      setLoading(false);
      setErrorMessage(undefined);

      Alert.alert(
        'Atenção',
        'Em instantes sua nova senha será enviada ao Nº de Whatsapp informado.',
      );

      navigation.navigate('SignIn');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }, [cpf, whatsapp, navigation]);

  const handleNavigateToSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <Container>
      <Title>RECUPERAÇÃO DE SENHA</Title>

      {errorMessage && (
        <ErrorMessageContainer>
          <ErrorMessageContent>
            <Feather name="alert-circle" color="#EB5757" size={24} />
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorMessageContent>
        </ErrorMessageContainer>
      )}

      <InputMask
        type="cpf"
        label="CPF *"
        icon="credit-card"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />

      <InputMask
        type="cel-phone"
        label="Whatsapp *"
        icon="phone"
        value={whatsapp}
        onChangeText={(text) => setWhatsapp(text)}
      />

      <Button label="ENVIAR" loading={loading} onPress={handleResetPassword} />

      <BackButton onPress={handleNavigateToSignIn}>
        <BackButtonText>Voltar</BackButtonText>
      </BackButton>
    </Container>
  );
};

export default ForgotPassword;
