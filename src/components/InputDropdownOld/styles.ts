import styled from 'styled-components/native';

export const InputContainer = styled.View`
  padding: 0 24px;
  margin-top: 24px;
`;

export const InputLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #1163ad;
`;

export const InputContent = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 8px 0;

  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  color: #888;
`;

export const Icon = styled.View``;

export const DropdownOptions = styled.ScrollView``;

export const DropdownOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const DropdownOptionValue = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;

  color: #06393c;
`;

export const DropdownOptionsEmptyText = styled.Text`
  margin-top: 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;
