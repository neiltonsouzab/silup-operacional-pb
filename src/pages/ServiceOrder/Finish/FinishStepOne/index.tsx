import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import ServiceOrder from '../../../../database/model/ServiceOrder';
import offlineRepository from '../../../../services/offline';

import Loading from '../../../../components/Loading';
import InputDropdown from '../../../../components/InputDropdown';
import InputText from '../../../../components/InputText';
import InputImage from '../../../../components/InputImage';
import Button from '../../../../components/Button';

import {
  Container,
  OsHeader,
  OsNumber,
  OsAddress,
  OsDate,
  Content,
} from './styles';

interface DropdownProps {
  key: number;
  label: string;
}

type RouteParams = {
  id: string;
};

const FinishStepOne: React.FC = () => {
  const navigation = useNavigation();
  const routeParams = useRoute();
  const database = useDatabase();

  const { id } = routeParams.params as RouteParams;

  const [serviceOrder, setServiceOrder] = useState<ServiceOrder>();

  const [dropdownStatus] = useState<DropdownProps[]>([
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

  /* const [dropdwonMembers, setDropdwonMembers] = useState<DropdownProps[]>([]); */

  const [dropdwonSolutions, setDropdwonSolutions] = useState<DropdownProps[]>(
    [],
  );

  const [statusId, setStatusId] = useState<number>();
  /* const [memberId, setMemberId] = useState<number>(); */
  const [solutionId, setSolutionId] = useState<number>();
  const [pointsAmount, setPointsAmount] = useState<number>();
  const [obs, setObs] = useState<string>();
  const [imageName, setImageName] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      const loadServiceOrder = async (): Promise<void> => {
        const os = await offlineRepository
          .servicesOrders(database)
          .findById(id);

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
      /* loadMembers(); */
      loadSolutions();
    }, [database, id]),
  );

  if (!serviceOrder) {
    return <Loading text="Carregandos dados.." />;
  }

  const navigateToFinishServiceOrderStepTwo = (): void => {
    if (!statusId /* || !memberId */ || !solutionId /* || !pointsAmount */) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    navigation.navigate('ServiceOrderFinishStepTwo', {
      // memberId,
      solutionId,
      statusId,
      // pointsAmount,
      obs,
      serviceOrderId: serviceOrder.id,
      imageName,
    });
  };

  const finishServiceOrder = async (): Promise<void> => {
    /* Update service order */
    await database.action(async () => {
      await serviceOrder.update((os) =>
        Object.assign(os, {
          solutionId,
          // memberId,
          statusId,
          // pointsAmount,
          obsOs: obs,
          imageName,
        }),
      );
    });

    navigation.reset({
      routes: [{ name: 'ServiceOrderFinished' }],
      index: 0,
    });
  };

  const handleFinishServiceOrder = (): void => {
    Alert.alert(
      'Atenção',
      'Tem certeza que deseja CONCLUIR esta O.S?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: finishServiceOrder,
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Container enabled>
      <Content
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <OsHeader>
          <OsNumber>OS 00{serviceOrder.originalId}</OsNumber>
          <OsDate>{serviceOrder.getFormattedDate()}</OsDate>
          <OsAddress>{serviceOrder.address}</OsAddress>
        </OsHeader>

        <InputImage
          label="Toque para adicionar imagem à OS."
          onImageCapture={(image) => setImageName(image.name)}
        />

        <InputDropdown
          label="Status *"
          modalTitle="Selecione o status"
          data={dropdownStatus}
          selectedKey={statusId}
          onChange={(selected) => setStatusId(Number(selected.key))}
        />

        <InputDropdown
          label="Solução *"
          modalTitle="Selecione a solução"
          data={dropdwonSolutions}
          selectedKey={solutionId}
          onChange={(selected) => setSolutionId(Number(selected.key))}
        />

        {/* <InputDropdown
          label="Qtde Pontos *"
          modalTitle="Selecione a quantide de pontos"
          data={dropdownPointsAmount}
          selectedKey={pointsAmount}
          onChange={(selected) => setPointsAmount(Number(selected.key))}
        /> */}

        <InputText
          label="Observação"
          multiline
          onChangeText={(value) => setObs(value)}
        />
        {statusId === 7 || statusId === 8 ? (
          <Button label="CONCLUIR" onPress={handleFinishServiceOrder} />
        ) : (
          <Button
            label="PRÓXIMO"
            onPress={navigateToFinishServiceOrderStepTwo}
          />
        )}
      </Content>
    </Container>
  );
};

export default FinishStepOne;
