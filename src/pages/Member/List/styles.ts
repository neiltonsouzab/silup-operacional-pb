import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const MemberList = styled.ScrollView``;

export const MemberItem = styled.View`
  align-items: center;
  padding: 32px 0;

  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const MemberItemAvatar = styled.View`
  width: 80px;
  height: 80px;

  align-items: center;
  justify-content: center;

  border-radius: 50px;

  background: #f5f9f9;
`;

export const MemberItemName = styled.Text`
  margin-top: 8px;

  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;
`;

export const MemberListEmptyText = styled.Text`
  margin-top: 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;
