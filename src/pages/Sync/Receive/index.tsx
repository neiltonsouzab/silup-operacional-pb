import React, { useState, useCallback, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Feather } from '@expo/vector-icons';

import offlineRepository from '../../../services/offline';
import connection from '../../../services/connection';
import syncReceive, {
  ReceiveFeedbackProps,
} from '../../../services/sync/receive';

import Loading from '../../../components/Loading';

import {
  Container,
  SyncActions,
  SyncActionsText,
  SyncActionsButton,
  SyncActionsButtonText,
  SyncMainItems,
  SyncMainItem,
  SyncMainItemName,
  SyncChildItems,
  SyncChildItem,
  SyncChildItemName,
  SyncChildItemTotal,
} from './styles';

const Receive: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const [totalOcurrencesTypes, setTotalOcurrencesTypes] = useState(0);

  const [totalRoutes, setTotalRoutes] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalSolutions, setTotalSolutions] = useState(0);
  const [totalServicesOrders, setTotalServicesOrders] = useState(0);
  const [totalRequisitions, setTotalRequisitions] = useState(0);
  const [totalRequisitionsCompleted, setTotalRequisitionsCompleted] = useState(
    0,
  );

  const [totalPostsTypes, setTotalPostsTypes] = useState(0);
  const [totalReactorsTypes, setTotalReactorsTypes] = useState(0);
  const [totalReactorsPowers, setTotalReactorsPowers] = useState(0);
  const [totalArmsTypes, setTotalArmsTypes] = useState(0);
  const [totalLightsFixturesTypes, setTotalLightsFixturesTypes] = useState(0);
  const [totalLampsTypes, setTotalLampsTypes] = useState(0);
  const [totalLampsPowers, setTotalLampsPowers] = useState(0);
  const [totalPerimetersTypes, setTotalPerimetersTypes] = useState(0);
  const [totalPlacesTypes, setTotalPlacesTypes] = useState(0);

  const [totalRounds, setTotalRounds] = useState(0);
  const [totalRoundsAddresses, setTotalRoundsAddresses] = useState(0);
  const [totalRoundsRequisitions, setTotalRoundsRequisitions] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadTotalOcurrencesTypes = async (): Promise<void> => {
        const total = await offlineRepository.ocurrencesTypes(database).count();
        setTotalOcurrencesTypes(total);
      };

      const loadTotalRoutes = async (): Promise<void> => {
        const total = await offlineRepository.routes(database).count();
        setTotalRoutes(total);
      };

      const loadTotalMembers = async (): Promise<void> => {
        const total = await offlineRepository.members(database).count();
        setTotalMembers(total);
      };

      const loadTotalSolutions = async (): Promise<void> => {
        const total = await offlineRepository.solutions(database).count();
        setTotalSolutions(total);
      };

      const loadTotalServicesOrders = async (): Promise<void> => {
        const total = await offlineRepository.servicesOrders(database).count();
        setTotalServicesOrders(total);
      };

      const loadTotalRequisitions = async (): Promise<void> => {
        const total = await offlineRepository.requisitions(database).count();
        setTotalRequisitions(total);
      };

      const loadTotalRequisitionsCompleted = async (): Promise<void> => {
        const total = await offlineRepository
          .requisitionsCompleted(database)
          .count();
        setTotalRequisitionsCompleted(total);
      };

      const loadTotalPostsTypes = async (): Promise<void> => {
        const total = await offlineRepository.postsTypes(database).count();
        setTotalPostsTypes(total);
      };

      const loadTotalReactorsTypes = async (): Promise<void> => {
        const total = await offlineRepository.reactorsTypes(database).count();
        setTotalReactorsTypes(total);
      };

      const loadTotalReactorsPowers = async (): Promise<void> => {
        const total = await offlineRepository.reactorsPowers(database).count();
        setTotalReactorsPowers(total);
      };

      const loadTotalArmsTypes = async (): Promise<void> => {
        const total = await offlineRepository.armsTypes(database).count();
        setTotalArmsTypes(total);
      };

      const loadTotalLightsFixturesTypes = async (): Promise<void> => {
        const total = await offlineRepository
          .lightsFixturesTypes(database)
          .count();
        setTotalLightsFixturesTypes(total);
      };

      const loadTotalLampsTypes = async (): Promise<void> => {
        const total = await offlineRepository.lampsTypes(database).count();
        setTotalLampsTypes(total);
      };

      const loadTotalLampsPowers = async (): Promise<void> => {
        const total = await offlineRepository.lampsPowers(database).count();
        setTotalLampsPowers(total);
      };

      const loadTotalPerimetersTypes = async (): Promise<void> => {
        const total = await offlineRepository.perimetersTypes(database).count();
        setTotalPerimetersTypes(total);
      };

      const loadTotalPlacesTypes = async (): Promise<void> => {
        const total = await offlineRepository.placesTypes(database).count();
        setTotalPlacesTypes(total);
      };

      const loadTotalRounds = async (): Promise<void> => {
        const total = await offlineRepository.rounds(database).count();
        setTotalRounds(total);
      };

      const loadTotalRoundsAddresses = async (): Promise<void> => {
        const total = await offlineRepository.roundsAddresses(database).count();

        setTotalRoundsAddresses(total);
      };

      const loadTotalRoundsRequisitions = async (): Promise<void> => {
        const total = await offlineRepository
          .roundsRequisitions(database)
          .count();

        setTotalRoundsRequisitions(total);
      };

      loadTotalOcurrencesTypes();

      loadTotalRoutes();
      loadTotalMembers();
      loadTotalSolutions();
      loadTotalServicesOrders();
      loadTotalRequisitions();
      loadTotalRequisitionsCompleted();

      loadTotalPostsTypes();
      loadTotalReactorsTypes();
      loadTotalReactorsPowers();
      loadTotalArmsTypes();
      loadTotalLightsFixturesTypes();
      loadTotalLampsTypes();
      loadTotalLampsPowers();
      loadTotalPerimetersTypes();
      loadTotalPlacesTypes();

      loadTotalRounds();
      loadTotalRoundsAddresses();
      loadTotalRoundsRequisitions();
    }, [database]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: !loading,
    });
  }, [navigation, loading]);

  const receiveNotificationsDatas = useCallback(async (): Promise<ReceiveFeedbackProps> => {
    setLoadingMessage('Recebendo dados das notificações..');

    const feedback = await syncReceive.notificationsDatas(database);

    return feedback;
  }, [database]);

  const receiveRoutesDatas = useCallback(async (): Promise<ReceiveFeedbackProps> => {
    setLoadingMessage('Recebendo dados da rota..');

    const feedback = await syncReceive.routesDatas(database);

    return feedback;
  }, [database]);

  const receiveRoundsDatas = useCallback(async (): Promise<ReceiveFeedbackProps> => {
    setLoadingMessage('Recebendo dados da ronda..');

    const feedback = await syncReceive.roundsDatas(database);

    return feedback;
  }, [database]);

  const receivePointsIpsDatas = useCallback(async (): Promise<ReceiveFeedbackProps> => {
    setLoadingMessage('Recebendo dados do ponto ip..');

    const feedback = await syncReceive.pointsIpsDatas(database);

    return feedback;
  }, [database]);

  const receiveAllDatas = useCallback(async () => {
    const hasOs = await offlineRepository
      .servicesOrders(database)
      .findFinished();

    if (hasOs.length > 0) {
      Alert.alert(
        'Atenção',
        'Você não pode sincronizar novos dados, pois existem ordens de serviço e/ou notificações que não foram enviadas.',
      );
      return;
    }

    setLoading(true);

    const notificationsDatasFeedback = await receiveNotificationsDatas();
    const routesDatasFeedback = await receiveRoutesDatas();
    const roundsDatasFeedback = await receiveRoundsDatas();
    const pointsIpsDatasFeedback = await receivePointsIpsDatas();

    setLoading(false);
    setLoadingMessage('');

    navigation.navigate('SyncReceiveFeedback', {
      receiveFeedbacks: [
        notificationsDatasFeedback,
        routesDatasFeedback,
        roundsDatasFeedback,
        pointsIpsDatasFeedback,
      ],
    });
  }, [
    navigation,
    receiveNotificationsDatas,
    receiveRoutesDatas,
    receiveRoundsDatas,
    receivePointsIpsDatas,
    database,
  ]);

  const handleReceiveAllDatas = useCallback(async () => {
    const isConnected = await connection.isConnected();

    if (!isConnected) {
      Alert.alert(
        'Atenção',
        'Você precisa estar conectado para executar esta ação.',
      );
      return;
    }

    Alert.alert(
      'Atenção',
      'Tem certeza que deseja RECEBER os dados?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: receiveAllDatas,
        },
      ],
      { cancelable: false },
    );
  }, [receiveAllDatas]);

  if (loading) {
    return <Loading text={loadingMessage} />;
  }

  return (
    <Container>
      {/* <Header title="Sincronização" /> */}
      <SyncActions>
        <SyncActionsText>Recebimento de dados</SyncActionsText>
        <SyncActionsButton onPress={handleReceiveAllDatas} disabled={loading}>
          <Feather
            name="download"
            size={24}
            color={loading ? '#C4C4C4' : '#1163ad'}
          />
          <SyncActionsButtonText>Receber todos</SyncActionsButtonText>
        </SyncActionsButton>
      </SyncActions>

      <SyncMainItems>
        <SyncMainItem>
          <SyncMainItemName>Notificação</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Tipos de ocorrências</SyncChildItemName>
              <SyncChildItemTotal>
                {totalOcurrencesTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>
        <SyncMainItem>
          <SyncMainItemName>Rota</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Rota</SyncChildItemName>
              <SyncChildItemTotal>{totalRoutes} registros</SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Membros</SyncChildItemName>
              <SyncChildItemTotal>{totalMembers} registros</SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Soluções de O.S</SyncChildItemName>
              <SyncChildItemTotal>
                {totalSolutions} registros
              </SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Ordens de serviço</SyncChildItemName>
              <SyncChildItemTotal>
                {totalServicesOrders} registros
              </SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Requisição - Materiais</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRequisitions} registros
              </SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Requisições Concluídas</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRequisitionsCompleted} registros
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>

        <SyncMainItem>
          <SyncMainItemName>Ronda</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Ronda</SyncChildItemName>
              <SyncChildItemTotal>{totalRounds} registros</SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Endereços</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRoundsAddresses} registros
              </SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Requisição - Materiais</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRoundsRequisitions} registros
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>

        <SyncMainItem>
          <SyncMainItemName>Ponto IP</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Tipos de postes</SyncChildItemName>
              <SyncChildItemTotal>
                {totalPostsTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Tipos de reatores</SyncChildItemName>
              <SyncChildItemTotal>
                {totalReactorsTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Potências dos reatores</SyncChildItemName>
              <SyncChildItemTotal>
                {totalReactorsPowers} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Tipos de braços</SyncChildItemName>
              <SyncChildItemTotal>
                {totalArmsTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Tipos de lumináris</SyncChildItemName>
              <SyncChildItemTotal>
                {totalLightsFixturesTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Tipos de lâmpadas</SyncChildItemName>
              <SyncChildItemTotal>
                {totalLampsTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Potências das lâmpadas</SyncChildItemName>
              <SyncChildItemTotal>
                {totalLampsPowers} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Tipos de perímetros</SyncChildItemName>
              <SyncChildItemTotal>
                {totalPerimetersTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Tipos de logradouros</SyncChildItemName>
              <SyncChildItemTotal>
                {totalPlacesTypes} registros
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>
      </SyncMainItems>
    </Container>
  );
};

export default Receive;
