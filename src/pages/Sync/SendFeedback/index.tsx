import React from 'react';
import { useRoute } from '@react-navigation/native';

import { SendFeedbackProps } from '../../../services/sync/send';

import {
  Container,
  TitleContainer,
  Title,
  FeedbackMainItems,
  FeedbackMainItem,
  FeedbackMainItemName,
  FeedbackChildItems,
  FeedbackChildItem,
  FeedbackChildItemName,
  FeedbackChildItemTotalSuccess,
  FeedbackChildItemTotalErrors,
  FeedbackChildItemErrorsMessages,
} from './styles';

type RouteParams = {
  sendFeedbacks: SendFeedbackProps[];
};

const SendFeedback: React.FC = () => {
  const routeParams = useRoute();

  const { sendFeedbacks } = routeParams.params as RouteParams;

  return (
    <Container>
      <TitleContainer>
        <Title>Relatório de envio</Title>
      </TitleContainer>
      <FeedbackMainItems>
        {sendFeedbacks.map((mainFeedback) => (
          <FeedbackMainItem key={mainFeedback.name}>
            <FeedbackMainItemName>{mainFeedback.name}</FeedbackMainItemName>
            <FeedbackChildItems>
              {mainFeedback.feedbacks.map((childFeedbacks) => (
                <FeedbackChildItem key={childFeedbacks.name}>
                  <FeedbackChildItemName>
                    {childFeedbacks.name}
                  </FeedbackChildItemName>
                  <FeedbackChildItemTotalSuccess>
                    {childFeedbacks.totalSuccess} registros enviados
                  </FeedbackChildItemTotalSuccess>
                  <FeedbackChildItemTotalErrors>
                    {childFeedbacks.totalError} registros não enviados
                  </FeedbackChildItemTotalErrors>
                  {childFeedbacks.errorMessages.map((erroMessage) => (
                    <FeedbackChildItemErrorsMessages key={erroMessage}>
                      {erroMessage}
                    </FeedbackChildItemErrorsMessages>
                  ))}
                </FeedbackChildItem>
              ))}
            </FeedbackChildItems>
          </FeedbackMainItem>
        ))}
      </FeedbackMainItems>
    </Container>
  );
};

export default SendFeedback;
