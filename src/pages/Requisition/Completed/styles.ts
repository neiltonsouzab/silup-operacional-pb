import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const RequisitionList = styled.ScrollView``;

interface RequisitionItemProps {
  loading: boolean;
}

export const RequisitionItem = styled.TouchableOpacity<RequisitionItemProps>`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 24px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;

  background-color: ${(props) => (props.loading ? '#eee' : '#fff')};
`;

export const RequisitionItemInfo = styled.View``;

export const RequisitionItemInfoLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;

  color: #1163ad;
`;

export const RequisitionItemInfoValue = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;
  text-align: center;

  color: #c4c4c4;
`;

export const ModalItems = styled.Modal``;

export const ModalItemsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalItemsContent = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
})`
  border-radius: 10px;
  background-color: #fff;
  width: 300px;
  height: 300px;
`;

export const Products = styled.ScrollView`
  margin-top: 16px;
`;

export const Product = styled.View`
  padding: 16px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const ProductName = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  color: #1163ad;
`;

export const ProductInfo = styled.View`
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProductInfoItem = styled.View``;

export const ProductInfoItemLabel = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  color: #1163ad;
`;

export const ProductInfoItemValue = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  color: #c4c5c4;
`;

export const ClosedModalButton = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  top: 8px;
  padding: 4px;

  background-color: #eb5757;
  border-radius: 16px;
  z-index: 9999;
`;

export const LoadingProducts = styled.ActivityIndicator`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 9999;
`;
