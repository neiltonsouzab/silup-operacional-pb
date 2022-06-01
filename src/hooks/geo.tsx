import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { PermissionsAndroid, Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import offlineRepository from '../services/offline';
import api from '../services/api';

interface Address {
  number: string;
  route: string;
  district: string;
  city: string;
  state: string;
  full_address: string;
}

interface AddressResponse {
  results: [
    {
      address_components: {
        long_name: string;
        short_name: string;
        type: string[];
      }[];
      formatted_address: string;
    },
  ];
}

interface Coords {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface GeoContextData {
  coords: Coords | undefined;
  getAddress(latitude?: number, longitude?: number): Promise<Address>;
}

const GeoContext = createContext<GeoContextData>({} as GeoContextData);

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const latitudeDelta = 0.15;
const longitudeDelta = latitudeDelta * aspectRatio;

const GeoProvider: React.FC = ({ children }) => {
  const database = useDatabase();

  const [coords, setCoords] = useState<Coords>();
  const [isError, setIsError] = useState(true);

  const requestLocationPermission = useCallback(async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }, []);

  const registerUserLogMapping = useCallback(async () => {
    const route = await offlineRepository.routes(database).findOne();
    if (coords && route) {
      await offlineRepository.mappings(database).create({
        routeId: route.originalId,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  }, [coords, database]);

  const getAddress = useCallback(
    async (latitude, longitude): Promise<Address> => {
      const { data } = await api.get<AddressResponse>(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            latlng: `${latitude || coords?.latitude},${
              longitude || coords?.longitude
            }`,
            result_type: 'street_address',
            key: 'AIzaSyACOiUf8qAOFGRCNV2En4ifiXWQt5wbHb8',
            language: 'pt',
          },
        },
      );

      const number = data.results[0].address_components[0].short_name;
      const route = data.results[0].address_components[1].long_name;
      const district = data.results[0].address_components[2].short_name;
      const city = data.results[0].address_components[3].short_name;
      const state = data.results[0].address_components[4].short_name;
      const full_address = data.results[0].formatted_address;

      return {
        number,
        route,
        district,
        city,
        state,
        full_address,
      };
    },
    [coords],
  );

  useEffect(() => {
    const immediate = setImmediate(registerUserLogMapping);
    const interval = setInterval(registerUserLogMapping, 600000);

    return () => {
      clearImmediate(immediate);
      clearInterval(interval);
    };
  }, [registerUserLogMapping]);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        });
      },
      () => {
        setCoords(undefined);
        setIsError(!isError);
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, [isError]);

  return (
    <GeoContext.Provider value={{ coords, getAddress }}>
      {children}
    </GeoContext.Provider>
  );
};

function useGeo(): GeoContextData {
  const context = useContext(GeoContext);

  if (!context) {
    throw new Error('useGeo must be used within an GeoProvider');
  }

  return context;
}

export { GeoProvider, useGeo };
