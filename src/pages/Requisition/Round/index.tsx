import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import RoundRequisition from '../../../database/model/RoundRequisition';
import offlineRepository from '../../../services/offline';

import {
  Container,
  RequisitionList,
  RequisitionItem,
  RequisitionItemName,
  RequisitionItemAmounts,
  AmountItem,
  AmountLabel,
  Amount,
  RequisitionListEmptyText,
} from './styles';

const RoundRequisitions: React.FC = () => {
  const database = useDatabase();

  const [roundRequisitions, setRoundRequisitions] = useState<
    RoundRequisition[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const loadRoundRequisitions = async (): Promise<void> => {
        const list = await offlineRepository
          .roundsRequisitions(database)
          .findAll();
        setRoundRequisitions(list);
      };

      loadRoundRequisitions();
    }, [database]),
  );

  return (
    <Container>
      {roundRequisitions.length > 0 ? (
        <RequisitionList>
          {roundRequisitions.map((item) => (
            <RequisitionItem key={item.id}>
              <RequisitionItemName>{item.productName}</RequisitionItemName>
              <RequisitionItemAmounts>
                <AmountItem>
                  <AmountLabel>Qtde requisição</AmountLabel>
                  <Amount>{item.requisitionAmount}</Amount>
                </AmountItem>
                <AmountItem>
                  <AmountLabel>Qtde utilizada</AmountLabel>
                  <Amount>{item.roundAmount}</Amount>
                </AmountItem>
                <AmountItem>
                  <AmountLabel>Qtde disponível</AmountLabel>
                  <Amount>{item.requisitionAmount - item.roundAmount}</Amount>
                </AmountItem>
              </RequisitionItemAmounts>
            </RequisitionItem>
          ))}
        </RequisitionList>
      ) : (
        <RequisitionListEmptyText>
          Nenhuma requisição encontrada.
        </RequisitionListEmptyText>
      )}
    </Container>
  );
};

export default RoundRequisitions;
