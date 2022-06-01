import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import InputText from '../../../components/InputText';
import Button from '../../../components/Button';

import { Container, Content } from './styles';

const ChangeLocation: React.FC = () => {
  const navigation = useNavigation();

  const [place, setPlace] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');

  const handleConfirmAddress = useCallback(() => {
    if (place.trim() === '' || district.trim() === '' || city.trim() === '') {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios.');
      return;
    }

    const address = `${place} - ${district}, ${city}-RO, Brasil`;

    navigation.navigate('NotificationSelectTypeAndImage', {
      address,
      district,
      city,
      latitude: -8.7673193,
      longitude: -63.8952134,
    });
  }, [navigation, place, district, city]);

  return (
    <Container>
      <Content>
        <InputText
          label="Logradouro *"
          value={place}
          onChangeText={(text) => setPlace(text)}
        />

        <InputText
          label="Bairro *"
          value={district}
          onChangeText={(text) => setDistrict(text)}
        />

        <InputText
          label="Cidade/Distrito *"
          value={city}
          onChangeText={(text) => setCity(text)}
        />

        <Button label="CONFIRMAR" onPress={handleConfirmAddress} />
      </Content>
    </Container>
  );
};

export default ChangeLocation;
