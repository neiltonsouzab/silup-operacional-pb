import { Database } from '@nozbe/watermelondb';

import api from '../../api';
import offlineRepository from '../../offline';

export interface ReceiveFeedbackProps {
  name: string;
  feedbacks: {
    name: string;
    total: number;
  }[];
  errorMessages: string[];
}

interface OcurrenceTypeResponse {
  status: boolean;
  st: number;
  mensagem: string;
  data: {
    id: number;
    nometipoocorrencia: string;
  }[];
}

interface SolutionResponse {
  status: boolean;
  st: number;
  mensagem: string;
  data: {
    id: number;
    nomesolucao: string;
  }[];
}

interface RouteResponse {
  status: boolean;
  st: number;
  mensagem: string;
  data: {
    numero_rota: number;
    nomeequipe: string;
    observacao: string;
    data_criacao: string;
    nomesituacao: string;
  };
  ocorenciasos: {
    idOs: number;
    fk_situacao_ocorrencia: number;
    endereco: string;
    latitude: number;
    longitude: number;
    url_imagem: string;
    data_geracao: string;
    nometipoocorrencia: string;
    nomeorigemocorrencia: string;
    // fk_usuario_eletricista: number;
    observacao: string;
    observacao_os: string;
    enviar_os: number;
    // qtd_pontos: number;
    nomereclamante: string;
    telefone_celular1: string;
    url_imagem_conclusao_os: string;
  }[];
}

interface MemberResponse {
  status: boolean;
  st: number;
  mensagem: string;
  data: {
    id: number;
    nome: string;
  }[];
}

interface RequisitionResponse {
  status: boolean;
  st: number;
  mensagem: string;
  data: {
    id: number;
    codigo_requisicao: number;
    codigo_produto: number;
    nomeproduto: string;
    quantidade_requisicao: number;
    quantidade_rota: number;
  }[];
}

interface PointIpDataResponse {
  status: boolean;
  st: number;
  mensagem: string;
  fk_ponto_poste: {
    id: number;
    nomepontoposte: string;
  }[];
  fk_ponto_tipo_reator: {
    id: number;
    nometiporeator: string;
  }[];
  fk_ponto_potencia_reator: {
    id: number;
    nomepotenciareator: number;
  }[];
  fk_ponto_tipo_braco: {
    id: number;
    nometipobraco: string;
  }[];
  fk_ponto_tipo_luminaria: {
    id: number;
    nometipoluminaria: string;
  }[];
  fk_ponto_tipo_lampada: {
    id: number;
    nometipolampada: string;
  }[];
  fk_ponto_potencia_lampada: {
    id: number;
    nomepotencialampada: number;
  }[];
  fk_ponto_perimetro: {
    id: number;
    nomeperimetro: string;
  }[];
  fk_logradouro: {
    id: number;
    nomelogradouro: string;
  }[];
}

interface RoundDataResponse {
  status: boolean;
  st: number;
  mensagem: string;
  dados_ronda: {
    codigo_ronda: number;
    nomesituacao: string;
    nomeequipe: string;
    observacao: string;
    nomeveiculo: string;
  };
  itens_ronda: {
    id: number;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    fk_situacao: number;
    fk_ronda: number;
  }[];
}

interface RoundRequisitionResponse {
  status: boolean;
  st: number;
  mensagem: string;
  data: {
    id: number;
    codigo_requisicao: number;
    codigo_produto: number;
    nomeproduto: string;
    quantidade_requisicao: number;
    quantide_ronda: number;
  }[];
}

interface RequisitionCompletedResponse {
  status: boolean;
  st: number;
  mensagem: string;
  data: Array<{
    id: number;
    fk_rota: number;
    created_at: Date;
    data_conclusao: Date;
    pega_itens_requisicao: Array<{
      fk_saida_requisicao: number;
      quantidade_original: number;
      quantidade_rota: number;
      quantidade: number;
      nome_produto: {
        id: number;
        nomeproduto: string;
      };
    }>;
  }>;
}

