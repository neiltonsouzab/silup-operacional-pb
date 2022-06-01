import { Database, Q } from '@nozbe/watermelondb';

import RequisitionCompleted from 'src/database/model/RequisitionCompleted';
import RequisitionCompletedItem from 'src/database/model/RequisitionCompletedItem';
import { round } from 'react-native-reanimated';
import OcurrenceType from '../database/model/OcurrenceType';
import PostType from '../database/model/PostType';
import ReactorType from '../database/model/ReactorType';
import ReactorPower from '../database/model/ReactorPower';
import ArmType from '../database/model/ArmType';
import LightFixtureType from '../database/model/LightFixtureType';
import LampType from '../database/model/LampType';
import LampPower from '../database/model/LampPower';
import PerimeterType from '../database/model/PerimeterType';
import PlaceType from '../database/model/PlaceType';

import Ocurrence from '../database/model/Ocurrence';
import ServiceOrder from '../database/model/ServiceOrder';
import Member from '../database/model/Member';
import Solution from '../database/model/Solution';
import Requisition from '../database/model/Requisition';
import Route from '../database/model/Route';
import ServiceOrderMaterial from '../database/model/ServiceOrderMaterial';
import PointIp from '../database/model/PointIp';
import Mapping from '../database/model/Mapping';
import Round from '../database/model/Round';
import RoundAddress from '../database/model/RoundAddress';
import RoundNotification from '../database/model/RoundNotification';
import RoundRequisition from '../database/model/RoundRequisition';
import RoundMaterial from '../database/model/RoundMaterial';
import RoundMember from '../database/model/RoundMember';

interface CreateOcurrenceType {
  originalId: number;
  name: string;
}

interface CreateSolution {
  originalId: number;
  name: string;
}

interface CreatePostType {
  originalId: number;
  name: string;
}

interface CreateReactorType {
  originalId: number;
  name: string;
}

interface CreateReactorPower {
  originalId: number;
  name: string;
}

interface CreateArmType {
  originalId: number;
  name: string;
}

interface CreateLightFixtureType {
  originalId: number;
  name: string;
}

interface CreateLampType {
  originalId: number;
  name: string;
}

interface CreateLampPower {
  originalId: number;
  name: string;
}

interface CreatePerimeterType {
  originalId: number;
  name: string;
}

interface CreatePlaceType {
  originalId: number;
  name: string;
}

interface CreateOcurrence {
  address?: string;
  district?: string;
  city?: string;
  latitude: number;
  longitude: number;
  obs?: string;
  imageName?: string;
  ocurrenceTypeId?: number;
  pointId?: number;
  pointTag?: string;
}

interface CreateRoute {
  originalId: number;
  teamName: string;
  obs: string;
  date: string;
  statusDescription: string;
}

interface CreateMember {
  originalId: number;
  name: string;
}

interface CreateServiceOrder {
  originalId: number;
  statusId: number;
  // memberId: number;
  ocurrenceTypeDescription: string;
  ocurrenceOriginDescription: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  date: string;
  obs: string;
  obs_os: string;
  sent: number;
  // points_amount: number;
  protestant: string;
  protestantPhone: string;
  imageName: string;
}

interface CreateRequisition {
  originalId: number;
  requisitionId: number;
  productId: number;
  productName: string;
  requisitionAmount: number;
  routeAmount: number;
}

interface CreateServiceOrderMaterial {
  routeId: number;
  serviceOrderId: number;
  productName: string;
  productId: number;
  amount: number;
}

interface CreatePointIp {
  tag: string;
  lightFixtureAmount: number;
  obs: string;
  latitude: number;
  longitude: number;
  imageName: string;
  postTypeId: number;
  reactorTypeId: number;
  reactorPowerId: number;
  armTypeId: number;
  lightFixtureTypeId: number;
  lampTypeId: number;
  lampPowerId: number;
  perimeterTypeId: number;
  placeTypeId: number;
}

interface CreateMapping {
  routeId: number;
  latitude: number;
  longitude: number;
}

interface CreateRound {
  originalId: number;
  statusDescription: string;
  obs: string;
  vehicleName: string;
  teamName: string;
}

interface CreateRoundAddress {
  originalId: number;
  roundId: number;
  statusId: number;
  address: string;
}

interface CreateRoundRequisition {
  originalId: number;
  requisitionId: number;
  productId: number;
  productName: string;
  requisitionAmount: number;
  roundAmount: number;
}

interface CreateRoundNotification {
  address: string;
  district: string;
  city: string;
  latitude: number;
  longitude: number;
  obs?: string;
  imageName?: string;
  notificationTypeId: number;
  notificationStatusId: number;
  memberId?: number;
  solutionId?: number;
  pointId: number;
  pointTag: string;
}

