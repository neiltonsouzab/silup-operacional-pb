import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import OcurrenceType from './model/OcurrenceType';
import Ocurrence from './model/Ocurrence';
import Solution from './model/Solution';
import Member from './model/Member';
import Route from './model/Route';
import ServiceOrder from './model/ServiceOrder';
import ServiceOrderMaterial from './model/ServiceOrderMaterial';
import Requisition from './model/Requisition';
import PostType from './model/PostType';
import ReactorType from './model/ReactorType';
import ReactorPower from './model/ReactorPower';
import ArmType from './model/ArmType';
import LightFixtureType from './model/LightFixtureType';
import LampType from './model/LampType';
import LampPower from './model/LampPower';
import PerimeterType from './model/PerimeterType';
import PlaceType from './model/PlaceType';
import PointIp from './model/PointIp';
import Mapping from './model/Mapping';
import Round from './model/Round';
import RoundAddress from './model/RoundAddress';
import RoundRequisition from './model/RoundRequisition';
import RoundMaterial from './model/RoundMaterial';
import RoundNotification from './model/RoundNotification';
import RoundMember from './model/RoundMember';

import schema from './model/schema';
import RequisitionCompleted from './model/RequisitionCompleted';
import RequisitionCompletedItem from './model/RequisitionCompletedItem';

const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [
    OcurrenceType,
    Ocurrence,
    Member,
    Solution,
    Route,
    ServiceOrder,
    ServiceOrderMaterial,
    Requisition,
    PostType,
    ReactorType,
    ReactorPower,
    ArmType,
    LightFixtureType,
    LampType,
    LampPower,
    PerimeterType,
    PlaceType,
    PointIp,
    Mapping,
    Round,
    RoundAddress,
    RoundRequisition,
    RoundMaterial,
    RoundNotification,
    RoundMember,
    RequisitionCompleted,
    RequisitionCompletedItem,
  ],
  actionsEnabled: true,
});

export default database;