export default {
  notificationsDatas: async (
    database: Database,
  ): Promise<ReceiveFeedbackProps> => {
    let notificationDataFeedback: ReceiveFeedbackProps = {
      name: 'Notificação',
      feedbacks: [],
      errorMessages: [],
    };

    const ocurrenceTypeRepository = offlineRepository.ocurrencesTypes(database);
    await ocurrenceTypeRepository.deleteAll();

    try {
      const {
        data: ocurrrenceTypeResponseData,
      } = await api.get<OcurrenceTypeResponse>(
        '/notificacao/listagem_dados_form',
      );

      const { data, status, mensagem } = ocurrrenceTypeResponseData;

      if (!status) {
        throw new Error(mensagem);
      }

      const ocurrencesTypesCreateds = data.map((ocurrenceType) => {
        return ocurrenceTypeRepository.prepareCreate({
          originalId: ocurrenceType.id,
          name: ocurrenceType.nometipoocorrencia,
        });
      });

      await ocurrenceTypeRepository.batch(ocurrencesTypesCreateds);

      notificationDataFeedback.feedbacks.push({
        name: 'Tipos de ocorrências',
        total: ocurrencesTypesCreateds.length,
      });
    } catch (error) {
      notificationDataFeedback = {
        ...notificationDataFeedback,
        errorMessages: [
          ...notificationDataFeedback.errorMessages,
          `Avisos: ${error.message}`,
        ],
      };
    }

    return notificationDataFeedback;
  },
  routesDatas: async (database: Database): Promise<ReceiveFeedbackProps> => {
    const routesDataFeedback: ReceiveFeedbackProps = {
      name: 'Rota',
      feedbacks: [],
      errorMessages: [],
    };

    const solutionRepository = offlineRepository.solutions(database);
    const routeRepository = offlineRepository.routes(database);
    const serviceOrderRepository = offlineRepository.servicesOrders(database);
    const memberRespository = offlineRepository.members(database);
    const requisitionRepository = offlineRepository.requisitions(database);
    const serviceOrderMaterialRepository = offlineRepository.servicesOrdersMaterials(
      database,
    );
    const requisitionCompletedRepository = offlineRepository.requisitionsCompleted(
      database,
    );
    const requisitionCompletedItemsRepository = offlineRepository.requisitionsCompletedItems(
      database,
    );

    /* ----- begin receive Route and OS's and Members ---- */
    try {
      await routeRepository.deleteAll();
      await serviceOrderRepository.deleteAll();
      await memberRespository.deleteAll();

      /* Route */
      const { data: routeResponseData } = await api.get<RouteResponse>(
        '/rota/rota_aberta',
      );

      const {
        data: routeData,
        ocorenciasos: serviceOrderData,
        status: statusRouteRequest,
        mensagem: messageRouteRequest,
      } = routeResponseData;

      if (!statusRouteRequest) {
        throw new Error(messageRouteRequest);
      }

      await routeRepository.create({
        originalId: routeData.numero_rota,
        teamName: routeData.nomeequipe,
        date: routeData.data_criacao,
        obs: routeData.observacao,
        statusDescription: routeData.nomesituacao,
      });

      routesDataFeedback.feedbacks.push({
        name: 'Rota',
        total: 1,
      });

      /* OS */
      const servicesOrdersCreateds = serviceOrderData.map((os) => {
        return serviceOrderRepository.prepareCreate({
          originalId: os.idOs,
          statusId: os.fk_situacao_ocorrencia,
          // memberId: os.fk_usuario_eletricista,
          ocurrenceOriginDescription: os.nomeorigemocorrencia,
          ocurrenceTypeDescription: os.nometipoocorrencia,
          latitude: os.latitude,
          longitude: os.longitude,
          address: os.endereco,
          imageUrl: os.url_imagem,
          date: os.data_geracao,
          obs: os.observacao,
          obs_os: os.observacao_os,
          sent: os.enviar_os,
          protestant: os.nomereclamante,
          protestantPhone: os.telefone_celular1,
          imageName: os.url_imagem_conclusao_os,
          // points_amount: os.qtd_pontos,
        });
      });

      await serviceOrderRepository.batch(servicesOrdersCreateds);

      routesDataFeedback.feedbacks.push({
        name: 'Ordens de serviço',
        total: servicesOrdersCreateds.length,
      });

      /* Members */
      const { data: memberResponseData } = await api.get<MemberResponse>(
        '/rota/lista_membros_equipe',
        {
          params: {
            id_rota: routeData.numero_rota,
          },
        },
      );

      const {
        data: memberData,
        status: statusMemberRequest,
        mensagem: messageMemberRequest,
      } = memberResponseData;

      if (!statusMemberRequest) {
        throw new Error(messageMemberRequest);
      }

      const membersNotNull = memberData.filter((member) => member !== null);
      const membersCreateds = membersNotNull.map((member) => {
        return memberRespository.prepareCreate({
          originalId: member.id,
          name: member.nome,
        });
      });

      await memberRespository.batch(membersCreateds);

      routesDataFeedback.feedbacks.push({
        name: 'Membros',
        total: membersCreateds.length,
      });
    } catch (error) {
      routesDataFeedback.errorMessages.push(`Avisos: ${error.message}`);
    }
    /* ----- end receive Route, OS's, Members ---- */

    /* ----- begin receive Requisition ---- */
    try {
      await requisitionRepository.deleteAll();
      await serviceOrderMaterialRepository.deleteAll();

      const {
        data: requisitionResponseData,
      } = await api.get<RequisitionResponse>(
        '/ordemservico/lista_materiais_requisicao',
      );

      const {
        data: requisitionData,
        status: statusRequisitionRequest,
        mensagem: messageRequisitionRequest,
      } = requisitionResponseData;

      if (!statusRequisitionRequest) {
        throw new Error(messageRequisitionRequest);
      }

      const requisitionsCreateds = requisitionData.map((requisition) => {
        return requisitionRepository.prepareCreate({
          originalId: requisition.id,
          requisitionId: requisition.codigo_requisicao,
          productId: requisition.codigo_produto,
          productName: requisition.nomeproduto,
          requisitionAmount: requisition.quantidade_requisicao,
          routeAmount: requisition.quantidade_rota,
        });
      });

      await requisitionRepository.batch(requisitionsCreateds);
      routesDataFeedback.feedbacks.push({
        name: 'Requisição - Materiais',
        total: requisitionsCreateds.length,
      });
    } catch (error) {
      routesDataFeedback.errorMessages.push(`Avisos: ${error.message}`);
    }
    /* ----- end receive Requisition ---- */

    /* ----- begin receive Requisition Completed ---- */
    try {
      await requisitionCompletedRepository.deleteAll();
      await requisitionCompletedItemsRepository.deleteAll();

      const {
        data: requisitionCompletedResponseData,
      } = await api.get<RequisitionCompletedResponse>(
        '/ordemservico/lista_requisicao_concluidas_materiais',
      );

      const {
        data: requisitionCompletedData,
        status: requisitionCompletedStatus,
        mensagem: requisitionCompletedMensagem,
      } = requisitionCompletedResponseData;

      if (requisitionCompletedMensagem !== 'Sucesso') {
        throw new Error(requisitionCompletedMensagem);
      }

      const requisitionsCompletedCreateds = requisitionCompletedData.map(
        (requisitionComleted) => {
          return requisitionCompletedRepository.prepareCreate({
            originalId: requisitionComleted.id,
            routeId: requisitionComleted.fk_rota,
            openDate: requisitionComleted.created_at,
            closedDate: requisitionComleted.data_conclusao,
          });
        },
      );

      const requisitionsCompletedItemsCreateds = requisitionCompletedData
        .map((req) => req.pega_itens_requisicao)
        .flat()
        .map((requisitionCompletedItem) => {
          return requisitionCompletedItemsRepository.prepareCreate({
            requisitionCompletedId:
              requisitionCompletedItem.fk_saida_requisicao,
            productId: requisitionCompletedItem.nome_produto.id,
            productName: requisitionCompletedItem.nome_produto.nomeproduto,
            originalQuantity: requisitionCompletedItem.quantidade_original,
            routeQuantity: requisitionCompletedItem.quantidade_rota,
            quantity: requisitionCompletedItem.quantidade,
          });
        });

      await requisitionCompletedRepository.batch(requisitionsCompletedCreateds);
      await requisitionCompletedItemsRepository.batch(
        requisitionsCompletedItemsCreateds,
      );

      routesDataFeedback.feedbacks.push({
        name: 'Requisições Concluídas',
        total: requisitionsCompletedCreateds.length,
      });
    } catch (error) {
      routesDataFeedback.errorMessages.push(`Avisos: ${error.message}`);
    }

    /* ----- begin receive Solutions ---- */
    try {
      await solutionRepository.deleteAll();

      const { data: solutionResponseData } = await api.get<SolutionResponse>(
        'ordemservico/lista_dados_form_os_solucao',
      );

      const {
        data: solutionData,
        status: statusSolutionRequest,
        mensagem: messageSolutionRequest,
      } = solutionResponseData;

      if (!statusSolutionRequest) {
        throw new Error(messageSolutionRequest);
      }

      const solutionsCreateds = solutionData.map((solution) => {
        return solutionRepository.prepareCreate({
          originalId: solution.id,
          name: solution.nomesolucao,
        });
      });
      await solutionRepository.batch(solutionsCreateds);
      routesDataFeedback.feedbacks.push({
        name: 'Soluções de O.S',
        total: solutionsCreateds.length,
      });
    } catch (error) {
      routesDataFeedback.errorMessages.push(`Avisos: ${error.message}`);
    }
    /* ----- end receive Solutions ---- */

    return routesDataFeedback;
  },
  pointsIpsDatas: async (database: Database): Promise<ReceiveFeedbackProps> => {
    const pointIpDataFeedaback: ReceiveFeedbackProps = {
      name: 'Ponto IP',
      feedbacks: [],
      errorMessages: [],
    };

    const postTypeRepository = offlineRepository.postsTypes(database);
    const reactorTypeRepository = offlineRepository.reactorsTypes(database);
    const reactorPowerRepository = offlineRepository.reactorsPowers(database);
    const armTypeRepository = offlineRepository.armsTypes(database);
    const lightFixtureTypeRepository = offlineRepository.lightsFixturesTypes(
      database,
    );
    const lampTypeRepository = offlineRepository.lampsTypes(database);
    const lampPowerRepository = offlineRepository.lampsPowers(database);
    const perimeterTypeRepository = offlineRepository.perimetersTypes(database);
    const placeTypeRepository = offlineRepository.placesTypes(database);

    try {
      await postTypeRepository.deleteAll();
      await reactorTypeRepository.deleteAll();
      await reactorPowerRepository.deleteAll();
      await armTypeRepository.deleteAll();
      await lightFixtureTypeRepository.deleteAll();
      await lampTypeRepository.deleteAll();
      await lampPowerRepository.deleteAll();
      await perimeterTypeRepository.deleteAll();
      await placeTypeRepository.deleteAll();

      const { data: pointIpResponseData } = await api.get<PointIpDataResponse>(
        '/ponto/ponto_listagem_dados_form',
      );

      const postsTypesData = pointIpResponseData.fk_ponto_poste;
      const postsTypesCreateds = postsTypesData.map((postType) => {
        return postTypeRepository.prepareCreate({
          originalId: postType.id,
          name: postType.nomepontoposte,
        });
      });

      const reactorsTypesData = pointIpResponseData.fk_ponto_tipo_reator;
      const reactorsTypesCreateds = reactorsTypesData.map((reactorType) => {
        return reactorTypeRepository.prepareCreate({
          originalId: reactorType.id,
          name: reactorType.nometiporeator,
        });
      });

      const reactorsPowersData = pointIpResponseData.fk_ponto_potencia_reator;
      const reactorsPowersCreateds = reactorsPowersData.map((reactorPower) => {
        return reactorPowerRepository.prepareCreate({
          originalId: reactorPower.id,
          name: reactorPower.nomepotenciareator.toString(),
        });
      });

      const armsTypesData = pointIpResponseData.fk_ponto_tipo_braco;
      const armsTypesCreateds = armsTypesData.map((armType) => {
        return armTypeRepository.prepareCreate({
          originalId: armType.id,
          name: armType.nometipobraco,
        });
      });

      const lightsFixturesTypesData =
        pointIpResponseData.fk_ponto_tipo_luminaria;
      const lightsFixturesTypesCreateds = lightsFixturesTypesData.map(
        (lightFixtureType) => {
          return lightFixtureTypeRepository.prepareCreate({
            originalId: lightFixtureType.id,
            name: lightFixtureType.nometipoluminaria,
          });
        },
      );

      const lampsTypesData = pointIpResponseData.fk_ponto_tipo_lampada;
      const lampsTypesCreateds = lampsTypesData.map((lampType) => {
        return lampTypeRepository.prepareCreate({
          originalId: lampType.id,
          name: lampType.nometipolampada,
        });
      });

      const lampsPowersData = pointIpResponseData.fk_ponto_potencia_lampada;
      const lampsPowersCreateds = lampsPowersData.map((lampPower) => {
        return lampPowerRepository.prepareCreate({
          originalId: lampPower.id,
          name: lampPower.nomepotencialampada.toString(),
        });
      });

      const perimetersTypesData = pointIpResponseData.fk_ponto_perimetro;
      const perimetersTypesCreateds = perimetersTypesData.map(
        (perimeterType) => {
          return perimeterTypeRepository.prepareCreate({
            originalId: perimeterType.id,
            name: perimeterType.nomeperimetro,
          });
        },
      );

      const placesTypesData = pointIpResponseData.fk_logradouro;
      const placesTypesCreateds = placesTypesData.map((placeType) => {
        return placeTypeRepository.prepareCreate({
          originalId: placeType.id,
          name: placeType.nomelogradouro,
        });
      });

      await postTypeRepository.batch(postsTypesCreateds);
      await reactorTypeRepository.batch(reactorsTypesCreateds);
      await reactorPowerRepository.batch(reactorsPowersCreateds);
      await armTypeRepository.batch(armsTypesCreateds);
      await lightFixtureTypeRepository.batch(lightsFixturesTypesCreateds);
      await lampTypeRepository.batch(lampsTypesCreateds);
      await lampTypeRepository.batch(lampsPowersCreateds);
      await perimeterTypeRepository.batch(perimetersTypesCreateds);
      await placeTypeRepository.batch(placesTypesCreateds);

      pointIpDataFeedaback.feedbacks.push({
        name: 'Tipos de postes',
        total: postsTypesCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Tipos de reatores',
        total: reactorsTypesCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Potências de reatores',
        total: reactorsPowersCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Tipos de braços',
        total: armsTypesCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Tipos de luminárias',
        total: lightsFixturesTypesCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Tipos de lâmpadas',
        total: lampsTypesCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Potências de lâmpadas',
        total: lampsPowersCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Tipos de perímetros',
        total: perimetersTypesCreateds.length,
      });

      pointIpDataFeedaback.feedbacks.push({
        name: 'Tipos de logradouros',
        total: placesTypesCreateds.length,
      });
    } catch (error) {
      pointIpDataFeedaback.errorMessages.push(`Avisos: ${error.message}`);
    }

    return pointIpDataFeedaback;
  },
  roundsDatas: async (database: Database): Promise<ReceiveFeedbackProps> => {
    const roundDataFeedback: ReceiveFeedbackProps = {
      name: 'Ronda',
      feedbacks: [],
      errorMessages: [],
    };

    const roundRepository = offlineRepository.rounds(database);
    const roundAddressRepository = offlineRepository.roundsAddresses(database);
    const roundNotificationRepository = offlineRepository.roundsNotifications(
      database,
    );

    /*
    const roundRequisitionRepository = offlineRepository.roundsRequisitions(
      database,
    );
    const roundMaterialsRepository = offlineRepository.roundsMaterials(
      database,
    );
    */

    /* Clear Tables */
    await roundRepository.deleteAll();
    await roundAddressRepository.deleteAll();
    await roundNotificationRepository.deleteAll();
    // await roundMaterialsRepository.deleteAll();
    // await roundRequisitionRepository.deleteAll();

    try {
      /* Round */
      const roundResponse = await api.get<RoundDataResponse>(
        '/ronda/ronda_aberta',
      );

      const {
        dados_ronda: roundDataResponse,
        itens_ronda: roundAddressDataResponse,
        status: statusRoundResponse,
        mensagem: messageRoundResponse,
      } = roundResponse.data;

      if (!statusRoundResponse) {
        throw new Error(messageRoundResponse);
      }

      await roundRepository.create({
        originalId: roundDataResponse.codigo_ronda,
        obs: roundDataResponse.observacao,
        statusDescription: roundDataResponse.nomesituacao,
        vehicleName: roundDataResponse.nomeveiculo,
        teamName: roundDataResponse.nomeequipe,
      });

      roundDataFeedback.feedbacks.push({
        name: 'Ronda',
        total: 1,
      });

      /* Round Address */
      const roundAddressCreateds = roundAddressDataResponse.map(
        (roundAddress) =>
          roundAddressRepository.prepareCreate({
            originalId: roundAddress.id,
            address: roundAddress.endereco,
            roundId: roundAddress.fk_ronda,
            statusId: roundAddress.fk_situacao,
          }),
      );

      await roundAddressRepository.batch(roundAddressCreateds);

      roundDataFeedback.feedbacks.push({
        name: 'Endereços',
        total: roundAddressCreateds.length,
      });

      /* Requisitions */
      /*
      const roundRequisitionResponse = await api.get<RoundRequisitionResponse>(
        '/ronda/lista_materiais_requisicao_ronda',
      );

      const {
        status: statusRoundRequistionResponse,
        mensagem: messageRoundRequisitionResponse,
        data: roundRequistionDataResponse,
      } = roundRequisitionResponse.data;

      if (!statusRoundRequistionResponse) {
        throw new Error(messageRoundRequisitionResponse);
      }

      const roundRequisitionCreateds = roundRequistionDataResponse.map(
        (roundRequisition) =>
          roundRequisitionRepository.prepareCreate({
            originalId: roundRequisition.id,
            requisitionId: roundRequisition.codigo_requisicao,
            productId: roundRequisition.codigo_produto,
            productName: roundRequisition.nomeproduto,
            requisitionAmount: roundRequisition.quantidade_requisicao,
            roundAmount: roundRequisition.quantide_ronda,
          }),
      );
      await roundRequisitionRepository.batch(roundRequisitionCreateds);

      roundDataFeedback.feedbacks.push({
        name: 'Requisição - Materiais',
        total: roundRequisitionCreateds.length,
      });

      */
    } catch (error) {
      roundDataFeedback.errorMessages.push(`Avisos: ${error.message}`);
    }

    return roundDataFeedback;
  },
};
