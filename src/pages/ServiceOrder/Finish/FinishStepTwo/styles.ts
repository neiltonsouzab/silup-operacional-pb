import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const OsHeader = styled.View`
  padding: 8px 24px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const OsDetails = styled.View`
  flex: 1;
`;

export const OsNumber = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 24px;
  color: #1163ad;
`;

export const OsFinishButton = styled(RectButton)`
  padding: 16px 24px;

  background: #1163ad;
  border-radius: 4px;
`;

export const OsFinishButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  color: #fff;
`;

export const OsDate = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #c4c4c4;
`;

export const OsAddress = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  color: #c4c4c4;

  max-width: 200px;
`;

export const MaterialsContainer = styled.View`
  align-items: center;
  padding: 16px 0;
`;

export const MaterialsText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #1163ad;
`;

export const MaterialsList = styled.ScrollView``;

export const Material = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

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
`;

export const MaterialUpdateAmount = styled.TouchableOpacity`
  padding: 8px;
  background: #eee;
  border-radius: 50px;
  align-self: center;

  margin-left: 16px;
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

export const MaterialTrash = styled.TouchableOpacity`
  padding: 8px;
  background: #eb5757;
  border-radius: 50px;
  align-self: center;

  margin-left: 16px;
`;

export const EmptyMaterialContainer = styled.View`
  padding: 0 24px;
  align-items: center;
`;

export const EmptyMaterialText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  color: #eb5757;
`;
