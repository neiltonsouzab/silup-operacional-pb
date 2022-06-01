import React from 'react';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import RoundAddressList from '../pages/Round/Details/AddressList';
import RoundNotificationList from '../pages/Round/Details/NotificationList';

const DetailsTabBottom = createBottomTabNavigator();

const DetailsTab: React.FC = () => {
  const route = useRoute();

  return (
    <DetailsTabBottom.Navigator
      initialRouteName="RoundAddressList"
      tabBarOptions={{
        style: {
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'RopaSans_400Regular',
          fontSize: 14,
          marginLeft: 16,
        },
        inactiveTintColor: '#C4C4C4',
        activeTintColor: '#1163ad',
      }}
    >
      <DetailsTabBottom.Screen
        name="RoundAddressList"
        component={RoundAddressList}
        initialParams={route.params}
        options={{
          tabBarLabel: 'Endereços',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="list" size={size} color={color} />;
          },
        }}
      />

      <DetailsTabBottom.Screen
        name="NotificationMap"
        component={RoundNotificationList}
        options={{
          tabBarLabel: 'Notificações',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="file" size={size} color={color} />;
          },
        }}
      />
    </DetailsTabBottom.Navigator>
  );
};

export { DetailsTab };
