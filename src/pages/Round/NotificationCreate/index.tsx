import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import { useGeo } from '../../../hooks/geo';
import offlineRepository from '../../../services/offline';

import InputDropdown from '../../../components/InputDropdown';
import InputText from '../../../components/InputText';
import InputImage from '../../../components/InputImage';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import Location from '../../../components/Location';

import { Container, Content } from './styles';

interface DropdownProps {
  key: number;
  label: string;
}

type RouteParams = {
  roundId: string;
};

const NotificationCreate: React.FC = () => {
  const navigation = useNavigation();
  const database = useDatabase();
  const route = useRoute();
  const { coords } = useGeo();
  const { roundId } = route.params as RouteParams;

  const [loading, setLoading] = useState(false);

  const [dropdownNotificationsTypes, setDropdownNotificationsTypes] = useState<
    DropdownProps[]
  >([]);

  const [notificationTypeId, setNotificationTypeId] = useState<number>();
  const [obs, setObs] = useState('');
  const [imageName, setImageName] = useState('');

  useFocusEffect(
    useCallback(() => {
      const loadNotificationsTypes = async (): Promise<void> => {
        const list = await offlineRepository
          .ocurrencesTypes(database)
          .findAll();
        const notificationsTypes = list.map((notificationType) => ({
          key: notificationType.originalId,
          label: notificationType.name,
        }));

        setDropdownNotificationsTypes(notificationsTypes);
      };

      loadNotificationsTypes();
    }, [database]),
  );

  if (!coords) {
    return <Loading text="Carregando sua localização.." />;
  }

  const handleCreateNotification = async (): Promise<void> => {
    setLoading(true);

    if (!notificationTypeId) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const notificationExists = await offlineRepository
      .roundsNotifications(database)
      .findByCoords(coords.latitude, coords.longitude);

    if (notificationExists) {
      Alert.alert(
        'Atenção',
        'Já existe uma notificação criada para esta localização.',
      );
      setLoading(false);
      return;
    }

    const roundNotification = await offlineRepository
      .roundsNotifications(database)
      .create({
        latitude: coords.latitude,
        longitude: coords.longitude,
        imageName,
        notificationTypeId: Number(notificationTypeId),
        obs,
        notificationStatusId: 1,
      });

    setLoading(false);

    navigation.reset({
      routes: [
        {
          name: 'RoundNotificationCreated',
          params: {
            roundNotificationId: roundNotification.id,
            roundId,
          },
        },
      ],
      index: 0,
    });
  };

  return (
    <Container enabled>
      <Content
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Location latitude={coords.latitude} longitude={coords.longitude} />

        <InputImage
          label="Toque para adicionar imagem à notificação."
          onImageCapture={(image) => setImageName(image.name)}
        />

        <InputDropdown
          label="Tipo *"
          modalTitle="Selection o tipo da notificação"
          data={dropdownNotificationsTypes}
          onChange={(selected) => setNotificationTypeId(Number(selected.key))}
        />

        <InputText label="Observação" onChangeText={(value) => setObs(value)} />

        <Button
          label="SALVAR"
          onPress={handleCreateNotification}
          loading={loading}
        />
      </Content>
    </Container>
  );
};

export default NotificationCreate;
