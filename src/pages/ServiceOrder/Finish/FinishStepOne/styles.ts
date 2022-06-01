import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #fff;
`;

export const Content = styled.ScrollView`
  background: #fff;
`;

export const OsHeader = styled.View`
  padding: 8px 24px;

  align-items: center;
  justify-content: space-between;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const OsNumber = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 32px;
  color: #1163ad;
`;

export const OsDate = styled.Text`
  margin-top: 4px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #c4c4c4;
`;

export const OsAddress = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  color: #c4c4c4;

  text-align: center;
`;
