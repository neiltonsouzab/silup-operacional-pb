import React, { useCallback, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';

import { Container, Point, PointAddress, PointPlateletNumber } from './styles';

type Point = {
  pointId: string;
  address: string;
  district: string;
  city: string;
  platelet: string;
  longitude: number;
  latitude: number;
};

const SearchPlatelet: React.FC = () => {
  const navigation = useNavigation();

  const [plateletNumber, setPlateletNumber] = useState('');
  const [point, setPoint] = useState<Point>();
  const [loading, setLoading] = useState(false);

  const handleSearchPoint = useCallback(async () => {
    try {
      setLoading(true);
      setPoint(undefined);

      Keyboard.dismiss();

      const response = await api.get(`/ponto/lista_busca_ponto`, {
        params: { etiqueta: plateletNumber },
      });

      const { data, status } = response.data;

      if (!status) {
        Alert.alert(
          'Atenção',
          'Nenhum ponto encontrado com a plaqueta informada.',
        );

        return;
      }

      setPoint({
        pointId: data[0].codigo_ponto_plaqueado,
        address: data[0].endereco,
        district: data[0].bairro,
        city: data[0].cidade,
        platelet: data[0].etiqueta,
        latitude: data[0].latitude,
        longitude: data[0].longitude,
      });
    } catch (error) {
      Alert.alert('Atenção', 'Ocorreu um erro ao pesquisar o ponto.');
    } finally {
      setLoading(false);
    }
  }, [plateletNumber]);

  const handleSelectPoint = useCallback(() => {
    navigation.navigate('NotificationSelectTypeAndImage', {
      address: point?.address,
      district: point?.district,
      city: point?.city,
      latitude: point?.latitude,
      longitude: point?.longitude,
      pointId: point?.pointId,
      pointTag: point?.platelet,
    });
  }, [navigation, point]);

  return (
    <Container>
      <InputText
        label="Digite n° da plaqueta"
        onChangeText={(text) => setPlateletNumber(text)}
        onSubmitEditing={handleSearchPoint}
      />
      <Button label="Pesquisar" loading={loading} onPress={handleSearchPoint} />

      {point && (
        <Point onPress={handleSelectPoint}>
          <PointAddress>{point.address}</PointAddress>
          <PointPlateletNumber>N° {point.platelet}</PointPlateletNumber>
        </Point>
      )}
    </Container>
  );
};

export default SearchPlatelet;
