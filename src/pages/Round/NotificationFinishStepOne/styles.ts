import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #fff;
`;

export const Content = styled.ScrollView`
  background: #fff;
`;

export const RoundHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px 24px;

  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const RoundInfo = styled.View`
  align-items: center;
`;

export const RoundInfoLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #c4c4c4;
`;

export const RoundInfoValue = styled.Text`
  margin-top: 12px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #1163ad;
`;
