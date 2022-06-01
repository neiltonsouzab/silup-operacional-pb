import React, { useCallback, useEffect, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';

import InputText from '../../../components/InputText';

import geolocation from '../../../services/geolocation';

import {
  Container,
  AddressesList,
  AddressItem,
  AddressValue,
  Info,
  InfoText,
  LinkText,
} from './styles';

const SearchLocation: React.FC = () => {
  const navigation = useNavigation();

  const [foundAddresses, setFoundAddresses] = useState<string[]>([]);
  const [searchAddress, setSearchAddress] = useState('');

  useEffect(() => {
    geolocation.searchAddress(searchAddress).then((addresses) => {
      setFoundAddresses(addresses);
    });
  }, [searchAddress]);

  const handleAddressSelected = useCallback(
    async (selectedAddress: string) => {
      const coords = await geolocation.getCoordsByAddress(selectedAddress);

      navigation.dispatch(
        StackActions.replace('NotificationSelectLocation', {
          address: searchAddress,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      );
    },
    [navigation, searchAddress],
  );

  const handleNavigateToChangeLocation = useCallback(() => {
    navigation.navigate('NotificationChangeLocation');
  }, [navigation]);

  return (
    <Container>
      <Info>
        <InfoText>
          Digite o seu endereço no campo abaixo e faça uma pesquisa automática
          ou
          <LinkText onPress={handleNavigateToChangeLocation}>
            {' '}
            toque aqui e informe manualmente.
          </LinkText>
        </InfoText>
      </Info>

      <InputText
        multiline
        label="Digite o endereço"
        placeholder="Pesquise o endereço automáticamente"
        numberOfLines={2}
        onChangeText={(text) => setSearchAddress(text)}
      />

      <AddressesList
        data={foundAddresses}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <AddressItem
            isFirst={index === 0}
            onPress={() => handleAddressSelected(item)}
          >
            <AddressValue isFirst={index === 0}>{item}</AddressValue>
          </AddressItem>
        )}
      />
    </Container>
  );
};

export default SearchLocation;
