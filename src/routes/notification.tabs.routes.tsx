import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';
import NotificationMap from '../pages/Notification/Home/Map';
import NotificationList from '../pages/Notification/Home/List';

const HomeTabBottom = createBottomTabNavigator();

const HomeTab: React.FC = () => {
  return (
    <HomeTabBottom.Navigator
      initialRouteName="NotificationList"
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
      <HomeTabBottom.Screen
        name="NotificationList"
        component={NotificationList}
        options={{
          tabBarLabel: 'Lista',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="list" size={size} color={color} />;
          },
        }}
      />

      <HomeTabBottom.Screen
        name="NotificationMap"
        component={NotificationMap}
        initialParams={{
          address: undefined,
          latitude: undefined,
          longitude: undefined,
        }}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="map" size={size} color={color} />;
          },
        }}
      />
    </HomeTabBottom.Navigator>
  );
};

export { HomeTab };
