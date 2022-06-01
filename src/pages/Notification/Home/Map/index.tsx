import React, { useState, useCallback, useRef } from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import MapView from 'react-native-maps';

import Ocurrence from '../../../../database/model/Ocurrence';
import offlineRepository from '../../../../services/offline';
import { useGeo } from '../../../../hooks/geo';

import ButtonFloat from '../../../../components/ButtonFloat';
import Loading from '../../../../components/Loading';

import lampLow from '../../../../assets/lamp-low.png';

import { Container, OcurrenceMap, OcurrenceMapMarker } from './styles';

type RouteParams = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Map: React.FC = () => {
  const [ocurrences, setOcurrences] = useState<Ocurrence[]>([]);

  const ocurrenceMapRef = useRef<MapView>(null);

  const database = useDatabase();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { coords } = useGeo();

  const {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  } = params as RouteParams;

  useFocusEffect(
    React.useCallback(() => {
      const loadOcurrences = async (): Promise<void> => {
        const ocurrenceList = await offlineRepository
          .ocurrences(database)
          .findAll();

        setOcurrences(ocurrenceList);
      };

      loadOcurrences();
    }, [database]),
  );

  const handleNavigateToNewNotification = useCallback(() => {
    navigation.navigate('NotificationSelectLocation');
  }, [navigation]);

  if (!coords) {
    return <Loading text="Carregando sua localização.." />;
  }

  const animateToRegion = (): void => {
    ocurrenceMapRef.current?.animateToRegion(
      {
        latitude: latitude || coords.latitude,
        longitude: longitude || coords.longitude,
        latitudeDelta: latitudeDelta || coords.latitudeDelta,
        longitudeDelta: longitudeDelta || coords.longitudeDelta,
      },
      500,
    );
  };

  return (
    <Container>
      <OcurrenceMap
        ref={ocurrenceMapRef}
        showsUserLocation
        onMapReady={animateToRegion}
      >
        {ocurrences.map((ocurrence) => (
          <OcurrenceMapMarker
            key={ocurrence.id}
            coordinate={{
              latitude: ocurrence.latitude,
              longitude: ocurrence.longitude,
            }}
            icon={lampLow}
          />
        ))}
      </OcurrenceMap>

      <ButtonFloat onPress={handleNavigateToNewNotification} icon="plus" />
    </Container>
  );
};

export default Map;
