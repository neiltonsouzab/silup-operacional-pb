import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import offlineRepository from '../../../services/offline';
import InputImage from '../../../components/InputImage';
import InputDropdown from '../../../components/InputDropdown';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';

import {
  Container,
  Content,
  Location,
  LocationLabel,
  LocationDescription,
} from './styles';

interface DropdownProps {
  key: number;
  label: string;
}

interface RouteParams {
  latitude: number;
  longitude: number;
  address: string;
  district: string;
  city: string;
  pointId: number;
  pointTag: string;
}

const SelectTypeAndImage: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    latitude,
    longitude,
    address,
    district,
    city,
    pointId,
    pointTag,
  } = route.params as RouteParams;

  const [dropdownOcurrencesTypes, setDropdownOcurrencesTypes] = useState<
    DropdownProps[]
  >([]);
  const [ocurrenceTypeId, setOcurrenceTypeId] = useState<number>();
  const [obs, setObs] = useState<string>();
  const [imageName, setImageName] = useState<string>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOcurrencesTypes = async (): Promise<void> => {
      const list = await offlineRepository.ocurrencesTypes(database).findAll();
      const ocurrencesTypes = list.map((ocurrence) => ({
        key: ocurrence.originalId,
        label: ocurrence.name,
      }));

      setDropdownOcurrencesTypes(ocurrencesTypes);
    };

    loadOcurrencesTypes();
  }, [database]);

  const handleCreateNotification = async (): Promise<void> => {
    setLoading(true);

    if (!ocurrenceTypeId) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const ocurrenceExists = await offlineRepository
      .ocurrences(database)
      .findByCoords(latitude, longitude);

    if (ocurrenceExists) {
      Alert.alert(
        'Atenção',
        'Já existe uma notificação criada para esta localização.',
      );
      setLoading(false);
      return;
    }

    await offlineRepository.roundsNotifications(database).create({
      address,
      district,
      city,
      latitude,
      longitude,
      obs,
      imageName,
      notificationTypeId: ocurrenceTypeId,
      pointId,
      pointTag,
      notificationStatusId: 1,
    });

    setLoading(false);

    navigation.reset({
      routes: [
        {
          name: 'RoundNotificationCreated',
          params: { latitude, longitude },
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
        <Location>
          <LocationLabel>Localização Informada</LocationLabel>
          <LocationDescription>{address}</LocationDescription>
        </Location>

        <InputImage
          label="Toque para adicionar imagem à notificação."
          onImageCapture={(image) => setImageName(image.name)}
        />

        <InputDropdown
          label="Tipo *"
          modalTitle="Selecione o tipo da notificação"
          data={dropdownOcurrencesTypes}
          selectedKey={ocurrenceTypeId}
          onChange={(selected) => setOcurrenceTypeId(Number(selected.key))}
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

export default SelectTypeAndImage;
