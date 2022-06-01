import React, { useState, useCallback } from 'react';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import { Feather } from '@expo/vector-icons';
import { Alert, Text } from 'react-native';
import ServiceOrderMaterial from '../../../../database/model/ServiceOrderMaterial';
import ServiceOrder from '../../../../database/model/ServiceOrder';
import Requisition from '../../../../database/model/Requisition';
import Route from '../../../../database/model/Route';
import offlineRepository from '../../../../services/offline';
import Loading from '../../../../components/Loading';
import InputDropdown from '../../../../components/InputDropdown';

import {
  Container,
  MaterialContainer,
  MaterialContainerTitle,
  MaterialList,
  MaterialItem,
  MaterialName,
  MaterialAction,
  MaterialAmount,
  MaterialUpdateAmount,
  MaterialTrash,
  AlertText,
} from './styles';

interface DropdownProps {
  key: number;
  label: string;
}

type RouteParams = {
  serviceOrderId: string;
};

const Materials: React.FC = () => {
  const routeParams = useRoute();
  const database = useDatabase();

  const { serviceOrderId } = routeParams.params as RouteParams;

  const [route, setRoute] = useState<Route>();
  const [serviceOrder, setServiceOrder] = useState<ServiceOrder>();
  const [serviceOrderMaterials, setServiceOrderMaterials] = useState<
    ServiceOrderMaterial[]
  >([]);
  const [requisitionMaterials, setRequisitionMaterials] = useState<
    Requisition[]
  >([]);

  const [
    requisitionMaterialsDropdown,
    setRequisitionMaterialsDropdown,
  ] = useState<DropdownProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadRoute = async (): Promise<void> => {
        const rt = await offlineRepository.routes(database).findOne();

        setRoute(rt);
      };

      const loadServiceOrder = async (): Promise<void> => {
        const os = await offlineRepository
          .servicesOrders(database)
          .findById(serviceOrderId);

        setServiceOrder(os);
      };

      const loadServiceOrderMaterials = async (): Promise<void> => {
        if (serviceOrder) {
          const materials = await offlineRepository
            .servicesOrdersMaterials(database)
            .findByOs(serviceOrder.originalId);

          setServiceOrderMaterials(materials);
        }
      };

      const loadRequisitionMaterials = async (): Promise<void> => {
        const materials = await offlineRepository
          .requisitions(database)
          .findAll();

        const dropdown = materials.map((material) => ({
          key: material.productId,
          label: `0000${material.originalId} - ${material.productName}`,
        }));

        setRequisitionMaterials(materials);
        setRequisitionMaterialsDropdown(dropdown);
      };

      loadRoute();
      loadServiceOrder();
      loadServiceOrderMaterials();
      loadRequisitionMaterials();
    }, [database, serviceOrderId, serviceOrder]),
  );

  if (
    !serviceOrder ||
    !route ||
    !serviceOrderMaterials ||
    !requisitionMaterials
  ) {
    return <Loading text="Carregando informações da O.S" />;
  }

  const handleAddMaterial = async (
    productId: number,
    productName: string,
  ): Promise<void> => {
    const serviceOrderMaterialAlreadyExists = serviceOrderMaterials.find(
      (item) => item.productId === productId,
    );

    if (serviceOrderMaterialAlreadyExists) {
      return;
    }

    const requisitionMaterial = requisitionMaterials.find(
      (item) => item.productId === productId,
    );

    if (!requisitionMaterial) {
      return;
    }

    const amountAvaiable =
      requisitionMaterial.requisitionAmount - requisitionMaterial.routeAmount;

    if (amountAvaiable === 0) {
      Alert.alert(
        'Saldo insuficiente',
        'O material selecionado não possui saldo suficiente.',
      );

      return;
    }

    const serviceOrderMaterialCreated = await offlineRepository
      .servicesOrdersMaterials(database)
      .create({
        productId,
        productName,
        amount: 1,
        serviceOrderId: serviceOrder.originalId,
        routeId: route.originalId,
      });

    setServiceOrderMaterials((state) => [
      ...state,
      serviceOrderMaterialCreated,
    ]);

    await database.action(async () => {
      await requisitionMaterial.update((req) =>
        Object.assign(req, {
          routeAmount: req.routeAmount + 1,
        }),
      );
    });
  };

  const handlePlusAmount = async (
    serviceOrderMaterial: ServiceOrderMaterial,
  ): Promise<void> => {
    const requisitionMaterial = requisitionMaterials.find(
      (item) => item.productId === serviceOrderMaterial.productId,
    );

    if (!requisitionMaterial) {
      return;
    }

    const amountAvaiable =
      requisitionMaterial.requisitionAmount - requisitionMaterial.routeAmount;

    if (amountAvaiable === 0) {
      Alert.alert(
        'Saldo insuficiente',
        'O material selecionado não possui saldo suficiente.',
      );

      return;
    }

    await database.action(async () => {
      await serviceOrderMaterial.update((os) =>
        Object.assign(os, {
          ...os,
          amount: os.amount + 1,
        }),
      );
    });

    await database.action(async () => {
      await requisitionMaterial.update((req) =>
        Object.assign(req, {
          routeAmount: req.routeAmount + 1,
        }),
      );
    });

    const serviceOrdersMaterialsUpdated = serviceOrderMaterials.map((item) => {
      if (item.productId === serviceOrderMaterial.productId) {
        return serviceOrderMaterial;
      }

      return item;
    });

    setServiceOrderMaterials(serviceOrdersMaterialsUpdated);
  };

  const handleMinusAmount = async (
    serviceOrderMaterial: ServiceOrderMaterial,
  ): Promise<void> => {
    const requisitionMaterial = requisitionMaterials.find(
      (item) => item.productId === serviceOrderMaterial.productId,
    );

    if (!requisitionMaterial) {
      return;
    }

    const newAmount = serviceOrderMaterial.amount - 1;

    if (newAmount < 1) {
      return;
    }

    await database.action(async () => {
      await serviceOrderMaterial.update((os) =>
        Object.assign(os, {
          ...os,
          amount: os.amount - 1,
        }),
      );
    });

    await database.action(async () => {
      await requisitionMaterial.update((req) =>
        Object.assign(req, {
          routeAmount: req.routeAmount - 1,
        }),
      );
    });

    const serviceOrdersMaterialsUpdated = serviceOrderMaterials.map((item) => {
      if (item.productId === serviceOrderMaterial.productId) {
        return serviceOrderMaterial;
      }

      return item;
    });

    setServiceOrderMaterials(serviceOrdersMaterialsUpdated);
  };

  const handleRemove = async (
    serviceOrderMaterial: ServiceOrderMaterial,
  ): Promise<void> => {
    const requisitionMaterial = requisitionMaterials.find(
      (item) => item.productId === serviceOrderMaterial.productId,
    );

    if (!requisitionMaterial) {
      return;
    }

    const serviceOrdersMaterialsUpdated = serviceOrderMaterials.filter(
      (item) => item.productId !== serviceOrderMaterial.productId,
    );

    setServiceOrderMaterials(serviceOrdersMaterialsUpdated);

    await database.action(async () => {
      await requisitionMaterial.update((req) =>
        Object.assign(req, {
          routeAmount: req.routeAmount - serviceOrderMaterial.amount,
        }),
      );
    });

    await database.action(async () => {
      await serviceOrderMaterial.destroyPermanently();
    });
  };

  return (
    <Container
      contentContainerStyle={{
        flexGrow: 1,
      }}
      nestedScrollEnabled
    >
      {serviceOrder.statusId === 2 ||
      serviceOrder.statusId === 7 ||
      serviceOrder.statusId === 8 ||
      serviceOrder.statusId === 9 ||
      serviceOrder.statusId === 10 ? (
        <AlertText>
          Não é possível adicionar materiais com o status atual.
        </AlertText>
      ) : (
        <>
          {serviceOrder.sent !== 1 && (
            <InputDropdown
              label="Material"
              modalTitle="Selecione o material"
              data={requisitionMaterialsDropdown}
              onChange={(selected) =>
                handleAddMaterial(Number(selected.key), selected.label || '')
              }
            />
          )}
          <MaterialContainer>
            <MaterialContainerTitle>MATERIAIS</MaterialContainerTitle>

            <MaterialList>
              {serviceOrderMaterials.map((material) => (
                <MaterialItem key={material.id}>
                  <MaterialName>{material.productName}</MaterialName>

                  <MaterialAction>
                    <MaterialAmount>{material.amount}</MaterialAmount>

                    {serviceOrder.sent !== 1 && (
                      <>
                        <MaterialUpdateAmount
                          onPress={() => handleMinusAmount(material)}
                        >
                          <Feather name="minus" color="#1163ad" size={16} />
                        </MaterialUpdateAmount>

                        <MaterialUpdateAmount
                          onPress={() => handlePlusAmount(material)}
                        >
                          <Feather name="plus" color="#1163ad" size={16} />
                        </MaterialUpdateAmount>

                        <MaterialTrash onPress={() => handleRemove(material)}>
                          <Feather name="trash" color="#FFF" size={16} />
                        </MaterialTrash>
                      </>
                    )}
                  </MaterialAction>
                </MaterialItem>
              ))}
            </MaterialList>
          </MaterialContainer>
        </>
      )}
    </Container>
  );
};

export default Materials;
