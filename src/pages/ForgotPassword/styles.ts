import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Title = styled.Text`
  margin-top: 80px;
  margin-bottom: 24px;

  text-align: center;

  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #06393c;
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

export const BackButton = styled.TouchableOpacity`
  align-items: center;
`;

export const BackButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;

  color: #eb5757;
`;
