import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker, MapEvent } from 'react-native-maps';

import Loading from '../../../components/Loading';
import { useGeo } from '../../../hooks/geo';
import connection from '../../../services/connection';
import geolocation from '../../../services/geolocation';

import {
  Container,
  ButtonsContainer,
  EditAddressButton,
  EditAddressButtonText,
  InformPlateletButton,
  InformPlateletButtonText,
  AddressContainer,
  AddressDescription,
  AddressButtonConfirm,
  AddressButtonConfirmText,
} from './styles';

interface RouteParams {
  address: string;
  latitude: number;
  longitude: number;
}

const SelectLocation: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { coords } = useGeo();

  const params = route.params as RouteParams;

  const mapRef = useRef<MapView>(null);

  const [isConnected, setIsConnected] = useState(false);

  const [latitude, setLatitude] = useState<number | undefined>(
    params.latitude || coords?.latitude,
  );
  const [longitude, setLongitude] = useState<number | undefined>(
    params.longitude || coords?.longitude,
  );
  const [address, setAddress] = useState<string | undefined>(
    params.address || undefined,
  );
  const [district, setDistrict] = useState<string>('');
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    const loadAddress = async (): Promise<void> => {
      if (latitude && longitude) {
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });

        const connected = await connection.isConnected();

        if (connected) {
          setIsConnected(true);

          const currentAddress = await geolocation.getAddress(
            latitude,
            longitude,
          );

          setAddress(currentAddress.full_address);
          setDistrict(currentAddress.district);
          setCity(currentAddress.city);
        } else {
          setIsConnected(false);
        }
      }
    };

    loadAddress();
  }, [latitude, longitude, address]);

  const handleSelectLocation = useCallback(async (event: MapEvent) => {
    const { coordinate } = event.nativeEvent;

    setLongitude(coordinate.longitude);
    setLatitude(coordinate.latitude);
  }, []);

  const handleNavigateToSearchLocation = useCallback(() => {
    navigation.navigate('NotificationSearchLocation');
  }, [navigation]);

  const handleNavigateToSearchPlatelet = useCallback(() => {
    navigation.navigate('NotificationSearchPlatelet');
  }, [navigation]);

  const handleNavigateToSelectTypeAndImage = useCallback(() => {
    navigation.navigate('NotificationSelectTypeAndImage', {
      address,
      district,
      city,
      latitude,
      longitude,
    });
  }, [navigation, address, district, city, latitude, longitude]);

  if (!latitude || !longitude) {
    return <Loading text="Carregando sua localização.." />;
  }

  return (
    <Container>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          onDragEnd={handleSelectLocation}
          draggable
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>

      {isConnected && (
        <ButtonsContainer>
          <EditAddressButton onPress={handleNavigateToSearchLocation}>
            <EditAddressButtonText>ALTERAR ENDEREÇO</EditAddressButtonText>
          </EditAddressButton>
          <InformPlateletButton onPress={handleNavigateToSearchPlatelet}>
            <InformPlateletButtonText>
              INFORMAR PLAQUETA
            </InformPlateletButtonText>
          </InformPlateletButton>
        </ButtonsContainer>
      )}

      <AddressContainer>
        <AddressDescription numberOfLines={2}>
          {address || `Latitude: ${latitude}, Longitude: ${longitude}`}
        </AddressDescription>

        <AddressButtonConfirm onPress={handleNavigateToSelectTypeAndImage}>
          <AddressButtonConfirmText>
            CONFIRMAR ENDEREÇO
          </AddressButtonConfirmText>
        </AddressButtonConfirm>
      </AddressContainer>
    </Container>
  );
};

export default SelectLocation;
