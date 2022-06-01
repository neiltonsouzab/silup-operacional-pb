import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import {
  useRoute,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import MapView, { LocalTile } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { OpenMapDirections } from 'react-native-navigation-directions';

import offlineRepository from '../../../services/offline';
import connection from '../../../services/connection';
import ServiceOrder from '../../../database/model/ServiceOrder';
import { useGeo } from '../../../hooks/geo';
import api from '../../../services/api';

import Loading from '../../../components/Loading';

import {
  Container,
  OsMap,
  OsMapMarker,
  OsContent,
  OsHeader,
  OsInfo,
  OsActions,
  OsNumber,
  OsStatus,
  OsNavigateButton,
  OsNavigateButtonText,
  OsFinishButton,
  OsFinishButtonText,
  OsDetail,
  OsDetailLabel,
  OsDetailValue,
  OsDetailRow,
  OsImage,
} from './styles';

const status = {
  1: 'PENDENTE',
  2: 'EM ROTA',
  3: 'ATENDIDO',
  7: 'PENDENTE/IMPEDIMENTO',
  8: 'IMPOSSIBILIDADE/OUTROS',
  9: 'IMPOSSIBILIDADE/AUSÊNCIA DE BAIXA TENSÃO',
  10: 'IMPOSSIBILIDADE/DERIVAÇÃO DE REDE',
};

type RouteParams = {
  serviceOrderId: string;
};

const ServiceOrderDetails: React.FC = () => {
  const osMapRef = useRef<MapView>(null);

  const route = useRoute();
  const database = useDatabase();
  const navigation = useNavigation();
  const { coords, getAddress } = useGeo();

  const { serviceOrderId } = route.params as RouteParams;

  const [serviceOrder, setServiceOrder] = useState<ServiceOrder>();

  const registerLogServiceOrder = useCallback(async () => {
    const isConnected = await connection.isConnected();

    if (isConnected && coords && serviceOrder) {
      const userRoute = await offlineRepository.routes(database).findOne();
      const originAddress = await getAddress();
      const destinyAddress = await getAddress(
        serviceOrder.latitude,
        serviceOrder.longitude,
      );

      await api.post('acessousers/atualiza_acessousers', null, {
        params: {
          rotas_users: userRoute.originalId,
          user_partida: originAddress.full_address.toUpperCase(),
          user_destino: destinyAddress.full_address.toUpperCase(),
          user_lat: coords.latitude,
          user_long: coords.longitude,
        },
      });
    }
  }, [database, getAddress, serviceOrder, coords]);

  useEffect(() => {
    const immediate = setImmediate(registerLogServiceOrder);

    const interval = setInterval(registerLogServiceOrder, 600000);

    return () => {
      clearInterval(interval);
      clearImmediate(immediate);
    };
  }, [registerLogServiceOrder]);

  useFocusEffect(
    React.useCallback(() => {
      const loadServiceOrder = async (): Promise<void> => {
        const os = await offlineRepository
          .servicesOrders(database)
          .findById(serviceOrderId);

        setServiceOrder(os);
      };

      loadServiceOrder();
    }, [database, serviceOrderId]),
  );

  if (!serviceOrder || !coords) {
    return <Loading text="Carregando as informações da O.S.." />;
  }

  const handleNavigateToFinishServiceOrder = (): void => {
    navigation.navigate('ServiceOrderFinishStepOne', { id: serviceOrder.id });
  };

  const handleNavigate = (): void => {
    const origin = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    const destination = {
      latitude: serviceOrder.latitude,
      longitude: serviceOrder.longitude,
    };

    OpenMapDirections(origin, destination, 'd');
  };

  const animateToRegion = (): void => {
    osMapRef.current?.animateToRegion(
      {
        latitude: serviceOrder.latitude,
        longitude: serviceOrder.longitude,
        latitudeDelta: coords.latitudeDelta,
        longitudeDelta: coords.longitudeDelta,
      },
      500,
    );
  };

  return (
    <Container>
      <OsMap ref={osMapRef} showsUserLocation onMapReady={animateToRegion}>
        <OsMapMarker
          coordinate={{
            latitude: serviceOrder.latitude,
            longitude: serviceOrder.longitude,
          }}
        />
      </OsMap>

      <OsHeader>
        <OsInfo>
          <OsNumber>OS 00{serviceOrder.originalId}</OsNumber>
          <OsStatus status={serviceOrder.statusId}>
            {status[serviceOrder.statusId]}
          </OsStatus>
        </OsInfo>

        <OsActions>
          <OsNavigateButton onPress={handleNavigate}>
            <Feather name="navigation" size={24} color="#1163ad" />
            <OsNavigateButtonText>Navegar</OsNavigateButtonText>
          </OsNavigateButton>
          <OsFinishButton onPress={handleNavigateToFinishServiceOrder}>
            <OsFinishButtonText>CONCLUIR OS</OsFinishButtonText>
          </OsFinishButton>
        </OsActions>
      </OsHeader>

      <ScrollView>
        <OsContent>
          <OsDetailRow>
            <OsDetail>
              <OsDetailLabel>IMAGEM</OsDetailLabel>
              <OsImage source={{ uri: serviceOrder.imageUrl }} />
            </OsDetail>
          </OsDetailRow>

          <OsDetail>
            <OsDetailLabel>RECLAMANTE</OsDetailLabel>
            <OsDetailValue>
              {serviceOrder.protestant} {' | '} {serviceOrder.protestantPhone}
            </OsDetailValue>
          </OsDetail>

          <OsDetail>
            <OsDetailLabel>LOCALIZAÇÃO</OsDetailLabel>
            <OsDetailValue>{serviceOrder.address}</OsDetailValue>
          </OsDetail>

          <OsDetail>
            <OsDetailLabel>DATA</OsDetailLabel>
            <OsDetailValue>{serviceOrder.getFormattedDate()}</OsDetailValue>
          </OsDetail>

          <OsDetailRow>
            <OsDetail>
              <OsDetailLabel>LATITUDE</OsDetailLabel>
              <OsDetailValue>
                {serviceOrder.latitude ? serviceOrder.latitude : 'Não tem'}
              </OsDetailValue>
            </OsDetail>

            <OsDetail>
              <OsDetailLabel>LONGITUDE</OsDetailLabel>
              <OsDetailValue>
                {serviceOrder.longitude ? serviceOrder.longitude : 'Não tem'}
              </OsDetailValue>
            </OsDetail>
          </OsDetailRow>

          <OsDetailRow>
            <OsDetail>
              <OsDetailLabel>TIPO</OsDetailLabel>
              <OsDetailValue>
                {serviceOrder.ocurrenceTypeDescription}
              </OsDetailValue>
            </OsDetail>

            <OsDetail>
              <OsDetailLabel>ORIGEM</OsDetailLabel>
              <OsDetailValue>
                {serviceOrder.ocurrenceOriginDescription}
              </OsDetailValue>
            </OsDetail>
          </OsDetailRow>

          {!!serviceOrder.obs && (
            <OsDetailRow>
              <OsDetail>
                <OsDetailLabel>OBSERVAÇÃO</OsDetailLabel>
                <OsDetailValue>{serviceOrder.obs}</OsDetailValue>
              </OsDetail>
            </OsDetailRow>
          )}
        </OsContent>
      </ScrollView>
    </Container>
  );
};

export default ServiceOrderDetails;