interface CreateRoundMaterial {
  roundId: number;
  productId: number;
  amount: number;
}

interface CreateRoundMember {
  originalId: number;
  name: string;
}

interface CreateRequisitionCompleted {
  originalId: number;
  routeId: number;
  openDate: Date;
  closedDate: Date;
}

interface CreateRequisitionCompletedItem {
  requisitionCompletedId: number;
  productId: number;
  productName: string;
  originalQuantity: number;
  routeQuantity: number;
  quantity: number;
}

interface OcurrenceTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<OcurrenceType[]>;
  prepareCreate(data: CreateOcurrenceType): OcurrenceType;
  create(data: CreateOcurrenceType): Promise<OcurrenceType>;
  deleteAll(): Promise<void>;
  batch(ocurrencesTypes: OcurrenceType[]): Promise<void>;
}

interface PostTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<PostType[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreatePostType): PostType;
  batch(models: PostType[]): Promise<void>;
}

interface ReactorTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<ReactorType[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreateReactorType): ReactorType;
  batch(models: ReactorType[]): Promise<void>;
}

interface ReactorPowerRepository {
  count(): Promise<number>;
  findAll(): Promise<ReactorPower[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreateReactorPower): ReactorPower;
  batch(models: ReactorPower[]): Promise<void>;
}

interface ArmTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<ArmType[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreateArmType): ArmType;
  batch(models: ArmType[]): Promise<void>;
}

interface LightFixtureTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<LightFixtureType[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreateLightFixtureType): LightFixtureType;
  batch(models: LightFixtureType[]): Promise<void>;
}

interface LampTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<LampType[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreateLampType): LampType;
  batch(models: LampType[]): Promise<void>;
}

interface LampPowerRepository {
  count(): Promise<number>;
  findAll(): Promise<LampPower[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreateLampPower): LampPower;
  batch(models: LampPower[]): Promise<void>;
}

interface PerimeterTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<PerimeterType[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreatePerimeterType): PerimeterType;
  batch(models: PerimeterType[]): Promise<void>;
}

interface PlaceTypeRepository {
  count(): Promise<number>;
  findAll(): Promise<PlaceType[]>;
  deleteAll(): Promise<void>;
  prepareCreate(data: CreatePlaceType): PlaceType;
  batch(models: PlaceType[]): Promise<void>;
}

interface OcurrenceRepository {
  count(): Promise<number>;
  findAll(): Promise<Ocurrence[]>;
  findByCoords(
    latitude: number,
    longitude: number,
  ): Promise<Ocurrence | undefined>;
  create(data: CreateOcurrence): Promise<Ocurrence>;
  batch(ocurrences: Ocurrence[]): Promise<void>;
}

interface ServiceOrderRepository {
  count(): Promise<number>;
  countFinished(): Promise<number>;
  findAll(): Promise<ServiceOrder[]>;
  findFinished(): Promise<ServiceOrder[]>;
  findNotSent(): Promise<ServiceOrder[]>;
  findSent(): Promise<ServiceOrder[]>;
  findById(id: string): Promise<ServiceOrder>;
  findByOriginalId(id: number): Promise<ServiceOrder>;
  prepareCreate(data: CreateServiceOrder): ServiceOrder;
  deleteAll(): Promise<void>;
  batch(servicesOrders: ServiceOrder[]): Promise<void>;
}

interface ServiceOrderMaterialRepository {
  count(): Promise<number>;
  findAll(): Promise<ServiceOrderMaterial[]>;
  findByOs(id: number): Promise<ServiceOrderMaterial[]>;
  create(data: CreateServiceOrderMaterial): Promise<ServiceOrderMaterial>;
  prepareCreate(data: CreateServiceOrderMaterial): ServiceOrderMaterial;
  deleteAll(): Promise<void>;
  batch(servicesOrdersMaterial: ServiceOrderMaterial[]): Promise<void>;
}

interface MemberRepository {
  count(): Promise<number>;
  findAll(): Promise<Member[]>;
  findById(id: string): Promise<Member>;
  prepareCreate(data: CreateMember): Member;
  deleteAll(): Promise<void>;
  batch(members: Member[]): Promise<void>;
}

interface RequisitionRepository {
  count(): Promise<number>;
  findAll(): Promise<Requisition[]>;
  findByMaterialId(id: number): Promise<Requisition>;
  prepareCreate(data: CreateRequisition): Requisition;
  deleteAll(): Promise<void>;
  batch(requisitions: Requisition[]): Promise<void>;
}

