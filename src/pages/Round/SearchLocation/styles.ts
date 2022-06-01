import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #fff;
`;

export const AddressesList = styled(FlatList as new () => FlatList<string>)`
  margin-top: 24px;
`;

interface AddressProps {
  isFirst: boolean;
}

export const AddressItem = styled.TouchableOpacity<AddressProps>`
  border-bottom-color: #eee;
  border-bottom-width: 1px;

  padding: 8px 24px;

  ${(props) =>
    props.isFirst &&
    css`
      border-top-color: #eee;
      border-top-width: 1px;
    `}
`;

export const AddressValue = styled.Text<AddressProps>`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  ${(props) =>
    props.isFirst &&
    css`
      color: #1163ad;
    `}
`;

export const Info = styled.View`
  margin-top: 8px;
  padding: 0 16px;

  color: #333;
`;

export const InfoText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;
  text-align: center;
  line-height: 25px;
`;

export const LinkText = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 16px;

  color: #1163ad;
`;
