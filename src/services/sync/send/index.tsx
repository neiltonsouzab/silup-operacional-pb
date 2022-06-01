import { Database } from '@nozbe/watermelondb';
import { format } from 'date-fns';
import { AxiosError } from 'axios';

import PointIp from 'src/database/model/PointIp';
import Mapping from 'src/database/model/Mapping';
import Ocurrence from '../../../database/model/Ocurrence';
import ServiceOrder from '../../../database/model/ServiceOrder';
import ServiceOrderMaterial from '../../../database/model/ServiceOrderMaterial';
import RoundNotification from '../../../database/model/RoundNotification';
import RoundRequisition from '../../../database/model/RoundRequisition';
import RoundMaterial from '../../../database/model/RoundMaterial';

import offlineRepository from '../../offline';
import storage from '../../storage';
import geolocation from '../../geolocation';
import api from '../../api';

interface FeedbackProps {
  name: string;
  totalSuccess: number;
  totalError: number;
  errorMessages: string[];
}

export interface SendFeedbackProps {
  name: string;
  feedbacks: FeedbackProps[];
}

interface SendResponse {
  status: boolean;
  st: number;
  mensagem: string;
}

export default {
  notificationsDatas: async (
    database: Database,
  ): Promise<SendFeedbackProps> => {
    const feedback: FeedbackProps = {
      name: 'Notificações',
      totalError: 0,
      totalSuccess: 0,
      errorMessages: [],
    };

    const sendSuccess: Ocurrence[] = [];

    const ocurrenceRepository = offlineRepository.ocurrences(database);
    const ocurrences = await ocurrenceRepository.findAll();

    await Promise.all(
      ocurrences.map(async (ocurrence) => {
        try {
          let imageUrl =
            'https://firebasestorage.googleapis.com/v0/b/pimentabueno.appspot.com/o/photo10.jpg?alt=media&token=3fdaab97-0fd4-47d2-8590-eaf4749bfb40';
          if (ocurrence.imageName) {
            imageUrl = await storage.uploadFile(
              'ImagensOcorrenciasPendentes',
              ocurrence.imageName,
            );
          }

          let params = {
            observacao: ocurrence.obs,
            fk_tipo_ocorrencia: ocurrence.ocurrenceTypeId,
            url_imagem: imageUrl,
            latitude: ocurrence.latitude,
            longitude: ocurrence.longitude,
            endereco: ocurrence.address,
            bairro: ocurrence.district,
            cidade: ocurrence.city,
            uf: '',
            fk_ponto: ocurrence.pointId,
            numero_etiqueta: ocurrence.pointTag,
          };

          if (!ocurrence.address) {
            const googleAddress = await geolocation.getAddress(
              ocurrence.latitude,
              ocurrence.longitude,
            );

            params = {
              ...params,
              endereco: googleAddress.full_address,
              bairro: googleAddress.district,
              cidade: googleAddress.city,
              uf: googleAddress.state,
            };
          } else {
            params = {
              ...params,
              endereco: ocurrence.address,
              bairro: ocurrence.district,
              cidade: ocurrence.city,
              uf: 'RO',
            };
          }

          const { data: responseData } = await api.post<SendResponse>(
            '/notificacao/criar_notificacao',
            null,
            {
              params,
            },
          );

          console.log(responseData);

          const { status, mensagem } = responseData;

          if (!status) {
            throw new Error(mensagem);
          }

          ocurrence.prepareDestroyPermanently();
          sendSuccess.push(ocurrence);

          feedback.totalSuccess += 1;
        } catch (error) {
          feedback.totalError += 1;
          feedback.errorMessages.push(`Avisos: ${error.message}`);
        }
      }),
    );

    await ocurrenceRepository.batch(sendSuccess);

    return {
      name: 'Notificação',
      feedbacks: [feedback],
    };
  },
  routesDatas: async (database: Database): Promise<SendFeedbackProps> => {
    const feedbackServicesOrders: FeedbackProps = {
      name: 'Ordens de serviço',
      totalError: 0,
      totalSuccess: 0,
      errorMessages: [],
    };

    const feedbackServicesOrdersMaterials: FeedbackProps = {
      name: 'Materiais das O.S',
      totalError: 0,
      totalSuccess: 0,
      errorMessages: [],
    };

    const feedbackRequisitions: FeedbackProps = {
      name: 'Requisição',
      totalError: 0,
      totalSuccess: 0,
      errorMessages: [],
    };

    const sendServicesOrdersSuccess: ServiceOrder[] = [];
    const sendServicesOrdersMaterials: ServiceOrderMaterial[] = [];

    const serviceOrderRepository = offlineRepository.servicesOrders(database);
    const serviceOrderMaterialRepository = offlineRepository.servicesOrdersMaterials(
      database,
    );
    const requisitionRepository = offlineRepository.requisitions(database);

    const servicesOrders = await serviceOrderRepository.findFinished();
    const servicesOrdersMaterials = await serviceOrderMaterialRepository.findAll();
    const requisitions = await requisitionRepository.findAll();

    await Promise.all(
      servicesOrders.map(
        async (serviceOrder): Promise<void> => {
          try {
            let imageUrl =
              'https://firebasestorage.googleapis.com/v0/b/pimentabueno.appspot.com/o/photo10.jpg?alt=media&token=3fdaab97-0fd4-47d2-8590-eaf4749bfb40';

            if (serviceOrder.imageName) {
              imageUrl = await storage.uploadFile(
                'ImagensOcorrenciasConcluidas',
                serviceOrder.imageName,
              );
            }

            const { data: responseData } = await api.post<SendResponse>(
              '/ordemservico/envio_salvar_ocorrencia_os',
              null,
              {
                params: {
                  idOs: serviceOrder.originalId,
                  data_fechamento: new Date(serviceOrder.updatedAt),
                  fk_situacao_ocorrencia: serviceOrder.statusId,
                  fk_solucao: serviceOrder.solutionId,
                  observacao: serviceOrder.obs,
                  observacao_os: serviceOrder.obsOs,
                  enviar_os: serviceOrder.sent,
                  url_imagem_conclusao_os: imageUrl,
                  // qtd_pontos: serviceOrder.pointsAmount,
                  // fk_usuario_eletricista: serviceOrder.memberId,
                },
              },
            );

            const { status, mensagem } = responseData;

            if (!status) {
              throw Error(mensagem);
            }

            serviceOrder.prepareDestroyPermanently();
            sendServicesOrdersSuccess.push(serviceOrder);
            feedbackServicesOrders.totalSuccess += 1;
          } catch (error) {
            feedbackServicesOrders.totalError += 1;
            feedbackServicesOrders.errorMessages.push(
              `Avisos: ${error.message}`,
            );
          }
        },
      ),
    );

    await Promise.all(
      servicesOrdersMaterials.map(
        async (serviceOrderMaterial): Promise<void> => {
          try {
            const { data: responseData } = await api.post<SendResponse>(
              '/ordemservico/envio_salvar_ocorrencia_material',
              null,
              {
                params: {
                  fk_rota: serviceOrderMaterial.routeId,
                  observacao: '',
                  fk_ocorrenciasos: serviceOrderMaterial.serviceOrderId,
                  fk_produto: serviceOrderMaterial.productId,
                  qt: serviceOrderMaterial.amount,
                },
              },
            );

            const { status, mensagem } = responseData;

            if (!status) {
              throw Error(mensagem);
            }

            serviceOrderMaterial.prepareDestroyPermanently();
            sendServicesOrdersMaterials.push(serviceOrderMaterial);
            feedbackServicesOrdersMaterials.totalSuccess += 1;
          } catch (error) {
            feedbackServicesOrdersMaterials.totalError += 1;
            feedbackServicesOrdersMaterials.errorMessages.push(
              `Avisos: ${error.message}`,
            );
          }
        },
      ),
    );

    await Promise.all(
      requisitions.map(
        async (requisition): Promise<void> => {
          try {
            const { data: responseData } = await api.post<SendResponse>(
              '/ordemservico/envio_salvar_materiais_requisicao_rota',
              null,
              {
                params: {
                  codigo_requisicao: requisition.requisitionId,
                  codigo_produto: requisition.productId,
                  quantidade_rota: requisition.routeAmount,
                },
              },
            );

            const { status, mensagem } = responseData;

            if (!status) {
              throw Error(mensagem);
            }

            feedbackRequisitions.totalSuccess += 1;
          } catch (error) {
            feedbackRequisitions.totalError += 1;
            feedbackRequisitions.errorMessages.push(`Avisos: ${error.message}`);
          }
        },
      ),
    );

    await serviceOrderRepository.batch(sendServicesOrdersSuccess);
    await serviceOrderMaterialRepository.batch(sendServicesOrdersMaterials);

    return {
      name: 'Rota',
      feedbacks: [
        feedbackServicesOrders,
        feedbackServicesOrdersMaterials,
        feedbackRequisitions,
      ],
    };
  },
  pointsIpsDatas: async (database: Database): Promise<SendFeedbackProps> => {
    const feedbackPointsIps: FeedbackProps = {
      name: 'Pontos IPs',
      totalSuccess: 0,
      totalError: 0,
      errorMessages: [],
    };

    const pointIpSendSucess: PointIp[] = [];

    const pointIpRepository = offlineRepository.pointsIps(database);
    const pointsIps = await pointIpRepository.findAll();
    await Promise.all(
      pointsIps.map(async (pointIp) => {
        try {
          let imageUrl =
            'https://firebasestorage.googleapis.com/v0/b/pimentabueno.appspot.com/o/photo10.jpg?alt=media&token=3fdaab97-0fd4-47d2-8590-eaf4749bfb40';
          if (pointIp.imageName) {
            imageUrl = await storage.uploadFile('Ponto', pointIp.imageName);
          }

          const address = await geolocation.getAddress(
            pointIp.latitude,
            pointIp.longitude,
          );

          const params = {
            etiqueta: pointIp.tag,
            qtd_luminaria: pointIp.lightFixtureAmount,
            observacao: pointIp.obs,
            url_imagem: imageUrl,
            latitude: pointIp.latitude,
            longitude: pointIp.longitude,
            endereco: address.full_address,
            bairro: address.district,
            cidade: address.city,
            uf: address.state,
            fk_ponto_poste: pointIp.postTypeId,
            fk_ponto_tipo_reator: pointIp.reactorTypeId,
            fk_ponto_potencia_reator: pointIp.reactorTypeId,
            fk_ponto_tipo_braco: pointIp.armTypeId,
            fk_ponto_tipo_luminaria: pointIp.lightFixtureTypeId,
            fk_ponto_tipo_lampada: pointIp.lampTypeId,
            fk_ponto_potencia_lampada: pointIp.lampPowerId,
            fk_ponto_perimetro: pointIp.perimeterTypeId,
            fk_logradouro: pointIp.placeTypeId,
          };

          const { data: responseData } = await api.post<SendResponse>(
            '/ponto/create_ponto',
            null,
            {
              params,
            },
          );

          const { status, mensagem } = responseData;

          if (!status) {
            throw new Error(mensagem);
          }

          pointIp.prepareDestroyPermanently();
          pointIpSendSucess.push(pointIp);

          feedbackPointsIps.totalSuccess += 1;
        } catch (error) {
          feedbackPointsIps.totalError += 1;
          feedbackPointsIps.errorMessages.push(`Avisos: ${error.message}`);
        }
      }),
    );

    await pointIpRepository.batch(pointIpSendSucess);

    return {
      name: 'Ponto IP',
      feedbacks: [feedbackPointsIps],
    };
  },
  mappingsDatas: async (database: Database): Promise<void> => {
    const mappingsSendSuccess: Mapping[] = [];

    const mappingRepository = offlineRepository.mappings(database);
    const mappings = await mappingRepository.findAll();
    await Promise.all(
      mappings.map(async (mapping) => {
        try {
          const response = await api.post(
            '/mapeamento/criar_mapeamento_rota',
            null,
            {
              params: {
                rota_map: mapping.routeId,
                latitude_rota: mapping.latitude,
                longitude: mapping.longitude,
                data_map: format(
                  new Date(mapping.createdAt),
                  'dd/MM/yyyy HH:mm:ss',
                ),
              },
            },
          );

          mapping.prepareDestroyPermanently();
          mappingsSendSuccess.push(mapping);
        } catch {
          // eslint-disabled-line
        }
      }),
    );

    await mappingRepository.batch(mappingsSendSuccess);
  },
  roundsDatas: async (database: Database): Promise<SendFeedbackProps> => {
    const feedbackRoundsNotifications: FeedbackProps = {
      name: 'Notificações ',
      totalError: 0,
      totalSuccess: 0,
      errorMessages: [],
    };

    /*
    const feedbackRoundsRequisitions: FeedbackProps = {
      name: 'Requisição - Material',
      totalError: 0,
      totalSuccess: 0,
      errorMessages: [],
    };

    const feedbackRoundsMaterials: FeedbackProps = {
      name: 'Materiais',
      totalError: 0,
      totalSuccess: 0,
      errorMessages: [],
    };
    */

    const sendRoundsNotificationsSuccess: RoundNotification[] = [];
    // const sendRoundsRequisitionsSuccess: RoundRequisition[] = [];
    // const sendRoundsMaterialsSuccess: RoundMaterial[] = [];

    const roundNotificationRepository = offlineRepository.roundsNotifications(
      database,
    );

    /*
    const roundRequisitionRepository = offlineRepository.roundsRequisitions(
      database,
    ); 
    const roundMaterialRepository = offlineRepository.roundsMaterials(database);
    */

    const roundsNotifications = await roundNotificationRepository.findAll();

    // const roundsRequisitions = await roundRequisitionRepository.findAll();
    // const roundsMaterials = await roundMaterialRepository.findAll();

    await Promise.all(
      roundsNotifications.map(async (roundNotification) => {
        try {
          const address = await geolocation.getAddress(
            roundNotification.latitude,
            roundNotification.longitude,
          );

          let imageUrl =
            'https://firebasestorage.googleapis.com/v0/b/pimentabueno.appspot.com/o/photo10.jpg?alt=media&token=3fdaab97-0fd4-47d2-8590-eaf4749bfb40';
          if (roundNotification.imageName) {
            imageUrl = await storage.uploadFile(
              'ImagensOcorrenciasPendentes',
              roundNotification.imageName,
            );
          }

          const params = {
            latitude: roundNotification.latitude,
            longitude: roundNotification.longitude,
            endereco: roundNotification.address || address.full_address,
            bairro: roundNotification.district || address.district,
            cidade: roundNotification.city || address.city,
            uf: address.state,
            fk_ponto: roundNotification.pointId,
            numero_etiqueta: roundNotification.pointTag,
            observacao: roundNotification.obs,
            url_imagem: imageUrl,
            fk_tipo_ocorrencia: roundNotification.notificationTypeId,
            fk_situacao_ocorrencia: roundNotification.notificationStatusId,
            fk_usuario_eletricista: roundNotification.memberId,
            fk_solucao: roundNotification.solutionId,
          };

          const { data: responseData } = await api.post<SendResponse>(
            '/ronda/criar_notificacao_os_ronda',
            null,
            {
              params,
            },
          );

          const { status, mensagem } = responseData;

          if (!status) {
            throw new Error(mensagem);
          }

          roundNotification.prepareDestroyPermanently();
          sendRoundsNotificationsSuccess.push(roundNotification);
          feedbackRoundsNotifications.totalSuccess += 1;
        } catch (error) {
          feedbackRoundsNotifications.totalError += 1;
          feedbackRoundsNotifications.errorMessages.push(
            `Avisos: ${error.message}`,
          );
        }
      }),
    );

    /*
    await Promise.all(
      roundsRequisitions.map(async (roundRequisition) => {
        try {
          const params = {
            codigo_requisicao: roundRequisition.requisitionId,
            codigo_produto: roundRequisition.productId,
            quantidade_ronda: roundRequisition.roundAmount,
          };

          const { data: responseData } = await api.post<SendResponse>(
            '/ronda/envio_salvar_materiais_requisicao_ronda',
            null,
            {
              params,
            },
          );

          const { status, mensagem } = responseData;

          if (!status) {
            throw new Error(mensagem);
          }

          feedbackRoundsRequisitions.totalSuccess += 1;
        } catch (error) {
          feedbackRoundsRequisitions.totalError += 1;
          feedbackRoundsRequisitions.errorMessages.push(String(error));
        }
      }),
    ); */

    /*
    await Promise.all(
      roundsMaterials.map(async (roundMaterial) => {
        try {
          const params = {
            fk_ronda: roundMaterial.roundId,
            fk_produto: roundMaterial.productId,
            qt: roundMaterial.amount,
          };

          const { data: responseData } = await api.post<SendResponse>(
            '/ronda/envio_salvar_ronda_material',
            null,
            {
              params,
            },
          );

          const { status, mensagem } = responseData;

          if (!status) {
            throw new Error(mensagem);
          }

          roundMaterial.prepareDestroyPermanently();
          sendRoundsMaterialsSuccess.push(roundMaterial);
          feedbackRoundsMaterials.totalSuccess += 1;
        } catch (error) {
          feedbackRoundsMaterials.totalError += 1;
          feedbackRoundsMaterials.errorMessages.push(String(error));
        }
      }),
    ); 
    */

    await roundNotificationRepository.batch(sendRoundsNotificationsSuccess);
    // await roundMaterialRepository.batch(sendRoundsMaterialsSuccess);

    return {
      name: 'Ronda',
      feedbacks: [feedbackRoundsNotifications],
    };
  },
};
