import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Feather } from '@expo/vector-icons';

import Send from '../pages/Sync/Send';
import Receive from '../pages/Sync/Receive';

const Tab = createMaterialTopTabNavigator();

const AppTab: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="SyncSend"
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
        name="SyncSend"
        component={Send}
        options={{
          tabBarLabel: 'Enviar',
          tabBarIcon: ({ color }) => {
            return <Feather name="upload" size={20} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="SyncReceive"
        component={Receive}
        options={{
          tabBarLabel: 'Receber',
          tabBarIcon: ({ color }) => {
            return <Feather name="download" size={20} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTab;
