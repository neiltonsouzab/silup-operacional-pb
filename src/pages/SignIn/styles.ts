import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;

  background: #fff;
`;

export const Content = styled.ScrollView`
  background: #fff;
`;

export const Header = styled.View`
  margin-top: 80px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 28px;

  color: #06393c;
`;

export const SubTitle = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  margin-top: 16px;
  color: #06393c;
`;

export const ForgotPasswordLink = styled.Text`
  padding: 0 24px;
  margin-top: 8px;

  text-align: right;
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #1163ad;
`;

export const Footer = styled.View`
  align-items: center;
`;

export const FooterText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #c4c4c4;
`;

export const FooterLink = styled.TouchableOpacity`
  margin: 8px 0;
`;

export const FooterLinkText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;
`;

export const ErrorMessageContainer = styled.View`
  padding: 0 24px;
  margin-top: 24px;
`;

export const ErrorMessageContent = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 16px;

  background: #eee;
  border-radius: 4px;
`;

export const ErrorMessage = styled.Text`
  margin-left: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #06393c;
`;
