import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MenuDrawer from '../components/MenuDrawer';

import RequisitionStack from './requisition.stack.routes';
import OsStack from './os.stack.routes';
import NotificationStack from './notification.stack.routes';
import SyncStack from './sync.stack.routes';
import PointIpStack from './pointip.stack.routes';
import MemberStack from './member.stack.routes';
import RoundStack from './round.stack.routes';
import PasswordStack from './password.stack.routes';

const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Sync"
      drawerContent={(props) => <MenuDrawer {...props} />}
    >
      <Drawer.Screen name="ServiceOrder" component={OsStack} />
      <Drawer.Screen name="Notification" component={NotificationStack} />
      <Drawer.Screen name="PointIp" component={PointIpStack} />
      <Drawer.Screen name="Sync" component={SyncStack} />
      <Drawer.Screen name="Requisition" component={RequisitionStack} />
      <Drawer.Screen name="Member" component={MemberStack} />
      <Drawer.Screen name="Round" component={RoundStack} />
      <Drawer.Screen name="Password" component={PasswordStack} />
    </Drawer.Navigator>
  );
};

export default AppRoutes;
