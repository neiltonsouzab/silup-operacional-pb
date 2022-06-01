import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import Loading from '../../../../components/Loading';
import offlineRepository from '../../../../services/offline';

import ServiceOrder from '../../../../database/model/ServiceOrder';

import {
  Container,
  OsList,
  OsItem,
  OsItemNumber,
  OsItemStatus,
  OsSendButton,
  OsSendButtonText,
  OsItemDate,
  OsItemAddress,
  OsItemObs,
  OsListEmptyText,
} from './styles';

const serviceOrderStatus = {
  1: 'PENDENTE',
  2: 'EM ROTA',
  3: 'ATENDIDO',
  7: 'PENDENTE/IMPEDIMENTO',
  8: 'IMPOSSIBILIDADE/OUTROS',
  9: 'IMPOSSIBILIDADE/AUSÊNCIA DE BAIXA TENSÃO',
  10: 'IMPOSSIBILIDADE/DERIVAÇÃO DE REDE',
};

const Sent: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();

  const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);
  const [loadingSendOs, setLoadingSendOs] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadServicesOrders = async (): Promise<void> => {
        const list = await offlineRepository
          .servicesOrders(database)
          .findSent();
        setServicesOrders(list);
      };

      loadServicesOrders();
    }, [database]),
  );

  const handleNavigateToOsDetails = (serviceOrder: ServiceOrder): void => {
    if (serviceOrder.statusId === 1 || serviceOrder.statusId === 2) {
      navigation.navigate('ServiceOrderDetails', {
        serviceOrderId: serviceOrder.id,
      });
    } else {
      navigation.navigate('ServiceOrderEdit', {
        serviceOrderId: serviceOrder.id,
      });
    }
  };

  if (loadingSendOs) {
    return <Loading text="ENVIANDO O.S..." />;
  }

  return (
    <Container>
      {servicesOrders.length > 0 ? (
        <OsList
          data={servicesOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item: os, index }) => (
            <OsItem onPress={() => handleNavigateToOsDetails(os)}>
              <OsItemNumber>OS 00{os.originalId}</OsItemNumber>
              <OsItemStatus status={os.statusId}>
                {serviceOrderStatus[os.statusId]}
              </OsItemStatus>

              <OsSendButton enabled={false}>
                <OsSendButtonText>
                  {os.sent ? 'OS JA ENVIADA' : 'ENVIAR OS'}
                </OsSendButtonText>
              </OsSendButton>

              <OsItemDate>{os.getFormattedDate()}</OsItemDate>
              <OsItemAddress>{os.address}</OsItemAddress>
              {!!os.obs && <OsItemObs>{os.obs}</OsItemObs>}
            </OsItem>
          )}
        />
      ) : (
        <OsListEmptyText>Nenhuma O.S encontrada.</OsListEmptyText>
      )}
    </Container>
  );
};

export default Sent;