interface SolutionRepository {
  count(): Promise<number>;
  findAll(): Promise<Solution[]>;
  findById(id: string): Promise<Solution>;
  prepareCreate(data: CreateSolution): Solution;
  deleteAll(): Promise<void>;
  batch(solutions: Solution[]): Promise<void>;
}

interface RouteRepository {
  count(): Promise<number>;
  findOne(): Promise<Route>;
  create(data: CreateRoute): Promise<Route>;
  deleteAll(): Promise<void>;
}

interface PointIpRepository {
  count(): Promise<number>;
  findAll(): Promise<PointIp[]>;
  findByCoords(
    latitude: number,
    longitude: number,
  ): Promise<PointIp | undefined>;
  create(data: CreatePointIp): Promise<PointIp>;
  batch(pointsIps: PointIp[]): Promise<void>;
}

interface MappingRepository {
  create(data: CreateMapping): Promise<Mapping>;
  findAll(): Promise<Mapping[]>;
  batch(mappings: Mapping[]): Promise<void>;
}

interface RoundRepository {
  findAll(): Promise<Round[]>;
  findOne(): Promise<Round>;
  create(data: CreateRound): Promise<Round>;
  deleteAll(): Promise<void>;
  count(): Promise<number>;
  findById(id: string): Promise<Round>;
}

interface RoundAddressRepository {
  count(): Promise<number>;
  findAll(): Promise<RoundAddress[]>;
  findByRoundId(roundId: number): Promise<RoundAddress[]>;
  prepareCreate(data: CreateRoundAddress): RoundAddress;
  batch(roundsAddress: RoundAddress[]): Promise<void>;
  deleteAll(): Promise<void>;
}

interface RoundRequisitionRepository {
  count(): Promise<number>;
  findAll(): Promise<RoundRequisition[]>;
  prepareCreate(data: CreateRoundRequisition): RoundRequisition;
  deleteAll(): Promise<void>;
  batch(roundsRequisitions: RoundRequisition[]): Promise<void>;
}

interface RoundNotificationRepository {
  count(): Promise<number>;
  create(data: CreateRoundNotification): Promise<RoundNotification>;
  findAll(): Promise<RoundNotification[]>;
  findById(id: string): Promise<RoundNotification>;
  findByCoords(
    latitude: number,
    longitude: number,
  ): Promise<RoundNotification | undefined>;
  deleteAll(): Promise<void>;
  batch(roundsNotifications: RoundNotification[]): Promise<void>;
}

interface RoundMaterialRepository {
  count(): Promise<number>;
  findAll(): Promise<RoundMaterial[]>;
  prepareCreate(data: CreateRoundMaterial): RoundMaterial;
  deleteAll(): Promise<void>;
  batch(roundsMaterials: RoundMaterial[]): Promise<void>;
}

interface RoundMemberRepository {
  count(): Promise<number>;
  findAll(): Promise<RoundMember[]>;
  findById(id: string): Promise<RoundMember>;
  prepareCreate(data: CreateRoundMember): Member;
  deleteAll(): Promise<void>;
  batch(members: RoundMember[]): Promise<void>;
}

interface RequisitionCompletedRepository {
  count(): Promise<number>;
  findAll(): Promise<RequisitionCompleted[]>;
  prepareCreate(data: CreateRequisitionCompleted): RequisitionCompleted;
  deleteAll(): Promise<void>;
  batch(requisitions: RequisitionCompleted[]): Promise<void>;
}

interface RequisitionCompletedItemRepository {
  count(): Promise<number>;
  findAll(): Promise<RequisitionCompletedItem[]>;
  prepareCreate(data: CreateRequisitionCompletedItem): RequisitionCompletedItem;
  deleteAll(): Promise<void>;
  batch(requisitionsCompletedItems: RequisitionCompletedItem[]): Promise<void>;
  findByRequisitionCompletedId(
    requisitionCompletedId: number,
  ): Promise<RequisitionCompletedItem[]>;
}

