import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import { useGeo } from '../../../hooks/geo';

import offline from '../../../services/offline';

import Loading from '../../../components/Loading';
import ButtonFloat from '../../../components/ButtonFloat';
import InputImage from '../../../components/InputImage';
import InputText from '../../../components/InputText';
import Location from '../../../components/Location';

import { Container, Content } from './styles';

const CreateStepOne: React.FC = () => {
  const { coords } = useGeo();
  const navigation = useNavigation();
  const database = useDatabase();

  const [imageName, setImageName] = useState<string>();
  const [tag, setTag] = useState<string>();
  const [lightFixtureAmount, setLightFixtureAmount] = useState<number>();
  const [obs, setObs] = useState<string>();

  const handleNavigateToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (!coords) {
    return <Loading text="Carregando sua localização" />;
  }

  const handleNavigateToCreateStepTwo = async (): Promise<void> => {
    const pointIpExists = await offline
      .pointsIps(database)
      .findByCoords(coords.latitude, coords.longitude);

    if (pointIpExists) {
      Alert.alert(
        'Atenção',
        'Já existe um ponto cadastro para estas coordenadas.',
      );
      return;
    }

    if (!lightFixtureAmount) {
      Alert.alert('Atenção', 'Informe todos os campos obrigatórios');
      return;
    }

    if (lightFixtureAmount < 1) {
      Alert.alert('Atenção', 'Qtde luminária deve ser maior que zero.');
      return;
    }

    navigation.navigate('PointIpCreateStepTwo', {
      imageName,
      tag,
      lightFixtureAmount,
      obs,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  return (
    <Container enabled>
      <Content keyboardShouldPersistTaps="handled">
        <Location latitude={coords.latitude} longitude={coords.longitude} />

        <InputImage
          label="Toque para adicionar uma imagem ao Ponto IP"
          onImageCapture={(image) => setImageName(image.name)}
        />

        <InputText label="Etiqueta" onChangeText={(value) => setTag(value)} />

        <InputText
          label="Qtde lumintária *"
          keyboardType="numeric"
          onChangeText={(value) => setLightFixtureAmount(Number(value))}
        />

        <InputText
          label="Observação"
          multiline
          onChangeText={(value) => setObs(value)}
        />
      </Content>
      <ButtonFloat icon="arrow-right" onPress={handleNavigateToCreateStepTwo} />
    </Container>
  );
};

export default CreateStepOne;
