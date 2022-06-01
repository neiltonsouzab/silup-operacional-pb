import styled from 'styled-components/native';

export const InputContainer = styled.View`
  padding: 0 24px;
  margin-top: 24px;
`;

export const InputContent = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 200px;

  border: 1px dashed #eee;
  border-radius: 8px;
`;

export const InputText = styled.Text`
  margin-top: 24px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #eb5757;
`;

export const PreviewContainer = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
`;

export const Preview = styled.Image`
  width: 100%;
  height: 100%;

  border-radius: 8px;
`;