export default {
  ocurrencesTypes: (database: Database): OcurrenceTypeRepository => {
    const collection = database.collections.get<OcurrenceType>(
      'ocurrences_types',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<OcurrenceType[]> {
      const list = await collection.query().fetch();

      return list;
    }

    function prepareCreate({
      originalId,
      name,
    }: CreateOcurrenceType): OcurrenceType {
      const ocurrenceType = collection.prepareCreate((oc) =>
        Object.assign(oc, {
          originalId,
          name,
        }),
      );

      return ocurrenceType;
    }

    async function create({
      originalId,
      name,
    }: CreateOcurrenceType): Promise<OcurrenceType> {
      const ocurrenceType = await database.action<OcurrenceType>(async () => {
        return collection.create((ocType) =>
          Object.assign(ocType, {
            originalId,
            name,
          }),
        );
      });

      return ocurrenceType;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(ocurrencesTypes: OcurrenceType[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...ocurrencesTypes);
      });
    }

    return {
      count,
      findAll,
      prepareCreate,
      create,
      batch,
      deleteAll,
    };
  },
  postsTypes: (database: Database): PostTypeRepository => {
    const collection = database.collections.get<PostType>('posts_types');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<PostType[]> {
      const postsTypes = await collection.query().fetch();

      return postsTypes;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({ originalId, name }: CreatePostType): PostType {
      return collection.prepareCreate((postType) =>
        Object.assign(postType, {
          originalId,
          name,
        }),
      );
    }

    async function batch(postsTypes: PostType[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...postsTypes);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  reactorsTypes: (database: Database): ReactorTypeRepository => {
    const collection = database.collections.get<ReactorType>('reactors_types');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<ReactorType[]> {
      const reactorsTypes = await collection.query().fetch();

      return reactorsTypes;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({
      originalId,
      name,
    }: CreateReactorType): ReactorType {
      return collection.prepareCreate((reactorType) =>
        Object.assign(reactorType, {
          originalId,
          name,
        }),
      );
    }

    async function batch(reactorsTypes: ReactorType[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...reactorsTypes);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  reactorsPowers: (database: Database): ReactorPowerRepository => {
    const collection = database.collections.get<ReactorPower>(
      'reactors_powers',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<ReactorPower[]> {
      const reactorsPowers = await collection.query().fetch();

      return reactorsPowers;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({
      originalId,
      name,
    }: CreateReactorPower): ReactorPower {
      return collection.prepareCreate((reactorPower) =>
        Object.assign(reactorPower, {
          originalId,
          name,
        }),
      );
    }

    async function batch(reactorsPowers: ReactorPower[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...reactorsPowers);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  armsTypes: (database: Database): ArmTypeRepository => {
    const collection = database.collections.get<ArmType>('arms_types');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<ArmType[]> {
      const armsTypes = await collection.query().fetch();

      return armsTypes;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({ originalId, name }: CreateArmType): ArmType {
      return collection.prepareCreate((armType) =>
        Object.assign(armType, {
          originalId,
          name,
        }),
      );
    }

    async function batch(armsTypes: ArmType[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...armsTypes);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  lightsFixturesTypes: (database: Database): LightFixtureTypeRepository => {
    const collection = database.collections.get<LightFixtureType>(
      'lights_fixtures_types',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<LightFixtureType[]> {
      const lightsFixturesTypes = await collection.query().fetch();

      return lightsFixturesTypes;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({
      originalId,
      name,
    }: CreateLightFixtureType): LightFixtureType {
      return collection.prepareCreate((lightFixtureType) =>
        Object.assign(lightFixtureType, {
          originalId,
          name,
        }),
      );
    }

    async function batch(
      lightsFixturesTypes: LightFixtureType[],
    ): Promise<void> {
      await database.action(async () => {
        await database.batch(...lightsFixturesTypes);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  lampsTypes: (database: Database): LampTypeRepository => {
    const collection = database.collections.get<LampType>('lamps_types');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<LampType[]> {
      const lampsTypes = await collection.query().fetch();

      return lampsTypes;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({ originalId, name }: CreateLampType): LampType {
      return collection.prepareCreate((lampType) =>
        Object.assign(lampType, {
          originalId,
          name,
        }),
      );
    }

    async function batch(lampsTypes: LampType[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...lampsTypes);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  lampsPowers: (database: Database): LampPowerRepository => {
    const collection = database.collections.get<LampPower>('lamps_powers');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<LampPower[]> {
      const lampsPowers = await collection.query().fetch();

      return lampsPowers;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({ originalId, name }: CreateLampPower): LampPower {
      return collection.prepareCreate((lampPower) =>
        Object.assign(lampPower, {
          originalId,
          name,
        }),
      );
    }

    async function batch(lampPower: LampPower[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...lampPower);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  perimetersTypes: (database: Database): PerimeterTypeRepository => {
    const collection = database.collections.get<PerimeterType>(
      'perimeters_types',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<PerimeterType[]> {
      const perimetersTypes = await collection.query().fetch();

      return perimetersTypes;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({
      originalId,
      name,
    }: CreatePerimeterType): PerimeterType {
      return collection.prepareCreate((perimeterType) =>
        Object.assign(perimeterType, {
          originalId,
          name,
        }),
      );
    }

    async function batch(perimetersTypes: PerimeterType[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...perimetersTypes);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  placesTypes: (database: Database): PlaceTypeRepository => {
    const collection = database.collections.get<PlaceType>('places_types');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<PlaceType[]> {
      const perimetersTypes = await collection.query().fetch();

      return perimetersTypes;
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    function prepareCreate({ originalId, name }: CreatePlaceType): PlaceType {
      return collection.prepareCreate((placeType) =>
        Object.assign(placeType, {
          originalId,
          name,
        }),
      );
    }

    async function batch(placesTypes: PlaceType[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...placesTypes);
      });
    }

    return {
      count,
      findAll,
      deleteAll,
      prepareCreate,
      batch,
    };
  },
  ocurrences: (database: Database): OcurrenceRepository => {
    const collection = database.collections.get<Ocurrence>('ocurrences');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<Ocurrence[]> {
      const ocurrences = await collection.query().fetch();

      return ocurrences;
    }

    async function findByCoords(
      latitude: number,
      longitude: number,
    ): Promise<Ocurrence | undefined> {
      const ocurrence = await collection
        .query(
          Q.and(Q.where('latitude', latitude), Q.where('longitude', longitude)),
        )
        .fetch();

      return ocurrence[0];
    }

    async function create({
      address,
      district,
      city,
      latitude,
      longitude,
      obs,
      imageName,
      ocurrenceTypeId,
      pointId,
      pointTag,
    }: CreateOcurrence): Promise<Ocurrence> {
      const ocurrence = await database.action<Ocurrence>(async () => {
        return collection.create((ocu) =>
          Object.assign(ocu, {
            address,
            district,
            city,
            latitude,
            longitude,
            obs,
            imageName,
            ocurrenceTypeId,
            pointId,
            pointTag,
          }),
        );
      });

      return ocurrence;
    }

    async function batch(ocurrences: Ocurrence[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...ocurrences);
      });
    }

    return {
      count,
      findAll,
      findByCoords,
      create,
      batch,
    };
  },
  servicesOrders: (database: Database): ServiceOrderRepository => {
    const collection = database.collections.get<ServiceOrder>(
      'services_orders',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function countFinished(): Promise<number> {
      const total = await collection
        .query(Q.where('status_id', 3))
        .fetchCount();

      return total;
    }

    async function findAll(): Promise<ServiceOrder[]> {
      const list = await collection.query().fetch();

      return list;
    }

    async function findFinished(): Promise<ServiceOrder[]> {
      const list = await collection
        .query(
          Q.and(
            Q.or(
              Q.where('status_id', 3),
              Q.where('status_id', 7),
              Q.where('status_id', 8),
              Q.where('status_id', 9),
              Q.where('status_id', 10),
            ),
            Q.where('sent', 0),
          ),
        )
        .fetch();

      return list;
    }

    async function findSent(): Promise<ServiceOrder[]> {
      const list = await collection.query(Q.where('sent', 1)).fetch();

      return list;
    }

    async function findNotSent(): Promise<ServiceOrder[]> {
      const list = await collection.query(Q.where('sent', 0)).fetch();

      return list;
    }

    async function findById(id: string): Promise<ServiceOrder> {
      const serviceOrder = await collection.find(id);

      return serviceOrder;
    }

    async function findByOriginalId(id: number): Promise<ServiceOrder> {
      const list = await collection.query(Q.where('original_id', id)).fetch();

      return list[0];
    }

    function prepareCreate({
      originalId,
      statusId,
      // memberId,
      ocurrenceOriginDescription,
      ocurrenceTypeDescription,
      latitude,
      longitude,
      address,
      date,
      imageUrl,
      obs,
      obs_os,
      // points_amount,
      sent,
      protestant,
      protestantPhone,
      imageName,
    }: CreateServiceOrder): ServiceOrder {
      return collection.prepareCreate((os) =>
        Object.assign(os, {
          originalId,
          statusId,
          // memberId,
          ocurrenceOriginDescription,
          ocurrenceTypeDescription,
          latitude,
          longitude,
          address,
          date,
          imageUrl,
          obs,
          obs_os,
          sent,
          // points_amount,
          protestant,
          protestantPhone,
          imageName,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(servicesOrders: ServiceOrder[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...servicesOrders);
      });
    }

    return {
      count,
      countFinished,
      findAll,
      findFinished,
      findSent,
      findNotSent,
      findById,
      findByOriginalId,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  servicesOrdersMaterials: (
    database: Database,
  ): ServiceOrderMaterialRepository => {
    const collection = database.collections.get<ServiceOrderMaterial>(
      'services_orders_materials',
    );

    async function findAll(): Promise<ServiceOrderMaterial[]> {
      const list = await collection.query().fetch();

      return list;
    }

    async function findByOs(id: number): Promise<ServiceOrderMaterial[]> {
      const list = await collection
        .query(Q.where('service_order_id', id))
        .fetch();

      return list;
    }

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    function create({
      serviceOrderId,
      routeId,
      productName,
      productId,
      amount,
    }: CreateServiceOrderMaterial): Promise<ServiceOrderMaterial> {
      return database.action(async () => {
        return collection.create((material) =>
          Object.assign(material, {
            serviceOrderId,
            routeId,
            productName,
            productId,
            amount,
          }),
        );
      });
    }

    function prepareCreate({
      serviceOrderId,
      routeId,
      productName,
      productId,
      amount,
    }: CreateServiceOrderMaterial): ServiceOrderMaterial {
      return collection.prepareCreate((material) =>
        Object.assign(material, {
          serviceOrderId,
          routeId,
          productName,
          productId,
          amount,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(
      servicesOrdersMaterials: ServiceOrderMaterial[],
    ): Promise<void> {
      await database.action(async () => {
        await database.batch(...servicesOrdersMaterials);
      });
    }

    return {
      findAll,
      findByOs,
      count,
      create,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  members: (database: Database): MemberRepository => {
    const collection = database.collections.get<Member>('members');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<Member[]> {
      const members = await collection.query().fetch();

      return members;
    }

    async function findById(id: string): Promise<Member> {
      const member = await collection.find(id);

      return member;
    }

    function prepareCreate({ originalId, name }: CreateMember): Member {
      return collection.prepareCreate((member) =>
        Object.assign(member, {
          originalId,
          name,
        }),
      );
    }
    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(members: Member[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...members);
      });
    }

    return {
      count,
      findAll,
      findById,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  solutions: (database: Database): SolutionRepository => {
    const collection = database.collections.get<Solution>('solutions');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<Solution[]> {
      const solutions = await collection.query().fetch();

      return solutions;
    }

    async function findById(id: string): Promise<Solution> {
      const solution = await collection.find(id);

      return solution;
    }

    function prepareCreate({ originalId, name }: CreateSolution): Solution {
      return collection.prepareCreate((solution) =>
        Object.assign(solution, { originalId, name }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(solutions: Solution[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...solutions);
      });
    }

    return {
      count,
      findAll,
      findById,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  requisitions: (database: Database): RequisitionRepository => {
    const collection = database.collections.get<Requisition>('requisitions');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findByMaterialId(id: number): Promise<Requisition> {
      const requisition = await collection
        .query(Q.where('product_id', id))
        .fetch();

      return requisition[0];
    }

    async function findAll(): Promise<Requisition[]> {
      const requisitions = await collection.query().fetch();

      return requisitions;
    }

    function prepareCreate({
      originalId,
      requisitionId,
      productId,
      productName,
      requisitionAmount,
      routeAmount,
    }: CreateRequisition): Requisition {
      return collection.prepareCreate((requisition) =>
        Object.assign(requisition, {
          originalId,
          requisitionId,
          productId,
          productName,
          requisitionAmount,
          routeAmount,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(requisitions: Requisition[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...requisitions);
      });
    }

    return {
      count,
      findAll,
      findByMaterialId,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  routes: (database: Database): RouteRepository => {
    const collection = database.collections.get<Route>('routes');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findOne(): Promise<Route> {
      const route = await collection.query().fetch();

      return route[0];
    }

    async function create({
      originalId,
      teamName,
      date,
      obs,
      statusDescription,
    }: CreateRoute): Promise<Route> {
      return database.action(async () => {
        await collection.create((route) =>
          Object.assign(route, {
            originalId,
            teamName,
            date,
            obs,
            statusDescription,
          }),
        );
      });
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    return {
      count,
      findOne,
      deleteAll,
      create,
    };
  },
  pointsIps: (database: Database): PointIpRepository => {
    const collection = database.collections.get<PointIp>('points_ips');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<PointIp[]> {
      const pointsIps = await collection.query().fetch();

      return pointsIps;
    }

    async function findByCoords(
      latitude: number,
      longitude: number,
    ): Promise<PointIp | undefined> {
      const pointsIps = await collection
        .query(
          Q.and(Q.where('latitude', latitude), Q.where('longitude', longitude)),
        )
        .fetch();

      return pointsIps[0];
    }

    async function create({
      tag,
      lightFixtureAmount,
      obs,
      imageName,
      latitude,
      longitude,
      postTypeId,
      reactorTypeId,
      reactorPowerId,
      armTypeId,
      lightFixtureTypeId,
      lampTypeId,
      lampPowerId,
      perimeterTypeId,
      placeTypeId,
    }: CreatePointIp): Promise<PointIp> {
      return database.action(async () => {
        return collection.create((pointIp) =>
          Object.assign(pointIp, {
            tag,
            lightFixtureAmount,
            obs,
            imageName,
            latitude,
            longitude,
            postTypeId,
            reactorTypeId,
            reactorPowerId,
            armTypeId,
            lightFixtureTypeId,
            lampTypeId,
            lampPowerId,
            perimeterTypeId,
            placeTypeId,
          }),
        );
      });
    }

    async function batch(pointsIps: PointIp[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...pointsIps);
      });
    }

    return {
      count,
      findAll,
      findByCoords,
      create,
      batch,
    };
  },
  mappings: (database: Database): MappingRepository => {
    const collection = database.collections.get<Mapping>('mappings');

    async function create({
      routeId,
      latitude,
      longitude,
    }: CreateMapping): Promise<Mapping> {
      return database.action(async () => {
        return collection.create((mapping) =>
          Object.assign(mapping, {
            routeId,
            latitude,
            longitude,
          }),
        );
      });
    }

    async function findAll(): Promise<Mapping[]> {
      const mappings = await collection.query().fetch();

      return mappings;
    }

    async function batch(mappings: Mapping[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...mappings);
      });
    }

    return {
      create,
      findAll,
      batch,
    };
  },
  rounds: (database: Database): RoundRepository => {
    const collection = database.collections.get<Round>('rounds');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findById(id: string): Promise<Round> {
      const round = await collection.find(id);

      return round;
    }

    async function findOne(): Promise<Round> {
      const rounds = await collection.query().fetch();

      return rounds[0];
    }

    async function findAll(): Promise<Round[]> {
      const rounds = await collection.query().fetch();

      return rounds;
    }

    async function create({
      originalId,
      statusDescription,
      obs,
      vehicleName,
      teamName,
    }: CreateRound): Promise<Round> {
      return database.action(async () => {
        return collection.create((round) =>
          Object.assign(round, {
            originalId,
            statusDescription,
            obs,
            vehicleName,
            teamName,
          }),
        );
      });
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    return {
      findOne,
      findById,
      findAll,
      count,
      create,
      deleteAll,
    };
  },
  roundsAddresses: (database: Database): RoundAddressRepository => {
    const collection = database.collections.get<RoundAddress>(
      'rounds_addresses',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<RoundAddress[]> {
      const roundsAddress = await collection.query().fetch();

      return roundsAddress;
    }

    async function findByRoundId(roundId: number): Promise<RoundAddress[]> {
      const roundsAddress = await collection
        .query(Q.where('round_id', roundId))
        .fetch();

      return roundsAddress;
    }

    function prepareCreate({
      originalId,
      roundId,
      statusId,
      address,
    }: CreateRoundAddress): RoundAddress {
      return collection.prepareCreate((roundAddress) =>
        Object.assign(roundAddress, {
          originalId,
          roundId,
          statusId,
          address,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(roundsAddress: RoundAddress[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...roundsAddress);
      });
    }

    return {
      count,
      findAll,
      findByRoundId,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  roundsRequisitions: (database: Database): RoundRequisitionRepository => {
    const collection = database.collections.get<RoundRequisition>(
      'rounds_requisitions',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<RoundRequisition[]> {
      const roundsRequisitions = await collection.query().fetch();

      return roundsRequisitions;
    }

    function prepareCreate({
      originalId,
      requisitionId,
      productId,
      productName,
      requisitionAmount,
      roundAmount,
    }: CreateRoundRequisition): RoundRequisition {
      return collection.prepareCreate((roundRequisiton) =>
        Object.assign(roundRequisiton, {
          originalId,
          requisitionId,
          productId,
          productName,
          requisitionAmount,
          roundAmount,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(
      roundsRequisitions: RoundRequisition[],
    ): Promise<void> {
      await database.action(async () => {
        await database.batch(...roundsRequisitions);
      });
    }

    return {
      count,
      findAll,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  roundsMaterials: (database: Database): RoundMaterialRepository => {
    const collection = database.collections.get<RoundMaterial>(
      'rounds_materials',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<RoundMaterial[]> {
      const roundsMaterials = await collection.query().fetch();

      return roundsMaterials;
    }

    function prepareCreate({
      roundId,
      productId,
      amount,
    }: CreateRoundMaterial): RoundMaterial {
      return collection.prepareCreate((roundMaterial) =>
        Object.assign(roundMaterial, {
          roundId,
          productId,
          amount,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(roundsMaterials: RoundMaterial[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...roundsMaterials);
      });
    }

    return {
      count,
      findAll,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  roundsNotifications: (database: Database): RoundNotificationRepository => {
    const collection = database.collections.get<RoundNotification>(
      'rounds_notifications',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<RoundNotification[]> {
      const roundsNotifications = await collection.query().fetch();

      return roundsNotifications;
    }

    async function findById(id: string): Promise<RoundNotification> {
      const roundNotification = await collection.find(id);

      return roundNotification;
    }

    async function findByCoords(
      latitude: number,
      longitude: number,
    ): Promise<RoundNotification | undefined> {
      const notifications = await collection
        .query(
          Q.and(Q.where('latitude', latitude), Q.where('longitude', longitude)),
        )
        .fetch();

      return notifications[0];
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(
      roundsNotifications: RoundNotification[],
    ): Promise<void> {
      await database.action(async () => {
        await database.batch(...roundsNotifications);
      });
    }

    async function create({
      address,
      district,
      city,
      latitude,
      longitude,
      imageName,
      obs,
      notificationTypeId,
      notificationStatusId,
      memberId,
      solutionId,
      pointId,
      pointTag,
    }: CreateRoundNotification): Promise<RoundNotification> {
      return database.action(async () => {
        return collection.create((roundNotification) =>
          Object.assign(roundNotification, {
            address,
            district,
            city,
            latitude,
            longitude,
            imageName,
            obs,
            notificationTypeId,
            notificationStatusId,
            memberId,
            solutionId,
            pointId,
            pointTag,
          }),
        );
      });
    }

    return {
      create,
      count,
      findAll,
      findById,
      findByCoords,
      deleteAll,
      batch,
    };
  },
  roundsMembers: (database: Database): RoundMemberRepository => {
    const collection = database.collections.get<Member>('rounds_members');

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }

    async function findAll(): Promise<RoundMember[]> {
      const members = await collection.query().fetch();

      return members;
    }

    async function findById(id: string): Promise<RoundMember> {
      const member = await collection.find(id);

      return member;
    }

    function prepareCreate({ originalId, name }: CreateRoundMember): Member {
      return collection.prepareCreate((member) =>
        Object.assign(member, {
          originalId,
          name,
        }),
      );
    }
    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(members: RoundMember[]): Promise<void> {
      await database.action(async () => {
        await database.batch(...members);
      });
    }

    return {
      count,
      findAll,
      findById,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  requisitionsCompleted: (
    database: Database,
  ): RequisitionCompletedRepository => {
    const collection = database.collections.get<RequisitionCompleted>(
      'requisitions_completed',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }
    async function findAll(): Promise<RequisitionCompleted[]> {
      const requisitions = await collection.query().fetch();

      return requisitions;
    }

    function prepareCreate({
      originalId,
      routeId,
      openDate,
      closedDate,
    }: CreateRequisitionCompleted): RequisitionCompleted {
      return collection.prepareCreate((requisitionCompleted) =>
        Object.assign(requisitionCompleted, {
          originalId,
          routeId,
          openDate,
          closedDate,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(
      requisitonsCompleted: RequisitionCompleted[],
    ): Promise<void> {
      await database.action(async () => {
        await database.batch(...requisitonsCompleted);
      });
    }

    return {
      count,
      findAll,
      prepareCreate,
      deleteAll,
      batch,
    };
  },
  requisitionsCompletedItems: (
    database: Database,
  ): RequisitionCompletedItemRepository => {
    const collection = database.collections.get<RequisitionCompletedItem>(
      'requisitions_completed_items',
    );

    async function count(): Promise<number> {
      const total = await collection.query().fetchCount();

      return total;
    }
    async function findAll(): Promise<RequisitionCompletedItem[]> {
      const requisitions = await collection.query().fetch();

      return requisitions;
    }

    function prepareCreate({
      requisitionCompletedId,
      productId,
      productName,
      routeQuantity,
      originalQuantity,
      quantity,
    }: CreateRequisitionCompletedItem): RequisitionCompletedItem {
      return collection.prepareCreate((requisitionCompletedItem) =>
        Object.assign(requisitionCompletedItem, {
          requisitionCompletedId,
          productId,
          productName,
          routeQuantity,
          originalQuantity,
          quantity,
        }),
      );
    }

    async function deleteAll(): Promise<void> {
      await database.action(async () => {
        await collection.query().destroyAllPermanently();
      });
    }

    async function batch(
      requisitonsCompletedItems: RequisitionCompletedItem[],
    ): Promise<void> {
      await database.action(async () => {
        await database.batch(...requisitonsCompletedItems);
      });
    }

    async function findByRequisitionCompletedId(
      requisitionCompletedId: number,
    ): Promise<RequisitionCompletedItem[]> {
      const requisitions = await collection
        .query(Q.where('requisition_completed_id', requisitionCompletedId))
        .fetch();

      return requisitions;
    }

    return {
      count,
      findAll,
      prepareCreate,
      deleteAll,
      batch,
      findByRequisitionCompletedId,
    };
  },
};
