import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import Requisition from '../../../database/model/Requisition';
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

const RouteRequisitions: React.FC = () => {
  const database = useDatabase();

  const [routeRequisitions, setRoundRequisitions] = useState<Requisition[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadRouteRequisitions = async (): Promise<void> => {
        const list = await offlineRepository.requisitions(database).findAll();
        setRoundRequisitions(list);
      };

      loadRouteRequisitions();
    }, [database]),
  );

  return (
    <Container>
      {routeRequisitions.length > 0 ? (
        <RequisitionList>
          {routeRequisitions.map((item) => (
            <RequisitionItem key={item.id}>
              <RequisitionItemName>{item.productName}</RequisitionItemName>
              <RequisitionItemAmounts>
                <AmountItem>
                  <AmountLabel>Qtde requisição</AmountLabel>
                  <Amount>{item.requisitionAmount}</Amount>
                </AmountItem>
                <AmountItem>
                  <AmountLabel>Qtde utilizada</AmountLabel>
                  <Amount>{item.routeAmount}</Amount>
                </AmountItem>
                <AmountItem>
                  <AmountLabel>Qtde disponível</AmountLabel>
                  <Amount>{item.requisitionAmount - item.routeAmount}</Amount>
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

export default RouteRequisitions;
