import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const SyncActions = styled.View`
  flex-direction: row;
  padding: 16px 24px;
  height: 80px;

  align-items: center;
  justify-content: space-between;

  border: 1px solid #eee;
`;

export const SyncActionsText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #eb5757;
`;

export const SyncActionsButton = styled.TouchableOpacity`
  align-items: center;
`;

export const SyncActionsButtonText = styled.Text`
  margin-top: 4px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #c4c4c4;
`;

export const SyncMainItems = styled.ScrollView``;

export const SyncMainItem = styled.View`
  padding: 16px 24px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const SyncMainItemName = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;
`;

export const SyncChildItems = styled.View``;

export const SyncChildItem = styled.View`
  margin-top: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SyncChildItemName = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #c4c4c4;
`;

export const SyncChildItemTotal = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #1163ad;
`;
