import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px 0;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  padding: 0 24px;
  margin-bottom: 16px;

  align-items: center;
  justify-content: space-between;
`;

export const User = styled.View`
  flex-direction: row;

  align-items: center;
`;

export const UserAvatar = styled.View`
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  background: #f5f9f9;
  border-radius: 100px;
`;

export const UserAvatarOld = styled.Image`
  width: 60px;
  height: 60px;

  border-radius: 50px;
`;

export const UserDetails = styled.View`
  margin-left: 8px;
`;

export const UserName = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;

  max-width: 150px;
`;

export const UserOffice = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  margin-top: 4px;

  color: #c4c4c4;
`;

export const CloseButton = styled.TouchableOpacity``;

export const MenuContainer = styled.View`
  padding: 0 24px;
  margin-top: 16px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  margin-bottom: 24px;
`;

export const MenuLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;

  margin-left: 16px;
`;

export const Divisor = styled.View`
  height: 1px;
  width: 100%;
  background: #eee;
`;
