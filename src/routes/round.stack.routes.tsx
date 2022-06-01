import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import RoundNotificationCreate from '../pages/Round/NotificationCreate';
import RoundNotificationCreated from '../pages/Round/NotificationCreated';
import RoundNotificationFinishStepOne from '../pages/Round/NotificationFinishStepOne';
import RoundNotificationFinishStepTwo from '../pages/Round/NotificationFinishStepTwo';
import RoundNotificationFinished from '../pages/Round/NotificationFinished';
import RoundList from '../pages/Round/List';

import NotificationSelectLocation from '../pages/Round/SelectLocation';
import NotificationSearchLocation from '../pages/Round/SearchLocation';
import NotificationSearchPlatelet from '../pages/Round/SearchPlatelet';
import NotificationChangeLocation from '../pages/Round/ChangeLocation';
import NotificationSelectTypeAndImage from '../pages/Round/SelectTypeAndImage';

import { DetailsTab as RoundDetailsTab } from './round.tabs.routes';

const RoundStack = createStackNavigator();

const RoundStackRoutes: React.FC = () => (
  <RoundStack.Navigator initialRouteName="RoundList">
    <RoundStack.Screen
      name="RoundList"
      component={RoundList}
      options={{
        header: (props) => <Header {...props} title="Rondas" />,
      }}
    />

    <RoundStack.Screen
      name="RoundDetails"
      component={RoundDetailsTab}
      options={{
        header: (props) => <Header {...props} title="Detalhes Ronda" />,
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationSelectLocation"
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

    <RoundStack.Screen
      name="RoundNotificationSearchLocation"
      component={NotificationSearchLocation}
      options={{
        header: (props) => <Header {...props} title="Pesquise a localização" />,
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationSearchPlatelet"
      component={NotificationSearchPlatelet}
      options={{
        header: (props) => <Header {...props} title="Pesquise a plaqueta" />,
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationChangeLocation"
      component={NotificationChangeLocation}
      options={{
        header: (props) => <Header {...props} title="Informe a localização" />,
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationSelectTypeAndImage"
      component={NotificationSelectTypeAndImage}
      options={{
        header: (props) => <Header {...props} title="Informe o tipo" />,
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationCreate"
      component={RoundNotificationCreate}
      options={{
        header: (props) => (
          <Header {...props} title="Ronda - Nova Notificação" />
        ),
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationCreated"
      component={RoundNotificationCreated}
      options={{
        headerShown: false,
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationFinishStepOne"
      component={RoundNotificationFinishStepOne}
      options={{
        header: (props) => (
          <Header {...props} title="Ronda - Concluir Notificação" />
        ),
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationFinishStepTwo"
      component={RoundNotificationFinishStepTwo}
      options={{
        header: (props) => (
          <Header {...props} title="Ronda - Concluir Notificação" />
        ),
      }}
    />

    <RoundStack.Screen
      name="RoundNotificationFinished"
      component={RoundNotificationFinished}
      options={{
        headerShown: false,
      }}
    />
  </RoundStack.Navigator>
);

export default RoundStackRoutes;
