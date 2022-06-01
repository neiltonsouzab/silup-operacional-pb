import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const TitleContainer = styled.View`
  padding: 16px 24px;

  align-items: center;

  border-bottom-width: 1px;

  border-bottom-color: #eee;
`;

export const Title = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #06393c;
`;

export const FeedbackMainItems = styled.ScrollView``;

export const FeedbackMainItem = styled.View`
  padding: 16px 24px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

export const FeedbackMainItemName = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 18px;

  color: #1163ad;
`;

export const FeedbackChildItems = styled.View``;

export const FeedbackChildItem = styled.View`
  margin-top: 4px;
`;

export const FeedbackChildItemName = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #c4c4c4;
`;

export const FeedbackChildItemTotalSuccess = styled.Text`
  margin-top: 4px;

  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #1163ad;
`;

export const FeedbackChildItemTotalErrors = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #eb5757;
`;

export const FeedbackChildItemErrorsMessages = styled.Text`
  font-family: 'RopaSans_400Regular';
  font-size: 14px;

  color: #eb5757;
`;
