import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import NotificationSelectLocation from '../pages/Notification/SelectLocation';
import NotificationSearchLocation from '../pages/Notification/SearchLocation';
import NotificationSearchPlatelet from '../pages/Notification/SearchPlatelet';
import NotificationChangeLocation from '../pages/Notification/ChangeLocation';
import NotificationSelectTypeAndImage from '../pages/Notification/SelectTypeAndImage';
import NotificationCreated from '../pages/Notification/Created';

import { HomeTab as NotificationHomeTab } from './notification.tabs.routes';

const NotificationStack = createStackNavigator();

const NotificationStackRoutes: React.FC = () => (
  <NotificationStack.Navigator initialRouteName="NotificationMap">
    <NotificationStack.Screen
      name="NotificationHome"
      component={NotificationHomeTab}
      options={{
        header: (props) => <Header {...props} title="Notificações" />,
      }}
    />

    <NotificationStack.Screen
      name="NotificationSelectLocation"
      component={NotificationSelectLocation}
      initialParams={{
        address: undefined,
        latitude: undefined,
        longitude: undefined,
      }}
      options={{
        header: (props) => (
          <Header {...props} title="Selecione a localização" />
        ),
      }}
    />

    <NotificationStack.Screen
      name="NotificationSearchLocation"
      component={NotificationSearchLocation}
      options={{
        header: (props) => <Header {...props} title="Pesquise a localização" />,
      }}
    />

    <NotificationStack.Screen
      name="NotificationSearchPlatelet"
      component={NotificationSearchPlatelet}
      options={{
        header: (props) => <Header {...props} title="Pesquise a plaqueta" />,
      }}
    />

    <NotificationStack.Screen
      name="NotificationChangeLocation"
      component={NotificationChangeLocation}
      options={{
        header: (props) => <Header {...props} title="Informe a localização" />,
      }}
    />

    <NotificationStack.Screen
      name="NotificationSelectTypeAndImage"
      component={NotificationSelectTypeAndImage}
      options={{
        header: (props) => <Header {...props} title="Informe o tipo" />,
      }}
    />

    <NotificationStack.Screen
      name="NotificationCreated"
      component={NotificationCreated}
      options={{
        headerShown: false,
      }}
    />
  </NotificationStack.Navigator>
);

export default NotificationStackRoutes;
