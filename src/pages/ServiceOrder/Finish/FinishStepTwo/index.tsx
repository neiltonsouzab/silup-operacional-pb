import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Feather } from '@expo/vector-icons';

import ServiceOrder from '../../../../database/model/ServiceOrder';
import Requisition from '../../../../database/model/Requisition';
import Route from '../../../../database/model/Route';

import offlineRepository from '../../../../services/offline';

import InputDropdown from '../../../../components/InputDropdown';
import Loading from '../../../../components/Loading';

import {
  Container,
  OsHeader,
  OsDetails,
  OsNumber,
  OsDate,
  OsAddress,
  OsFinishButton,
  OsFinishButtonText,
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

interface MaterialServiceOrderProps {
  productId: number;
  productName: string;
  amount: number;
}

type RouteParams = {
  memberId: number;
  solutionId: number;
  statusId: number;
  // pointsAmount: number;
  obs: string;
  serviceOrderId: string;
  imageName: string;
};

const FinishStepTwo: React.FC = () => {
  const routeParams = useRoute();
  const navigation = useNavigation();
  const database = useDatabase();

  const {
    // memberId,
    solutionId,
    statusId,
    // pointsAmount,
    obs,
    serviceOrderId,
    imageName,
  } = routeParams.params as RouteParams;

  const [serviceOrder, setServiceOrder] = useState<ServiceOrder>();
  const [requisition, setRequistion] = useState<Requisition[]>([]);
  const [route, setRoute] = useState<Route>();

  const [dropdwonMaterials, setDropdwonMaterials] = useState<DropdownProps[]>(
    [],
  );
  const [materialsOfServiceOrder, setMaterialsOfServiceOrder] = useState<
    MaterialServiceOrderProps[]
  >([]);

  useFocusEffect(
    useCallback(() => {
      const loadServiceOrder = async (): Promise<void> => {
        const os = await offlineRepository
          .servicesOrders(database)
          .findById(serviceOrderId);

        setServiceOrder(os);
      };

      const loadMaterials = async (): Promise<void> => {
        const list = await offlineRepository.requisitions(database).findAll();
        const materialsList = list.map((item) => ({
          key: item.productId,
          label: `0000${item.originalId} - ${item.productName}`,
        }));

        setDropdwonMaterials(materialsList);
        setRequistion(list);
      };

      const loadRoute = async (): Promise<void> => {
        const rt = await offlineRepository.routes(database).findOne();

        setRoute(rt);
      };

      loadServiceOrder();
      loadMaterials();
      loadRoute();
    }, [database, serviceOrderId]),
  );

  const getAmountAvaiable = useCallback(
    (productId: number): number => {
      const productRequisiton = requisition.find(
        (item) => item.productId === productId,
      );

      if (!productRequisiton) {
        return 0;
      }

      const amountAvaiable =
        productRequisiton.requisitionAmount - productRequisiton.routeAmount;

      return amountAvaiable;
    },
    [requisition],
  );

  const handleAddMaterial = useCallback(
    (productId: number, productName: string) => {
      const materialExist = materialsOfServiceOrder.find(
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

      setMaterialsOfServiceOrder([
        ...materialsOfServiceOrder,
        {
          productId,
          productName,
          amount: 1,
        },
      ]);
    },
    [materialsOfServiceOrder, getAmountAvaiable],
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

      const materialsModifieds = materialsOfServiceOrder.map((material) => {
        if (material.productId === productId) {
          return {
            ...material,
            amount,
          };
        }

        return material;
      });

      setMaterialsOfServiceOrder(materialsModifieds);
    },
    [getAmountAvaiable, materialsOfServiceOrder],
  );

  const handleMinusAmount = useCallback(
    (productId: number) => {
      const materialsModifieds = materialsOfServiceOrder.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            amount: item.amount === 1 ? item.amount : item.amount - 1,
          };
        }

        return item;
      });

      setMaterialsOfServiceOrder(materialsModifieds);
    },
    [materialsOfServiceOrder],
  );

  const handleRemoveMaterial = useCallback(
    (productId: number) => {
      const materialsModified = materialsOfServiceOrder.filter(
        (item) => item.productId !== productId,
      );

      setMaterialsOfServiceOrder(materialsModified);
    },
    [materialsOfServiceOrder],
  );

  if (!serviceOrder || !route) {
    return <Loading text="Carregando informações da O.S .." />;
  }

  const finishServiceOrder = async (): Promise<void> => {
    /* Update requisition */
    const requisitionsUpdateds: Requisition[] = [];
    requisition.forEach((req) => {
      materialsOfServiceOrder.forEach((material) => {
        if (req.productId === material.productId) {
          req.prepareUpdate((r) =>
            Object.assign(r, {
              routeAmount: r.routeAmount + material.amount,
            }),
          );

          requisitionsUpdateds.push(req);
        }
      });
    });

    await offlineRepository.requisitions(database).batch(requisitionsUpdateds);

    /* Rela */
    const servicesOrdersMaterialsCreateds = materialsOfServiceOrder.map(
      (material) => {
        return offlineRepository
          .servicesOrdersMaterials(database)
          .prepareCreate({
            routeId: route.originalId,
            serviceOrderId: serviceOrder.originalId,
            productName: material.productName,
            productId: material.productId,
            amount: material.amount,
          });
      },
    );

    await offlineRepository
      .servicesOrdersMaterials(database)
      .batch(servicesOrdersMaterialsCreateds);

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
    <Container
      contentContainerStyle={{
        flexGrow: 1,
      }}
      nestedScrollEnabled
    >
      <OsHeader>
        <OsDetails>
          <OsNumber>OS 00{serviceOrder.originalId}</OsNumber>
          <OsDate>{serviceOrder.getFormattedDate()}</OsDate>
          <OsAddress>{serviceOrder.address}</OsAddress>
        </OsDetails>

        <OsFinishButton onPress={handleFinishServiceOrder}>
          <OsFinishButtonText>FINALIZAR</OsFinishButtonText>
        </OsFinishButton>
      </OsHeader>

      <InputDropdown
        label="Material"
        modalTitle="Selecione o material"
        data={dropdwonMaterials}
        onChange={(selected) =>
          handleAddMaterial(Number(selected.key), selected.label || '')}
      />

      <MaterialsContainer>
        <MaterialsText>MATERIAIS</MaterialsText>
      </MaterialsContainer>

      {materialsOfServiceOrder.length > 0 ? (
        <MaterialsList>
          {materialsOfServiceOrder.map((material) => (
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
                    handlePlusAmount(material.productId, material.amount + 1)
                  }
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
    </Container>
  );
};

export default FinishStepTwo;
