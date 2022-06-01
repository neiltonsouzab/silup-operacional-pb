import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { format } from 'date-fns';

import OcurrenceType from 'src/database/model/OcurrenceType';
import Ocurrence from '../../../../database/model/Ocurrence';
import offline from '../../../../services/offline';
import connection from '../../../../services/connection';
import { useGeo } from '../../../../hooks/geo';
import ButtonFloat from '../../../../components/ButtonFloat';

import {
  Container,
  NotificationList,
  NotificationItem,
  NotificationItemAddress,
  NotificationItemType,
  NotificationItemCreatedAt,
  NotificationListEmptyText,
} from './styles';

export type OcurrenceAux = Pick<
  Ocurrence,
  'id' | 'latitude' | 'longitude' | 'address' | 'createdAt'
> & {
  type: string | undefined;
};

const List: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();
  const { getAddress } = useGeo();

  const [ocurrences, setOcurrences] = useState<OcurrenceAux[]>([]);
  const [ocurrencesType, setOcurrencesType] = useState<OcurrenceType[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadOcurrences = async (): Promise<void> => {
        const ocurrencesList = await offline.ocurrences(database).findAll();
        const ocurrenceType = await offline.ocurrencesTypes(database).findAll();

        const ocurrencesParsed = ocurrencesList.map((ocurrence) => ({
          id: ocurrence.id,
          latitude: ocurrence.latitude,
          longitude: ocurrence.longitude,
          address: ocurrence.address,
          createdAt: ocurrence.createdAt,
          type: ocurrenceType.find(
            (type) => type.originalId === ocurrence.ocurrenceTypeId,
          )?.name,
        }));

        const isOnline = await connection.isConnected();

        if (isOnline) {
          const ocurrencessaWithAddress = await Promise.all(
            ocurrencesParsed.map(async (ocurrence) => {
              if (!ocurrence.address) {
                const address = await getAddress(
                  ocurrence.latitude,
                  ocurrence.longitude,
                );

                return {
                  ...ocurrence,
                  address: address.full_address,
                };
              }

              return ocurrence;
            }),
          );

          setOcurrences(ocurrencessaWithAddress);
        } else {
          setOcurrences(ocurrencesParsed);
        }
      };

      loadOcurrences();
    }, [database, getAddress]),
  );

  const handleNavigateToNewNotification = useCallback(() => {
    navigation.navigate('NotificationSelectLocation');
  }, [navigation]);

  return (
    <Container>
      {ocurrences.length > 0 ? (
        <NotificationList
          data={ocurrences}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <NotificationItem>
              <NotificationItemAddress>
                {item.address
                  ? item.address
                  : `${item.latitude} | ${item.longitude}`}
              </NotificationItemAddress>

              <NotificationItemType>{item.type}</NotificationItemType>

              <NotificationItemCreatedAt>
                {format(item.createdAt, 'dd/MM/yyyy HH:mm')}
              </NotificationItemCreatedAt>
            </NotificationItem>
          )}
        />
      ) : (
        <NotificationListEmptyText>
          Nenhuma notificação encontrada.
        </NotificationListEmptyText>
      )}

      <ButtonFloat onPress={handleNavigateToNewNotification} icon="plus" />
    </Container>
  );
};

export default List;
