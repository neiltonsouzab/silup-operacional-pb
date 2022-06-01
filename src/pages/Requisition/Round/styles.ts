import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const RequisitionList = styled.ScrollView``;

export const RequisitionItem = styled.View`
  padding: 16px 24px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const RequisitionItemName = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;

  color: #1163ad;
`;

export const RequisitionItemAmounts = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 8px;
`;

export const AmountItem = styled.View`
  align-items: center;
`;

export const AmountLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #c4c4c4;
`;

export const Amount = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  color: #1163ad;
`;

export const RequisitionListEmptyText = styled.Text`
  margin-top: 16px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #1163ad;
`;
