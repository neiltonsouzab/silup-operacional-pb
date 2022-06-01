import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import { Alert } from 'react-native';
import Loading from '../../../../components/Loading';
import offlineRepository from '../../../../services/offline';
import connection from '../../../../services/connection';
import api from '../../../../services/api';
import storage from '../../../../services/storage';

import ServiceOrder from '../../../../database/model/ServiceOrder';

import {
  Container,
  OsList,
  OsItem,
  OsItemNumber,
  OsItemStatus,
  OsSendButton,
  OsSendButtonText,
  OsItemDate,
  OsItemAddress,
  OsItemObsTitle,
  OsItemObs,
  OsListEmptyText,
  OsItemSequence,
  OsItemSequenceLabel,
  OsItemSequenceNumber,
} from './styles';

const serviceOrderStatus = {
  1: 'PENDENTE',
  2: 'EM ROTA',
  3: 'ATENDIDO',
  7: 'PENDENTE/IMPEDIMENTO',
  8: 'IMPOSSIBILIDADE/OUTROS',
  9: 'IMPOSSIBILIDADE/AUSÊNCIA DE BAIXA TENSÃO',
  10: 'IMPOSSIBILIDADE/DERIVAÇÃO DE REDE',
};

const List: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();

  const [servicesOrders, setServicesOrders] = useState<ServiceOrder[]>([]);
  const [loadingSendOs, setLoadingSendOs] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadServicesOrders = async (): Promise<void> => {
        const list = await offlineRepository
          .servicesOrders(database)
          .findNotSent();
        setServicesOrders(list);
      };

      loadServicesOrders();
    }, [database]),
  );

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

  const sendRequisition = useCallback(async () => {
    const requisitionRepository = offlineRepository.requisitions(database);

    const requisitions = await requisitionRepository.findAll();

    await Promise.all(
      requisitions.map(async (requisition): Promise<void> => {
        const response = await api.post(
          '/ordemservico/envio_salvar_materiais_requisicao_rota',
          {
            codigo_requisicao: requisition.requisitionId,
            codigo_produto: requisition.productId,
            quantidade_rota: requisition.routeAmount,
          },
        );

        const { status, mensagem } = response.data;

        if (!status) {
          throw new Error(mensagem);
        }
      }),
    );
  }, [database]);

  const sendMaterials = useCallback(
    async (serviceOrderId: number) => {
      const serviceOrderMaterialRepository =
        offlineRepository.servicesOrdersMaterials(database);

      const serviceOrderMaterials =
        await serviceOrderMaterialRepository.findByOs(serviceOrderId);

      await Promise.all(
        serviceOrderMaterials.map(async (material) => {
          const response = await api.post(
            '/ordemservico/envio_salvar_ocorrencia_material',
            {
              fk_rota: material.routeId,
              observacao: '',
              fk_ocorrenciasos: material.serviceOrderId,
              fk_produto: material.productId,
              qt: material.amount,
            },
          );

          const { status, mensagem } = response.data;

          if (!status) {
            throw Error(mensagem);
          }
        }),
      );
    },
    [database],
  );

  const sendServiceOrder = useCallback(
    async (serviceOrderId: number) => {
      const servicesOrdersRepository =
        offlineRepository.servicesOrders(database);

      const serviceOrder = await servicesOrdersRepository.findByOriginalId(
        serviceOrderId,
      );

      let imageUrl = null;

      if (serviceOrder.imageName) {
        imageUrl = await storage.uploadFile(serviceOrder.imageName);
      }

      const response = await api.post(
        '/ordemservico/envio_salvar_ocorrencia_os',
        {
          idOs: serviceOrder.originalId,
          data_fechamento: new Date(serviceOrder.updatedAt),
          fk_situacao_ocorrencia: serviceOrder.statusId,
          fk_solucao: serviceOrder.solutionId,
          observacao: serviceOrder.obs,
          observacao_os: serviceOrder.obsOs,
          url_imagem_conclusao_os: imageUrl,
          enviar_os: 1,
          // qtd_pontos: serviceOrder.pointsAmount,
          // fk_usuario_eletricista: serviceOrder.memberId,
        },
      );

      const { status, mensagem } = response.data;

      if (!status) {
        throw new Error(mensagem);
      }

      /* Update service order */
      await database.action(async () => {
        await serviceOrder.update((os) =>
          Object.assign(os, {
            sent: 1,
          }),
        );
      });
    },
    [database],
  );

  const sendDatas = useCallback(
    async (serviceOrderId: number): Promise<void> => {
      try {
        setLoadingSendOs(true);

        await sendServiceOrder(serviceOrderId);
        await sendMaterials(serviceOrderId);
        await sendRequisition();

        const list = await offlineRepository
          .servicesOrders(database)
          .findNotSent();
        setServicesOrders(list);

        Alert.alert('Deu tudo certo!', 'A OS foi enviada com sucesso.');
      } catch (error) {
        Alert.alert('Algo de errado aconteceu', error.message);
      } finally {
        setLoadingSendOs(false);
      }
    },
    [sendServiceOrder, sendMaterials, sendRequisition, database],
  );

  const handleSendServiceOrder = useCallback(
    async (serviceOrderid: number) => {
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
        'Tem certeza que deseja ENVIAR esta O.S?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => sendDatas(serviceOrderid),
          },
        ],
        { cancelable: false },
      );
    },
    [sendDatas],
  );

  if (loadingSendOs) {
    return <Loading text="ENVIANDO O.S..." />;
  }

  return (
    <Container>
      {servicesOrders.length > 0 ? (
        <OsList
          data={servicesOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item: os, index }) => (
            <OsItem onPress={() => handleNavigateToOsDetails(os)}>
              <OsItemNumber>OS 00{os.originalId}</OsItemNumber>
              <OsItemStatus status={os.statusId}>
                {serviceOrderStatus[os.statusId]}
              </OsItemStatus>
              {/* {(os.statusId === 3 ||
                os.statusId === 7 ||
                os.statusId === 8) && (
                <OsSendButton
                  enabled={os.sent === 0}
                  onPress={() => handleSendServiceOrder(os.originalId)}
                >
                  <OsSendButtonText>
                    {os.sent ? 'OS JA ENVIADA' : 'ENVIAR OS'}
                  </OsSendButtonText>
                </OsSendButton>
              )} */}
              <OsItemDate>{os.getFormattedDate()}</OsItemDate>
              <OsItemAddress>{os.address}</OsItemAddress>
              {!!os.obs && <OsItemObs>{os.obs}</OsItemObs>}
              <OsItemSequenceNumber>{index + 1}º</OsItemSequenceNumber>
            </OsItem>
          )}
        />
      ) : (
        <OsListEmptyText>Nenhuma O.S encontrada.</OsListEmptyText>
      )}
    </Container>
  );
};

export default List;
