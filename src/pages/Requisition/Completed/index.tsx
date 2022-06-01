import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { format, parseISO } from 'date-fns';

import { Feather } from '@expo/vector-icons';
import RequisitionCompleted from '../../../database/model/RequisitionCompleted';
import RequisitionCompletedItem from '../../../database/model/RequisitionCompletedItem';

import offlineRepository from '../../../services/offline';

import {
  Container,
  RequisitionList,
  RequisitionItem,
  RequisitionItemInfo,
  RequisitionItemInfoLabel,
  RequisitionItemInfoValue,
  ModalItems,
  ModalItemsContainer,
  ModalItemsContent,
  Products,
  Product,
  ProductName,
  ProductInfo,
  ProductInfoItem,
  ProductInfoItemLabel,
  ProductInfoItemValue,
  ClosedModalButton,
  LoadingProducts,
} from './styles';

const CompletedRequisitions: React.FC = () => {
  const database = useDatabase();

  const [completedRequisitions, setCompletedRequisitions] = useState<
    RequisitionCompleted[]
  >([]);

  const [completedRequisitionsItems, setCompletedRequisitionsItems] = useState<
    RequisitionCompletedItem[]
  >([]);
  const [selectedRequisitionId, setSelectedRequisitionId] = useState<number>();

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [
    completedRequisitionsItemsLoading,
    setCompletedRequisitionsItemsLoading,
  ] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadCompletedRequisitions = async (): Promise<void> => {
        const list = await offlineRepository
          .requisitionsCompleted(database)
          .findAll();

        setCompletedRequisitions(list);
      };

      loadCompletedRequisitions();
    }, [database]),
  );

  useEffect(() => {
    const loadCompletedRequisitionsItems = async (): Promise<void> => {
      setCompletedRequisitionsItemsLoading(true);

      if (!selectedRequisitionId) return;

      const items = await offlineRepository
        .requisitionsCompletedItems(database)
        .findByRequisitionCompletedId(selectedRequisitionId);

      setCompletedRequisitionsItems(items);

      setCompletedRequisitionsItemsLoading(false);
      setIsVisibleModal(true);
    };

    loadCompletedRequisitionsItems();
  }, [database, selectedRequisitionId]);

  const handleCloseModal = useCallback(() => {
    setIsVisibleModal(false);
    setSelectedRequisitionId(undefined);
  }, []);

  return (
    <Container>
      <ModalItems animationType="slide" transparent visible={isVisibleModal}>
        <ModalItemsContainer>
          <ModalItemsContent>
            <ClosedModalButton onPress={handleCloseModal}>
              <Feather name="x" color="#FFFF" size={16} />
            </ClosedModalButton>
            <Products>
              {completedRequisitionsItems.map((item) => (
                <Product key={item.id}>
                  <ProductName>{item.productName}</ProductName>
                  <ProductInfo>
                    <ProductInfoItem>
                      <ProductInfoItemLabel>Qt. Original</ProductInfoItemLabel>
                      <ProductInfoItemValue>
                        {item.originalQuantity}
                      </ProductInfoItemValue>
                    </ProductInfoItem>
                    <ProductInfoItem>
                      <ProductInfoItemLabel>Qt. Rota</ProductInfoItemLabel>
                      <ProductInfoItemValue>
                        {item.routeQuantity}
                      </ProductInfoItemValue>
                    </ProductInfoItem>
                    <ProductInfoItem>
                      <ProductInfoItemLabel>
                        Qt. Rest (Dev.)
                      </ProductInfoItemLabel>
                      <ProductInfoItemValue>
                        {item.originalQuantity - item.routeQuantity}
                      </ProductInfoItemValue>
                    </ProductInfoItem>
                  </ProductInfo>
                </Product>
              ))}
            </Products>
          </ModalItemsContent>
        </ModalItemsContainer>
      </ModalItems>
      <RequisitionList>
        {completedRequisitions.map((requisition) => (
          <RequisitionItem
            key={requisition.id}
            loading={
              completedRequisitionsItemsLoading &&
              selectedRequisitionId === requisition.originalId
            }
            onPress={() => setSelectedRequisitionId(requisition.originalId)}
          >
            {completedRequisitionsItemsLoading &&
              selectedRequisitionId === requisition.originalId && (
                <LoadingProducts color="#1163ad" size="small" />
              )}
            <RequisitionItemInfo>
              <RequisitionItemInfoLabel>N° Req.</RequisitionItemInfoLabel>
              <RequisitionItemInfoValue>
                {requisition.originalId}
              </RequisitionItemInfoValue>
            </RequisitionItemInfo>
            <RequisitionItemInfo>
              <RequisitionItemInfoLabel>N° Rota</RequisitionItemInfoLabel>
              <RequisitionItemInfoValue>
                {requisition.routeId}
              </RequisitionItemInfoValue>
            </RequisitionItemInfo>
            <RequisitionItemInfo>
              <RequisitionItemInfoLabel>Abertura</RequisitionItemInfoLabel>
              <RequisitionItemInfoValue>
                {format(new Date(requisition.openDate), 'dd/MM/yyyy')}
              </RequisitionItemInfoValue>
            </RequisitionItemInfo>
            <RequisitionItemInfo>
              <RequisitionItemInfoLabel>Conclusão</RequisitionItemInfoLabel>
              <RequisitionItemInfoValue>
                {format(
                  parseISO(requisition.closedDate.toString()),
                  'dd/MM/yyyy',
                )}
              </RequisitionItemInfoValue>
            </RequisitionItemInfo>
          </RequisitionItem>
        ))}
      </RequisitionList>
    </Container>
  );
};

export default CompletedRequisitions;
