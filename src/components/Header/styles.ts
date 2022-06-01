import styled from 'styled-components/native';

export const Container = styled.View`
  height: 80px;

  background: #1163ad;

  /* border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px; */
`;

export const Content = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  padding: 24px;
`;

export const MenuButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 22px;

  color: #fff;
`;

export const BackButtonContainer = styled.View`
  width: 32px;
  height: 32px;
`;

export const BackButton = styled.TouchableOpacity``;
