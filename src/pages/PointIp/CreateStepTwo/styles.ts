import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Content = styled.ScrollView``;

export const PointIpDetails = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  padding: 16px 64px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const PointIpDetail = styled.View`
  align-items: center;
`;

export const PointIpDetailLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #c4c4c4;
`;

export const PointIpDetailValue = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;

  color: #1163ad;
`;
