import React, { useState, useCallback, useRef } from 'react';
import { Linking, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Content,
  Header,
  Title,
  SubTitle,
  ErrorMessageContainer,
  ErrorMessageContent,
  ErrorMessage,
  ForgotPasswordLink,
  Footer,
  FooterText,
  FooterLink,
  FooterLinkText,
} from './styles';

import InputMask from '../../components/InputMask';
import InputText from '../../components/InputText';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const passwordInputRef = useRef<TextInput>(null);

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    setLoading(true);
    setErrorMessage(undefined);

    signIn({
      cpf,
      password,
    }).catch((err: Error) => {
      setErrorMessage(err.message);
      setLoading(false);
    });

    return function cleanup() {
      setLoading(false);
    };
  }, [signIn, cpf, password]);

  const handleOpenSilupWebPage = useCallback(() => {
    Linking.openURL('https://www.silup.com.br/');
  }, []);

  const handleNavigateToForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  return (
    <Container enabled>
      <Content
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Header>
          <Title>SILUP</Title>
          <SubTitle>LOGIN DE ACESSO</SubTitle>
        </Header>

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
          icon="user"
          returnKeyType="next"
          value={cpf}
          onChangeText={(value) => setCpf(value)}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />

        <InputText
          label="Password *"
          icon="lock"
          returnKeyType="send"
          secureTextEntry
          ref={passwordInputRef}
          value={password}
          onChangeText={(value) => setPassword(value)}
          onSubmitEditing={handleSignIn}
        />

        <ForgotPasswordLink onPress={handleNavigateToForgotPassword}>
          Esqueceu sua senha?
        </ForgotPasswordLink>

        <Button label="ENTRAR" loading={loading} onPress={handleSignIn} />

        <Footer>
          <FooterText>Conheça o SILUP</FooterText>
          <FooterLink onPress={handleOpenSilupWebPage}>
            <FooterLinkText>SILUP</FooterLinkText>
          </FooterLink>
        </Footer>
      </Content>
    </Container>
  );
};

export default SignIn;
