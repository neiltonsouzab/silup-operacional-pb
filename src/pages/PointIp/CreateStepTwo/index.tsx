import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import offlineRepository from '../../../services/offline';

import InputDropdown from '../../../components/InputDropdown';

import Button from '../../../components/Button';

import {
  Container,
  Content,
  PointIpDetails,
  PointIpDetail,
  PointIpDetailLabel,
  PointIpDetailValue,
} from './styles';

interface DropdownProps {
  key: number;
  label: string;
}

type RouteParams = {
  imageName: string;
  tag: string;
  lightFixtureAmount: number;
  obs: string;
  latitude: number;
  longitude: number;
};

const CreateStepTwo: React.FC = () => {
  const database = useDatabase();

  const navigation = useNavigation();
  const routeParams = useRoute();
  const {
    imageName,
    tag,
    lightFixtureAmount,
    obs,
    latitude,
    longitude,
  } = routeParams.params as RouteParams;

  const [dropdownPostsTypes, setDropdownPostsTypes] = useState<DropdownProps[]>(
    [],
  );
  const [dropdownReactorsTypes, setDropdownRectorsTypes] = useState<
    DropdownProps[]
  >([]);
  const [dropdownReactorsPowers, setDropdownRectorsPowers] = useState<
    DropdownProps[]
  >([]);
  const [dropdownArmsTypes, setDropdownArmsTypes] = useState<DropdownProps[]>(
    [],
  );
  const [
    dropdownLightsFixturesTypes,
    setDropdownLightsFixturesTypes,
  ] = useState<DropdownProps[]>([]);
  const [dropdownLampsTypes, setDropdownLampsTypes] = useState<DropdownProps[]>(
    [],
  );
  const [dropdownLampsPowers, setDropdownLampsPowers] = useState<
    DropdownProps[]
  >([]);
  const [dropdownPerimetersTypes, setDropdownPerimetersTypes] = useState<
    DropdownProps[]
  >([]);
  const [dropdownPlacesTypes, setDropdownPlacesTypes] = useState<
    DropdownProps[]
  >([]);

  const [postTypeId, setPostTypeId] = useState<number>();
  const [reactorTypeId, setReactorTypeId] = useState<number>();
  const [reactorPowerId, setReactorPowerId] = useState<number>();
  const [armTypeId, setArmTypeId] = useState<number>();
  const [lightFixtureTypeId, setLightFixtureTypeId] = useState<number>();
  const [lampTypeId, setLampTypeId] = useState<number>();
  const [lampPowerId, setLampPowerId] = useState<number>();
  const [perimeterTypeId, setPerimeterTypeId] = useState<number>();
  const [placeTypeId, setPlaceTypeId] = useState<number>();

  useFocusEffect(
    useCallback(() => {
      const loadPostsTypes = async (): Promise<void> => {
        const postsTypes = await offlineRepository
          .postsTypes(database)
          .findAll();
        const list = postsTypes.map((postType) => ({
          key: postType.originalId,
          label: postType.name,
        }));

        setDropdownPostsTypes(list);
      };

      const loadReactorsTypes = async (): Promise<void> => {
        const reactorsTypes = await offlineRepository
          .reactorsTypes(database)
          .findAll();
        const list = reactorsTypes.map((reactorType) => ({
          key: reactorType.originalId,
          label: reactorType.name,
        }));

        setDropdownRectorsTypes(list);
      };

      const loadReactorsPowers = async (): Promise<void> => {
        const reactorsPowers = await offlineRepository
          .reactorsPowers(database)
          .findAll();

        const list = reactorsPowers.map((reactorPower) => ({
          key: reactorPower.originalId,
          label: reactorPower.name,
        }));

        setDropdownRectorsPowers(list);
      };

      const loadArmsTypes = async (): Promise<void> => {
        const armsTypes = await offlineRepository.armsTypes(database).findAll();

        const list = armsTypes.map((armType) => ({
          key: armType.originalId,
          label: armType.name,
        }));

        setDropdownArmsTypes(list);
      };

      const loadLightsFixturesTypes = async (): Promise<void> => {
        const lightsFixturesTypes = await offlineRepository
          .lightsFixturesTypes(database)
          .findAll();

        const list = lightsFixturesTypes.map((lightFixtureType) => ({
          key: lightFixtureType.originalId,
          label: lightFixtureType.name,
        }));

        setDropdownLightsFixturesTypes(list);
      };

      const loadLampsTypes = async (): Promise<void> => {
        const lampsTypes = await offlineRepository
          .lampsTypes(database)
          .findAll();

        const list = lampsTypes.map((lampType) => ({
          key: lampType.originalId,
          label: lampType.name,
        }));

        setDropdownLampsTypes(list);
      };

      const loadLampsPowers = async (): Promise<void> => {
        const lampsPowers = await offlineRepository
          .lampsPowers(database)
          .findAll();

        const list = lampsPowers.map((lampPower) => ({
          key: lampPower.originalId,
          label: lampPower.name,
        }));

        setDropdownLampsPowers(list);
      };

      const loadPerimetersTypes = async (): Promise<void> => {
        const perimetersTypes = await offlineRepository
          .perimetersTypes(database)
          .findAll();

        const list = perimetersTypes.map((perimeterType) => ({
          key: perimeterType.originalId,
          label: perimeterType.name,
        }));

        setDropdownPerimetersTypes(list);
      };

      const loadPlacesTypes = async (): Promise<void> => {
        const placesTypes = await offlineRepository
          .placesTypes(database)
          .findAll();

        const list = placesTypes.map((placeType) => ({
          key: placeType.originalId,
          label: placeType.name,
        }));

        setDropdownPlacesTypes(list);
      };

      loadPostsTypes();
      loadReactorsTypes();
      loadReactorsPowers();
      loadArmsTypes();
      loadLightsFixturesTypes();
      loadLampsTypes();
      loadLampsPowers();
      loadPerimetersTypes();
      loadPlacesTypes();
    }, [database]),
  );

  const handleNavigateToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSavePointIp = useCallback(async () => {
    if (
      !postTypeId ||
      !reactorTypeId ||
      !reactorPowerId ||
      !armTypeId ||
      !lightFixtureTypeId ||
      !lampTypeId ||
      !lampPowerId ||
      !perimeterTypeId ||
      !placeTypeId
    ) {
      Alert.alert('Atenção', 'Por favor informe todos os campos obrigatórios.');
      return;
    }

    await offlineRepository.pointsIps(database).create({
      tag,
      lightFixtureAmount,
      obs,
      latitude,
      longitude,
      imageName,
      postTypeId,
      reactorTypeId,
      reactorPowerId,
      armTypeId,
      lightFixtureTypeId,
      lampTypeId,
      lampPowerId,
      perimeterTypeId,
      placeTypeId,
    });

    navigation.reset({
      routes: [{ name: 'PointIpCreated', params: { latitude, longitude } }],
    });
  }, [
    tag,
    lightFixtureAmount,
    obs,
    latitude,
    longitude,
    imageName,
    postTypeId,
    reactorTypeId,
    reactorPowerId,
    armTypeId,
    lightFixtureTypeId,
    lampTypeId,
    lampPowerId,
    perimeterTypeId,
    placeTypeId,
    database,
    navigation,
  ]);

  return (
    <Container>
      <Content
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <PointIpDetails>
          <PointIpDetail>
            <PointIpDetailLabel>Etiqueta</PointIpDetailLabel>
            <PointIpDetailValue>{tag || 'Não informada'}</PointIpDetailValue>
          </PointIpDetail>

          <PointIpDetail>
            <PointIpDetailLabel>Qtde luminária</PointIpDetailLabel>
            <PointIpDetailValue>{lightFixtureAmount}</PointIpDetailValue>
          </PointIpDetail>
        </PointIpDetails>

        <InputDropdown
          label="Tipo poste *"
          modalTitle="Selecione o tipo do poste"
          data={dropdownPostsTypes}
          selectedKey={postTypeId}
          onChange={(selected) => setPostTypeId(Number(selected.key))}
        />

        <InputDropdown
          label="Tipo reator *"
          data={dropdownReactorsTypes}
          selectedKey={reactorTypeId}
          modalTitle="Selecione o tipo do reator"
          onChange={(selected) => setReactorTypeId(Number(selected.key))}
        />

        <InputDropdown
          label="Potência reator *"
          data={dropdownReactorsPowers}
          selectedKey={reactorPowerId}
          modalTitle="Selecione a potência do reator"
          onChange={(selected) => setReactorPowerId(Number(selected.key))}
        />

        <InputDropdown
          label="Tipo braço *"
          modalTitle="Selecione o tipo do braço"
          data={dropdownArmsTypes}
          selectedKey={armTypeId}
          onChange={(selected) => setArmTypeId(Number(selected.key))}
        />

        <InputDropdown
          label="Tipo luminária *"
          modalTitle="Selecione o tipo da luminária"
          data={dropdownLightsFixturesTypes}
          selectedKey={lightFixtureTypeId}
          onChange={(selected) => setLightFixtureTypeId(Number(selected.key))}
        />

        <InputDropdown
          label="Tipo lâmpada *"
          modalTitle="Selecione o tipo da lâmpada"
          data={dropdownLampsTypes}
          selectedKey={lampTypeId}
          onChange={(selected) => setLampTypeId(Number(selected.key))}
        />

        <InputDropdown
          label="Potência lâmpada *"
          modalTitle="Selecione a potência da lâmpada"
          data={dropdownLampsPowers}
          selectedKey={lampPowerId}
          onChange={(selected) => setLampPowerId(Number(selected.key))}
        />

        <InputDropdown
          label="Tipo perímetro *"
          modalTitle="Selecione o tipo de perímetro"
          data={dropdownPerimetersTypes}
          selectedKey={perimeterTypeId}
          onChange={(selected) => setPerimeterTypeId(Number(selected.key))}
        />

        <InputDropdown
          label="Tipo logradouro *"
          modalTitle="Selecione o tipo do logradouro"
          data={dropdownPlacesTypes}
          selectedKey={placeTypeId}
          onChange={(selected) => setPlaceTypeId(Number(selected.key))}
        />

        <Button label="SALVAR" onPress={handleSavePointIp} />
      </Content>
    </Container>
  );
};

export default CreateStepTwo;
