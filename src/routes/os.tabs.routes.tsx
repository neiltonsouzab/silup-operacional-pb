import React from 'react';
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import ServiceOrderList from '../pages/ServiceOrder/Home/List';
import ServiceOrderMap from '../pages/ServiceOrder/Home/Map';
import ServiceOrderSent from '../pages/ServiceOrder/Home/Sent';

import ServiceOrderEditDetails from '../pages/ServiceOrder/Edit/Details';
import ServiceOrderEditBasics from '../pages/ServiceOrder/Edit/Basics';
import ServiceOrderEditMaterials from '../pages/ServiceOrder/Edit/Materials';

const HomeTabBottom = createBottomTabNavigator();
const EditTabBottom = createBottomTabNavigator();

interface EditTabRouteParams {
  serviceOrderId: string;
}

const HomeTab: React.FC = () => {
  return (
    <HomeTabBottom.Navigator
      initialRouteName="ServiceOrderList"
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
        name="ServiceOrderList"
        component={ServiceOrderList}
        options={{
          tabBarLabel: 'Lista',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="list" size={size} color={color} />;
          },
        }}
      />

      <HomeTabBottom.Screen
        name="ServiceOrderMap"
        component={ServiceOrderMap}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="map" size={size} color={color} />;
          },
        }}
      />

      <HomeTabBottom.Screen
        name="ServiceOrderSent"
        component={ServiceOrderSent}
        options={{
          tabBarLabel: 'Enviadas',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="send" size={size} color={color} />;
          },
        }}
      />
    </HomeTabBottom.Navigator>
  );
};

const EditTab: React.FC = () => {
  const route = useRoute();
  const { serviceOrderId } = route.params as EditTabRouteParams;

  return (
    <EditTabBottom.Navigator
      initialRouteName="ServiceOrderEditDetails"
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
      <EditTabBottom.Screen
        name="ServiceOrderEditDetails"
        component={ServiceOrderEditDetails}
        initialParams={{ serviceOrderId }}
        options={{
          tabBarLabel: 'Detalhes',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="map-pin" size={size} color={color} />;
          },
          unmountOnBlur: true,
        }}
      />

      <EditTabBottom.Screen
        name="ServiceOrderEditBasics"
        component={ServiceOrderEditBasics}
        initialParams={{ serviceOrderId }}
        options={{
          tabBarLabel: 'Básico',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="settings" size={size} color={color} />;
          },
        }}
      />

      <EditTabBottom.Screen
        name="ServiceOrderEditMaterials"
        component={ServiceOrderEditMaterials}
        initialParams={{ serviceOrderId }}
        options={{
          tabBarLabel: 'Materiais',
          tabBarIcon: ({ color, size }) => {
            return <Feather name="package" size={size} color={color} />;
          },
        }}
      />
    </EditTabBottom.Navigator>
  );
};

export { HomeTab, EditTab };
