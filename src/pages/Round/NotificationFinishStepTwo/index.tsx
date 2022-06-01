import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Feather } from '@expo/vector-icons';

import Round from '../../../database/model/Round';
import RoundNotification from '../../../database/model/RoundNotification';
import RoundRequisition from '../../../database/model/RoundRequisition';
import Member from '../../../database/model/Member';
import Solution from '../../../database/model/Solution';

import offlineRepository from '../../../services/offline';

import Loading from '../../../components/Loading';
import InputDropdown from '../../../components/InputDropdown';
import Button from '../../../components/Button';

import {
  Container,
  RoundHeader,
  RoundInfo,
  RoundInfoLabel,
  RoundInfoValue,
  RoundNotificationInfo,
  RoundNotificationInfoLabel,
  RoundNotificationInfoValue,
  MaterialsContainer,
  MaterialsText,
  MaterialsList,
  Material,
  MaterialName,
  MaterialAction,
  MaterialUpdateAmount,
  MaterialAmount,
  MaterialTrash,
  EmptyMaterialContainer,
  EmptyMaterialText,
} from './styles';

interface DropdownProps {
  key: number;
  label: string;
}

interface MaterialRoundNotificationProps {
  productId: number;
  productName: string;
  amount: number;
}

type RouteParams = {
  roundId: string;
  roundNotificationId: string;
  memberId: string;
  solutionId: string;
  obs: string;
};

