import { useDatabase } from '@nozbe/watermelondb/hooks';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { format } from 'date-fns';

import RoundNotification from '../../../../database/model/RoundNotification';
import OcurrenceType from '../../../../database/model/OcurrenceType';
import { useGeo } from '../../../../hooks/geo';
import offline from '../../../../services/offline';
import connection from '../../../../services/connection';
import ButtonFloat from '../../../../components/ButtonFloat';

import {
  Container,
  RoundNotificationList,
  RoundNotificationItem,
  RoundNotificationItemAddress,
  RoundNotificationItemType,
  RoundNotificationItemCreatedAt,
  RoundNotificationListEmptyText,
} from './styles';

export type OcurrenceAux = Pick<
  RoundNotification,
  'id' | 'latitude' | 'longitude' | 'address' | 'createdAt'
> & {
  type: string | undefined;
};

const NotificationList: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();
  const { getAddress } = useGeo();

  const [roundNotifications, setRoundNotifications] = useState<OcurrenceAux[]>(
    [],
  );
  const [notificationTypes, setNotificationTypes] = useState<OcurrenceType[]>(
    [],
  );

  useFocusEffect(
    React.useCallback(() => {
      const loadOcurrences = async (): Promise<void> => {
        const notificationsList = await offline
          .roundsNotifications(database)
          .findAll();
        const notificationType = await offline
          .ocurrencesTypes(database)
          .findAll();

        const notificationsParsed = notificationsList.map((notification) => ({
          id: notification.id,
          latitude: notification.latitude,
          longitude: notification.longitude,
          address: notification.address,
          createdAt: notification.createdAt,
          type: notificationType.find(
            (type) => type.originalId === notification.notificationTypeId,
          )?.name,
        }));

        const isOnline = await connection.isConnected();

        if (isOnline) {
          const notificationsWithAddress = await Promise.all(
            notificationsParsed.map(async (notification) => {
              if (!notification.address) {
                const address = await getAddress(
                  notification.latitude,
                  notification.longitude,
                );

                return {
                  ...notification,
                  address: address.full_address,
                };
              }

              return notification;
            }),
          );

          setRoundNotifications(notificationsWithAddress);
        } else {
          setRoundNotifications(notificationsParsed);
        }
      };

      loadOcurrences();
    }, [database, getAddress]),
  );

  const handleNavigateToNewRoundNotification = useCallback(() => {
    navigation.navigate('RoundNotificationSelectLocation');
  }, [navigation]);

  return (
    <Container>
      {roundNotifications.length > 0 ? (
        <RoundNotificationList
          data={roundNotifications}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <RoundNotificationItem>
              <RoundNotificationItemAddress>
                {item.address
                  ? item.address
                  : `${item.latitude} | ${item.longitude}`}
              </RoundNotificationItemAddress>

              <RoundNotificationItemType>{item.type}</RoundNotificationItemType>

              <RoundNotificationItemCreatedAt>
                {format(item.createdAt, 'dd/MM/yyyy HH:mm')}
              </RoundNotificationItemCreatedAt>
            </RoundNotificationItem>
          )}
        />
      ) : (
        <RoundNotificationListEmptyText>
          Nenhuma notificação encontrada.
        </RoundNotificationListEmptyText>
      )}

      <ButtonFloat onPress={handleNavigateToNewRoundNotification} icon="plus" />
    </Container>
  );
};

export default NotificationList;
