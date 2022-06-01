import React, { useCallback, useRef, useState } from 'react';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import MapView from 'react-native-maps';

import { useGeo } from '../../../hooks/geo';
import offlineRepository from '../../../services/offline';
import PointIp from '../../../database/model/PointIp';

import Loading from '../../../components/Loading';
import ButtonFloat from '../../../components/ButtonFloat';

import pointIpMarker from '../../../assets/point-ip.png';

import { Container, PointIpMap, PointIpMarker } from './styles';

type RouteParams = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const Map: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const database = useDatabase();
  const { coords } = useGeo();

  const {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  } = route.params as RouteParams;

  const pointIpMapRef = useRef<MapView>(null);

  const [pointsIps, setPointsIps] = useState<PointIp[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadPointsIps = async (): Promise<void> => {
        const list = await offlineRepository.pointsIps(database).findAll();
        setPointsIps(list);
      };

      loadPointsIps();
    }, [database]),
  );

  const handleNavigateToCreateStepOne = useCallback(() => {
    navigation.navigate('PointIpCreateStepOne');
  }, [navigation]);

  if (!coords) {
    return <Loading text="Carregando sua localização.." />;
  }

  const animateToRegion = (): void => {
    pointIpMapRef.current?.animateToRegion(
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
      <PointIpMap
        ref={pointIpMapRef}
        showsUserLocation
        onMapReady={animateToRegion}
      >
        {pointsIps.map((pointIp) => (
          <PointIpMarker
            key={pointIp.id}
            image={pointIpMarker}
            coordinate={{
              latitude: pointIp.latitude,
              longitude: pointIp.longitude,
            }}
          />
        ))}
      </PointIpMap>
      <ButtonFloat icon="plus" onPress={handleNavigateToCreateStepOne} />
    </Container>
  );
};

export default Map;
