import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import PointIpMap from '../pages/PointIp/Map';
import PointIpCreateStepOne from '../pages/PointIp/CreateStepOne';
import PointIpCreateStepTwo from '../pages/PointIp/CreateStepTwo';
import PointIpCreated from '../pages/PointIp/Created';

const PointIpStack = createStackNavigator();

const PointIpStackRoutes: React.FC = () => (
  <PointIpStack.Navigator initialRouteName="PointIpMap">
    <PointIpStack.Screen
      name="PointIpMap"
      component={PointIpMap}
      initialParams={{
        latitude: undefined,
        longitude: undefined,
        latitudeDelta: undefined,
        longitudeDelta: undefined,
      }}
      options={{
        header: (props) => <Header {...props} title="Ponto IP" />,
      }}
    />

    <PointIpStack.Screen
      name="PointIpCreateStepOne"
      component={PointIpCreateStepOne}
      options={{
        header: (props) => <Header {...props} title="Novo Ponto IP" />,
      }}
    />

    <PointIpStack.Screen
      name="PointIpCreateStepTwo"
      component={PointIpCreateStepTwo}
      options={{
        header: (props) => <Header {...props} title="Novo Ponto IP" />,
      }}
    />

    <PointIpStack.Screen
      name="PointIpCreated"
      component={PointIpCreated}
      options={{
        headerShown: false,
      }}
    />
  </PointIpStack.Navigator>
);

export default PointIpStackRoutes;
