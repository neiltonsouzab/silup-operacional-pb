import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Feather } from '@expo/vector-icons';

import RouteRequisitions from '../pages/Requisition/Route';
import RoundRequisitions from '../pages/Requisition/Round';
import CompletedRequisitions from '../pages/Requisition/Completed';

const Tab = createMaterialTopTabNavigator();

const AppTab: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="RouteRequisition"
      tabBarOptions={{
        showIcon: true,
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
        indicatorContainerStyle: {
          backgroundColor: '#1163ad',
        },
        inactiveTintColor: '#fff',
        activeTintColor: '#FFF',
        indicatorStyle: {
          borderColor: '#EB5757',
          borderWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="RouteRequisition"
        component={RouteRequisitions}
        options={{
          tabBarLabel: 'Rota',
          tabBarIcon: ({ color }) => {
            return <Feather name="map" size={20} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="CompletedRequisition"
        component={CompletedRequisitions}
        options={{
          tabBarLabel: 'Concluídas',
          tabBarIcon: ({ color }) => {
            return <Feather name="check" size={20} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTab;
