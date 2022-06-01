import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { Feather } from '@expo/vector-icons';

import ServiceOrder from '../../../../database/model/ServiceOrder';
import { useGeo } from '../../../../hooks/geo';
import offlineRepository from '../../../../services/offline';

import Loading from '../../../../components/Loading';

import lampLow from '../../../../assets/lamp-low.png';
import lampHigh from '../../../../assets/lamp-high.png';
import lampAlert from '../../../../assets/lamp-alert.png';

import {
  Container,
  OsMap,
  OsMarker,
  OsCallout,
  OsNumber,
  OsStatus,
  OsAddress,
  OsNavigate,
  OsNavigateText,
} from './styles';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const serviceOrderStatus = {
  1: 'PENDENTE',
  2: 'EM ROTA',
  3: 'ATENDIDO',
  7: 'PENDENTE/IMPEDIMENTO',
  8: 'IMPOSSIBILIDADE/OUTROS',
  9: 'IMPOSSIBILIDADE/AUSÊNCIA DE BAIXA TENSÃO',
  10: 'IMPOSSIBILIDADE/DERIVAÇÃO DE REDE',
};

const servicesOrderStatusImage = {
  1: lampLow,
  2: lampLow,
  3: lampHigh,
  7: lampAlert,
  8: lampAlert,
  9: lampAlert,
  10: lampAlert,
};

const ServiceOrderMap: React.FC = () => {
  const navigation = useNavigation();
  const database = useDatabase();
  const { coords } = useGeo();

  const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadServicesOrders = async (): Promise<void> => {
        const list = await offlineRepository.servicesOrders(database).findAll();
        setServicesOrders(list);
      };

      loadServicesOrders();
    }, [database]),
  );

  if (!servicesOrders || !coords) {
    return <Loading text="Carregando dados.." />;
  }

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

  return (
    <Container>
      <OsMap
        showsUserLocation
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {servicesOrders.map((os) => (
          <OsMarker
            onCalloutPress={(event) => event.preventDefault()}
            key={os.originalId}
            coordinate={{
              latitude: os.latitude,
              longitude: os.longitude,
            }}
            image={servicesOrderStatusImage[os.statusId]}
          >
            <OsCallout onPress={() => handleNavigateToOsDetails(os)}>
              <OsNumber>OS 00{os.originalId}</OsNumber>
              <OsStatus status={os.statusId}>
                {serviceOrderStatus[os.statusId]}
              </OsStatus>
              <OsAddress>{os.address}</OsAddress>
              <OsNavigate>
                <Feather name="search" size={16} color="#C4C4C4" />
                <OsNavigateText>Toque para detalhar O.S</OsNavigateText>
              </OsNavigate>
            </OsCallout>
          </OsMarker>
        ))}
      </OsMap>
    </Container>
  );
};

export default ServiceOrderMap;