const NotificationFinishStepTwo: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    roundId,
    roundNotificationId,
    memberId,
    solutionId,
    obs,
  } = route.params as RouteParams;

  const [round, setRound] = useState<Round>();
  const [roundNotification, setRoundNotification] = useState<
    RoundNotification
  >();
  const [member, setMember] = useState<Member>();
  const [solution, setSolution] = useState<Solution>();

  const [dropdwonMaterials, setDropdwonMaterials] = useState<DropdownProps[]>(
    [],
  );

  const [roundsRequisitions, setRoundsRequisitions] = useState<
    RoundRequisition[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [
    materialsOfRoundNotification,
    setMaterialsOfRoundNotification,
  ] = useState<MaterialRoundNotificationProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadRound = async (): Promise<void> => {
        const rnd = await offlineRepository.rounds(database).findById(roundId);
        setRound(rnd);
      };

      const loadRoundNotification = async (): Promise<void> => {
        const roundNotif = await offlineRepository
          .roundsNotifications(database)
          .findById(roundNotificationId);

        setRoundNotification(roundNotif);
      };

      const loadRoundRequisition = async (): Promise<void> => {
        const roundsReq = await offlineRepository
          .roundsRequisitions(database)
          .findAll();

        const materials = roundsReq.map((roundRequisition) => ({
          key: roundRequisition.productId,
          label: roundRequisition.productName,
        }));

        setDropdwonMaterials(materials);
        setRoundsRequisitions(roundsReq);
      };

      const loadMember = async (): Promise<void> => {
        const memb = await offlineRepository
          .members(database)
          .findById(memberId);
        setMember(memb);
      };

      const loadSolution = async (): Promise<void> => {
        const solut = await offlineRepository
          .solutions(database)
          .findById(solutionId);
        setSolution(solut);
      };

      loadRound();
      loadRoundNotification();
      loadRoundRequisition();
      loadMember();
      loadSolution();
    }, [database, roundId, roundNotificationId, memberId, solutionId]),
  );

  const getAmountAvaiable = useCallback(
    (productId: number): number => {
      const productRequisiton = roundsRequisitions.find(
        (item) => item.productId === productId,
      );

      if (!productRequisiton) {
        return 0;
      }

      const amountAvaiable =
        productRequisiton.requisitionAmount - productRequisiton.roundAmount;

      return amountAvaiable;
    },
    [roundsRequisitions],
  );

  const handleAddMaterial = useCallback(
    (productId: number, productName: string) => {
      const materialExist = materialsOfRoundNotification.find(
        (item) => item.productId === productId,
      );

      if (materialExist) {
        return;
      }

      const amountAvaiable = getAmountAvaiable(productId);

      if (amountAvaiable < 1) {
        Alert.alert(
          'Saldo insuficiente',
          `Quantidade disponível: ${amountAvaiable}`,
        );
        return;
      }

      setMaterialsOfRoundNotification([
        ...materialsOfRoundNotification,
        {
          productId,
          productName,
          amount: 1,
        },
      ]);
    },
    [materialsOfRoundNotification, getAmountAvaiable],
  );

  const handlePlusAmount = useCallback(
    (productId: number, amount: number) => {
      const amountAvaiable = getAmountAvaiable(productId);

      if (amount > amountAvaiable) {
        Alert.alert(
          'Saldo insuficiente',
          `Quantidade disponível: ${amountAvaiable}`,
        );
        return;
      }

      const materialsModifieds = materialsOfRoundNotification.map(
        (material) => {
          if (material.productId === productId) {
            return {
              ...material,
              amount,
            };
          }

          return material;
        },
      );

      setMaterialsOfRoundNotification(materialsModifieds);
    },
    [getAmountAvaiable, materialsOfRoundNotification],
  );

  const handleMinusAmount = useCallback(
    (productId: number) => {
      const materialsModifieds = materialsOfRoundNotification.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            amount: item.amount === 1 ? item.amount : item.amount - 1,
          };
        }

        return item;
      });

      setMaterialsOfRoundNotification(materialsModifieds);
    },
    [materialsOfRoundNotification],
  );

  const handleRemoveMaterial = useCallback(
    (productId: number) => {
      const materialsModified = materialsOfRoundNotification.filter(
        (item) => item.productId !== productId,
      );

      setMaterialsOfRoundNotification(materialsModified);
    },
    [materialsOfRoundNotification],
  );

  if (!round || !roundNotification || !member || !solution) {
    return <Loading text="Carregando informações..." />;
  }

  const handleFinishRoundNotificaiton = async (): Promise<void> => {
    setLoading(true);

    /* Update Round Requisition */
    const requisitionsUpdateds: RoundRequisition[] = [];
    roundsRequisitions.forEach((req) => {
      materialsOfRoundNotification.forEach((material) => {
        if (req.productId === material.productId) {
          req.prepareUpdate((r) =>
            Object.assign(r, {
              roundAmount: r.roundAmount + material.amount,
            }),
          );

          requisitionsUpdateds.push(req);
        }
      });
    });

    await offlineRepository
      .roundsRequisitions(database)
      .batch(requisitionsUpdateds);

    /* Create Round Material */
    const roundNotificationMaterialsCreateds = materialsOfRoundNotification.map(
      (material) => {
        return offlineRepository.roundsMaterials(database).prepareCreate({
          roundId: round.originalId,
          productId: material.productId,
          amount: material.amount,
        });
      },
    );

    await offlineRepository
      .roundsMaterials(database)
      .batch(roundNotificationMaterialsCreateds);

    /* Update Round Notification */
    await database.action(async () => {
      await roundNotification.update((rn) =>
        Object.assign(rn, {
          notificationStatusId: 3,
          solutionId: solution.originalId,
          memberId: member.originalId,
          obs,
        }),
      );
    });

    setLoading(false);

    navigation.reset({
      routes: [{ name: 'RoundNotificationFinished' }],
      index: 0,
    });
  };

  return (
    <Container
      contentContainerStyle={{
        flexGrow: 1,
      }}
      nestedScrollEnabled
    >
      <RoundHeader>
        <RoundInfo>
          <RoundInfoLabel>RONDA</RoundInfoLabel>
          <RoundInfoValue>00{round.originalId}</RoundInfoValue>
        </RoundInfo>

        <RoundInfo>
          <RoundInfoLabel>EQUIPE</RoundInfoLabel>
          <RoundInfoValue>{round.teamName}</RoundInfoValue>
        </RoundInfo>

        <RoundInfo>
          <RoundInfoLabel>VEICULO</RoundInfoLabel>
          <RoundInfoValue>{round.vehicleName}</RoundInfoValue>
        </RoundInfo>
      </RoundHeader>

      <RoundNotificationInfo>
        <RoundNotificationInfoLabel>MEMBRO</RoundNotificationInfoLabel>
        <RoundNotificationInfoValue>{member.name}</RoundNotificationInfoValue>
      </RoundNotificationInfo>

      <RoundNotificationInfo>
        <RoundNotificationInfoLabel>SOLUÇÃO</RoundNotificationInfoLabel>
        <RoundNotificationInfoValue>{solution.name}</RoundNotificationInfoValue>
      </RoundNotificationInfo>

      <InputDropdown
        label="Material"
        modalTitle="Selecione o material"
        data={dropdwonMaterials}
        onChange={(selected) =>
          handleAddMaterial(Number(selected.key), selected.label || '')
        }
      />

      <MaterialsContainer>
        <MaterialsText>MATERIAIS</MaterialsText>
      </MaterialsContainer>

      {materialsOfRoundNotification.length > 0 ? (
        <MaterialsList>
          {materialsOfRoundNotification.map((material) => (
            <Material key={material.productId}>
              <MaterialName>{material.productName}</MaterialName>
              <MaterialAction>
                <MaterialAmount>{material.amount}</MaterialAmount>
                <MaterialUpdateAmount
                  onPress={() => handleMinusAmount(material.productId)}
                >
                  <Feather name="minus" color="#1163ad" size={16} />
                </MaterialUpdateAmount>
                <MaterialUpdateAmount
                  onPress={() =>
                    handlePlusAmount(material.productId, material.amount + 1)}
                >
                  <Feather name="plus" color="#1163ad" size={16} />
                </MaterialUpdateAmount>
                <MaterialTrash
                  onPress={() => handleRemoveMaterial(material.productId)}
                >
                  <Feather name="trash" color="#FFF" size={16} />
                </MaterialTrash>
              </MaterialAction>
            </Material>
          ))}
        </MaterialsList>
      ) : (
        <EmptyMaterialContainer>
          <EmptyMaterialText>NENHUM MATERIAL ADICIONADO.</EmptyMaterialText>
        </EmptyMaterialContainer>
      )}

      <Button
        label="CONCLUIR O.S"
        loading={loading}
        onPress={handleFinishRoundNotificaiton}
        style={{
          backgroundColor: '#EB5757',
        }}
      />
    </Container>
  );
};

export default NotificationFinishStepTwo;
