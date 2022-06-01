import React, { useState, useCallback, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Feather } from '@expo/vector-icons';

import offlineRepository from '../../../services/offline';
import connection from '../../../services/connection';
import syncSend, { SendFeedbackProps } from '../../../services/sync/send';

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

const Send: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const [totalOcurrences, setTotalOcurrences] = useState(0);
  const [totalServicesOrders, setTotalServicesOrders] = useState(0);
  const [
    totalServicesOrdersMaterials,
    setTotalServicesOrdersMaterials,
  ] = useState(0);
  const [totalRequisitions, setTotalRequisitions] = useState(0);
  const [totalPointsIps, setTotalPointsIps] = useState(0);

  const [totalRoundsNotifications, setTotalRoundsNotifications] = useState(0);
  const [totalRoundsRequisitions, setTotalRoundsRequisitions] = useState(0);
  const [totalRoundsMaterials, setTotalRoundsMaterials] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadTotalOcurrences = async (): Promise<void> => {
        const total = await offlineRepository.ocurrences(database).count();

        setTotalOcurrences(total);
      };

      const loadTotalServicesOrders = async (): Promise<void> => {
        const total = await offlineRepository
          .servicesOrders(database)
          .countFinished();

        setTotalServicesOrders(total);
      };

      const loadTotalServicesOrdersMaterials = async (): Promise<void> => {
        const total = await offlineRepository
          .servicesOrdersMaterials(database)
          .count();

        setTotalServicesOrdersMaterials(total);
      };

      const loadTotalRequisitions = async (): Promise<void> => {
        const total = await offlineRepository.requisitions(database).count();

        setTotalRequisitions(total);
      };

      const loadTotalPointsIps = async (): Promise<void> => {
        const total = await offlineRepository.pointsIps(database).count();

        setTotalPointsIps(total);
      };

      const loadTotalRoundsNotifications = async (): Promise<void> => {
        const total = await offlineRepository
          .roundsNotifications(database)
          .count();

        setTotalRoundsNotifications(total);
      };

      const loadTotalRoundsRequisitions = async (): Promise<void> => {
        const total = await offlineRepository
          .roundsRequisitions(database)
          .count();

        setTotalRoundsRequisitions(total);
      };

      const loadTotalRoundsMaterials = async (): Promise<void> => {
        const total = await offlineRepository.roundsMaterials(database).count();

        setTotalRoundsMaterials(total);
      };

      loadTotalOcurrences();
      loadTotalServicesOrders();
      loadTotalServicesOrdersMaterials();
      loadTotalRequisitions();
      loadTotalPointsIps();

      loadTotalRoundsNotifications();
      loadTotalRoundsRequisitions();
      loadTotalRoundsMaterials();
    }, [database]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: !loading,
    });
  }, [navigation, loading]);

  const sendNotificationsDatas = useCallback(async (): Promise<SendFeedbackProps> => {
    setLoadingMessage('Enviando dados de notificações..');

    const feedback = await syncSend.notificationsDatas(database);

    return feedback;
  }, [database]);

  const sendRoutesDatas = useCallback(async (): Promise<SendFeedbackProps> => {
    setLoadingMessage('Enviando dados da rota..');

    const feedback = await syncSend.routesDatas(database);

    return feedback;
  }, [database]);

  const sendRoundsDatas = useCallback(async (): Promise<SendFeedbackProps> => {
    setLoadingMessage('Enviando dados da ronda..');

    const feedback = await syncSend.roundsDatas(database);

    return feedback;
  }, [database]);

  const sendPointsIpsDatas = useCallback(async (): Promise<SendFeedbackProps> => {
    setLoadingMessage('Enviando dados do ponto ip..');

    const feedback = await syncSend.pointsIpsDatas(database);

    return feedback;
  }, [database]);

  const sendMappingsDatas = useCallback(async () => {
    setLoadingMessage('Enviando dados de mapeamento..');

    await syncSend.mappingsDatas(database);
  }, [database]);

  const sendAllDatas = useCallback(async () => {
    setLoading(true);

    const feedbackNotificationsDatas = await sendNotificationsDatas();
    const feedbackRoutesDatas = await sendRoutesDatas();
    const feedbackRoundsDatas = await sendRoundsDatas();
    const feedbackPointsIpsDatas = await sendPointsIpsDatas();
    await sendMappingsDatas();

    setLoading(false);
    setLoadingMessage('');

    navigation.navigate('SyncSendFeedback', {
      sendFeedbacks: [
        feedbackNotificationsDatas,
        feedbackRoutesDatas,
        feedbackRoundsDatas,
        feedbackPointsIpsDatas,
      ],
    });
  }, [
    navigation,
    sendNotificationsDatas,
    sendRoutesDatas,
    sendRoundsDatas,
    sendPointsIpsDatas,
    sendMappingsDatas,
  ]);

  const handleSendAllDatas = useCallback(async () => {
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
      'Tem certeza que deseja ENVIAR os dados?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: sendAllDatas,
        },
      ],
      { cancelable: false },
    );
  }, [sendAllDatas]);

  if (loading) {
    return <Loading text={loadingMessage} />;
  }

  return (
    <Container>
      <SyncActions>
        <SyncActionsText>Envio de dados</SyncActionsText>
        <SyncActionsButton onPress={handleSendAllDatas} disabled={loading}>
          <Feather
            name="upload"
            size={24}
            color={loading ? '#C4C4C4' : '#1163ad'}
          />
          <SyncActionsButtonText>Enviar todos</SyncActionsButtonText>
        </SyncActionsButton>
      </SyncActions>

      <SyncMainItems>
        <SyncMainItem>
          <SyncMainItemName>Notificação</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Notificações</SyncChildItemName>
              <SyncChildItemTotal>
                {totalOcurrences} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>
        <SyncMainItem>
          <SyncMainItemName>Rota</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Ordens de serviço</SyncChildItemName>
              <SyncChildItemTotal>
                {totalServicesOrders} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Materiais das O.S</SyncChildItemName>
              <SyncChildItemTotal>
                {totalServicesOrdersMaterials} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Requisição</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRequisitions} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>

        <SyncMainItem>
          <SyncMainItemName>Ronda</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Notificações</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRoundsNotifications} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>
            <SyncChildItem>
              <SyncChildItemName>Materiais das Notificações</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRoundsMaterials} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>

            <SyncChildItem>
              <SyncChildItemName>Requisição</SyncChildItemName>
              <SyncChildItemTotal>
                {totalRoundsRequisitions} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>

        <SyncMainItem>
          <SyncMainItemName>Ponto IP</SyncMainItemName>
          <SyncChildItems>
            <SyncChildItem>
              <SyncChildItemName>Pontos IPs</SyncChildItemName>
              <SyncChildItemTotal>
                {totalPointsIps} pendentes de envio
              </SyncChildItemTotal>
            </SyncChildItem>
          </SyncChildItems>
        </SyncMainItem>
      </SyncMainItems>
    </Container>
  );
};

export default Send;
