import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  background: #fff;
`;

export const Header = styled.View`
  align-items: center;
  padding: 0 24px;
  width: 100%;
  height: 30%;

  background: #1163ad;
`;

export const Title = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: 40px;
`;

export const TitleText = styled.Text`
  margin-right: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 28px;

  color: #fff;
`;

export const Body = styled.View`
  margin-top: -80px;
  align-items: center;
`;

export const IconSuccess = styled.View`
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 150px;

  background: #eee;

  border-radius: 100px;
`;

export const SuccessText = styled.Text`
  margin-top: 24px;

  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const BackButtonText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #c4c4c4;
`;
