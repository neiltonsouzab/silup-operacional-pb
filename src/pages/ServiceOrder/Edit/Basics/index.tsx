import React, { useState, useCallback, useEffect } from 'react';
import {
  useFocusEffect,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import { Alert } from 'react-native';
import Requisition from 'src/database/model/Requisition';
import ServiceOrderMaterial from 'src/database/model/ServiceOrderMaterial';
import ServiceOrder from '../../../../database/model/ServiceOrder';
import offlineRepository from '../../../../services/offline';

import InputDropdown from '../../../../components/InputDropdown';
import InputText from '../../../../components/InputText';
import Loading from '../../../../components/Loading';

import { Container, Content } from './styles';

interface DropdownProps {
  key: number;
  label: string;
}

type RouteParams = {
  serviceOrderId: string;
};

const Basics: React.FC = () => {
  const routeParams = useRoute();
  const database = useDatabase();
  const navigation = useNavigation();

  const { serviceOrderId } = routeParams.params as RouteParams;

  const [serviceOrder, setServiceOrder] = useState<ServiceOrder>();

  const [dropdownStatus] = useState<DropdownProps[]>([
    {
      key: 2,
      label: 'NENHUM',
    },
    {
      key: 3,
      label: 'ATENDIDO',
    },
    {
      key: 7,
      label: 'PENDENTE/IMPEDIMENTO',
    },
    {
      key: 8,
      label: 'IMPOSSIBILIDADE/OUTROS',
    },
    {
      key: 9,
      label: 'IMPOSSIBILIDADE/AUSÊNCIA DE BAIXA TENSÃO',
    },
    {
      key: 10,
      label: 'IMPOSSIBILIDADE/DERIVAÇÃO DE REDE',
    },
  ]);

  /*
  const [dropdownPointsAmount] = useState<DropdownProps[]>([
    {
      key: 1,
      label: '1',
    },
    {
      key: 2,
      label: '2',
    },
    {
      key: 3,
      label: '3',
    },
    {
      key: 4,
      label: '4',
    },
    {
      key: 5,
      label: '5',
    },
    {
      key: 6,
      label: '6',
    },
    {
      key: 7,
      label: '7',
    },
    {
      key: 8,
      label: '8',
    },
    {
      key: 9,
      label: '9',
    },
    {
      key: 10,
      label: '10',
    },
    {
      key: 11,
      label: '11',
    },
    {
      key: 12,
      label: '12',
    },
    {
      key: 13,
      label: '13',
    },
    {
      key: 14,
      label: '14',
    },
    {
      key: 15,
      label: '15',
    },
    {
      key: 16,
      label: '16',
    },
    {
      key: 17,
      label: '17',
    },
    {
      key: 18,
      label: '18',
    },
    {
      key: 19,
      label: '19',
    },
    {
      key: 20,
      label: '20',
    },
  ]); */

  // const [dropdwonMembers, setDropdwonMembers] = useState<DropdownProps[]>([]);

  const [dropdwonSolutions, setDropdwonSolutions] = useState<DropdownProps[]>(
    [],
  );

  const [statusId, setStatusId] = useState<number>();
  const [memberId, setMemberId] = useState<number>();
  const [solutionId, setSolutionId] = useState<number>();
  // const [pointsAmount, setPointsAmount] = useState<number>();
  const [obs, setObs] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      const loadServiceOrder = async (): Promise<void> => {
        const os = await offlineRepository
          .servicesOrders(database)
          .findById(serviceOrderId);

        setStatusId(os.statusId);
        // setMemberId(os.memberId);
        setSolutionId(os.solutionId);
        // setPointsAmount(os.pointsAmount);
        setObs(os.obsOs);

        setServiceOrder(os);
      };

      /*
      const loadMembers = async (): Promise<void> => {
        const list = await offlineRepository.members(database).findAll();
        const membersList = list.map((member) => ({
          key: member.originalId,
          label: member.name,
        }));
        setDropdwonMembers(membersList);
      }; */

      const loadSolutions = async (): Promise<void> => {
        const list = await offlineRepository.solutions(database).findAll();
        const solutionsList = list.map((solution) => ({
          key: solution.originalId,
          label: solution.name,
        }));
        setDropdwonSolutions(solutionsList);
      };

      loadServiceOrder();
      // loadMembers();
      loadSolutions();
    }, [database, serviceOrderId]),
  );

  useEffect(() => {
    const saveServiceOrder = async (): Promise<void> => {
      if (serviceOrder) {
        await database.action(async () => {
          await serviceOrder.update((os) =>
            Object.assign(os, {
              solutionId,
              // memberId,
              statusId,
              // pointsAmount,
              obsOs: obs,
            }),
          );
        });
      }
    };

    saveServiceOrder();
  }, [
    database,
    serviceOrder,
    statusId,
    // memberId,
    solutionId,
    // pointsAmount,
    obs,
  ]);

  if (!serviceOrder) {
    return <Loading text="Carregando informações da O.S" />;
  }

  const handleRemoveMaterials = async (): Promise<void> => {
    const materialsRepository = offlineRepository.servicesOrdersMaterials(
      database,
    );

    const requisitionRepository = offlineRepository.requisitions(database);

    const materials = await materialsRepository.findByOs(
      serviceOrder.originalId,
    );

    const requisitionsUpdateds: Requisition[] = [];
    const materialsDestroyeds: ServiceOrderMaterial[] = [];

    await Promise.all(
      materials.map(async (material) => {
        const requisition = await requisitionRepository.findByMaterialId(
          material.productId,
        );

        const requisitionUpdated = requisition.prepareUpdate((req) =>
          Object.assign(req, {
            routeAmount: req.routeAmount - material.amount,
          }),
        );

        const materialDestroyed = material.prepareDestroyPermanently();

        requisitionsUpdateds.push(requisitionUpdated);
        materialsDestroyeds.push(materialDestroyed);
      }),
    );

    await database.action(async () => {
      await database.batch(...requisitionsUpdateds);
    });

    await database.action(async () => {
      await database.batch(...materialsDestroyeds);
    });

    Alert.alert('Atenção', 'Todos os materiais foram excluídos.');
  };

  const handleChangeStatusId = (id: number): void => {
    if (id === 2 || id === 7 || id === 8 || id === 9 || id === 10) {
      Alert.alert(
        'Atenção',
        'Ao escolher esse status. Todos os materiais adicionados serão removidos. Deseja continuar?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => {
              setStatusId(id);
              handleRemoveMaterials();
            },
          },
        ],
        { cancelable: true },
      );
    } else {
      setStatusId(id);
    }
  };

  return (
    <Container>
      <Content>
        <InputDropdown
          label="Status *"
          modalTitle="Selecione o status"
          data={dropdownStatus}
          selectedKey={statusId}
          onChange={(selected) => handleChangeStatusId(Number(selected.key))}
          disabled={!!serviceOrder.sent}
        />

        {/* <InputDropdown
          label="Membro *"
          modalTitle="Selecione o membro"
          data={dropdwonMembers}
          selectedKey={memberId}
          onChange={(selected) => setMemberId(Number(selected.key))}
          disabled={!!serviceOrder.sent}
        /> */}

        <InputDropdown
          label="Solução *"
          modalTitle="Selecione a solução"
          data={dropdwonSolutions}
          selectedKey={solutionId}
          onChange={(selected) => setSolutionId(Number(selected.key))}
          disabled={!!serviceOrder.sent}
        />

        {/* <InputDropdown
          label="Qtde Pontos *"
          modalTitle="Selecione a quantide de pontos"
          data={dropdownPointsAmount}
          selectedKey={pointsAmount}
          onChange={(selected) => setPointsAmount(Number(selected.key))}
          disabled={!!serviceOrder.sent}
        /> */}

        <InputText
          label="Observação"
          multiline
          defaultValue={obs}
          onChangeText={(value) => setObs(value)}
          editable={serviceOrder.sent !== 1}
        />
      </Content>
    </Container>
  );
};

export default Basics;
