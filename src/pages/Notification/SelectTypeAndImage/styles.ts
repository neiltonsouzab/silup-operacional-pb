import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #fff;
`;

export const Content = styled.ScrollView`
  background: #fff;
`;

export const Location = styled.View`
  align-items: center;

  margin-top: 24px;

  padding: 0 24px;
`;

export const LocationLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #c4c4c4;
`;

export const LocationDescription = styled.Text`
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #eb5757;

  text-align: center;
`;
