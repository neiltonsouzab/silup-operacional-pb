import React from 'react';
import { useRoute } from '@react-navigation/native';

import { ReceiveFeedbackProps } from '../../../services/sync/receive';

import {
  Container,
  TitleContainer,
  Title,
  FeedbackMainItems,
  FeedbackMainItem,
  FeedbackMainItemName,
  FeedbackMainItemErrorMessage,
  FeedbackChildItems,
  FeedbackChildItem,
  FeedbackChildItemName,
  FeedbackChildItemTotal,
} from './styles';

type RouteParams = {
  receiveFeedbacks: ReceiveFeedbackProps[];
};

const ReceiveFeedback: React.FC = () => {
  const routeParams = useRoute();

  const { receiveFeedbacks } = routeParams.params as RouteParams;

  return (
    <Container>
      <TitleContainer>
        <Title>Relatório de recebimento</Title>
      </TitleContainer>
      <FeedbackMainItems>
        {receiveFeedbacks.map((mainFeedback) => (
          <FeedbackMainItem key={mainFeedback.name}>
            <FeedbackMainItemName
              hasError={mainFeedback.errorMessages.length > 0}
            >
              {mainFeedback.name}
            </FeedbackMainItemName>

            {mainFeedback.errorMessages.map((errorMessage) => (
              <FeedbackMainItemErrorMessage key={errorMessage}>
                {errorMessage}
              </FeedbackMainItemErrorMessage>
            ))}

            <FeedbackChildItems>
              {mainFeedback.feedbacks.map((childFeedbacks) => (
                <FeedbackChildItem key={childFeedbacks.name}>
                  <FeedbackChildItemName>
                    {childFeedbacks.name}
                  </FeedbackChildItemName>
                  <FeedbackChildItemTotal>
                    {childFeedbacks.total} registros recebidos
                  </FeedbackChildItemTotal>
                </FeedbackChildItem>
              ))}
            </FeedbackChildItems>
          </FeedbackMainItem>
        ))}
      </FeedbackMainItems>
    </Container>
  );
};

export default ReceiveFeedback;
