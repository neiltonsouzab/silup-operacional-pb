import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const MaterialContainer = styled.View`
  margin-top: 16px;
`;

export const MaterialContainerTitle = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #1163ad;

  text-align: center;
`;

export const MaterialList = styled.View`
  margin-top: 8px;
`;

export const MaterialItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 8px;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const MaterialName = styled.Text`
  flex: 1;
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  color: #1163ad;
`;

export const MaterialAction = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MaterialAmount = styled.Text`
  margin-left: 16px;

  border: 1px solid #eee;
  border-radius: 8px;
  padding: 8px 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  color: #1163ad;

  align-self: center;
`;

export const MaterialUpdateAmount = styled.TouchableOpacity`
  padding: 8px;
  background: #eee;
  border-radius: 50px;
  align-self: center;

  margin-left: 16px;
`;

export const MaterialTrash = styled.TouchableOpacity`
  padding: 8px;
  background: #eb5757;
  border-radius: 50px;
  align-self: center;

  margin-left: 16px;
`;

export const AlertText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;

  color: #eb5757;

  text-align: center;
  margin-top: 16px;
`;
