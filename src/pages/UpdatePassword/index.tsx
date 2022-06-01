import React, { useState, useCallback, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import api from '../../services/api';
import connection from '../../services/connection';
import { useAuth } from '../../hooks/auth';

import { Container, Content } from './styles';

import InputText from '../../components/InputText';
import Button from '../../components/Button';

const UpdatePassword: React.FC = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = useCallback(async () => {
    try {
      setLoading(true);

      const isConnected = await connection.isConnected();

      if (!isConnected) {
        Alert.alert(
          'Atenção',
          'Você precisar estar conectado a internet para executar esta ação.',
        );
        return;
      }

      if (!password || !confirmPassword) {
        Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Atenção', 'Senhas não conferem.');
        return;
      }

      const response = await api.post('/alterar_senha', {
        novasenha: password,
        repitasenha: confirmPassword,
      });

      const { status, message } = response.data;

      if (!status) {
        throw Error(message);
      }

      Alert.alert('Atenção', 'Senha alterada com sucesso!');

      signOut();

      () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn' }],
          }),
        );
    } catch (error) {
      Alert.alert('Atenção', error.message);
    } finally {
      setLoading(false);
    }
  }, [password, confirmPassword, signOut, navigation]);

  return (
    <Container enabled>
      <Content>
        <InputText
          secureTextEntry
          returnKeyType="next"
          label="Nova senha *"
          icon="lock"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
        />

        <InputText
          secureTextEntry
          returnKeyType="send"
          label="Confirmação de senha *"
          icon="lock"
          ref={confirmPasswordInputRef}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          onSubmitEditing={handleUpdatePassword}
        />
        <Button
          label="SALVAR"
          loading={loading}
          onPress={handleUpdatePassword}
        />
      </Content>
    </Container>
  );
};

export default UpdatePassword;
