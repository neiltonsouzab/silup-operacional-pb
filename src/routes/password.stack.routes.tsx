import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import UpdatePassword from '../pages/UpdatePassword';

const UpdateStack = createStackNavigator();

const MemberStackRoutes: React.FC = () => (
  <UpdateStack.Navigator initialRouteName="UpdatePassword">
    <UpdateStack.Screen
      name="UpdatePassword"
      component={UpdatePassword}
      options={{
        header: (props) => <Header {...props} title="Alteração de Senha" />,
      }}
    />
  </UpdateStack.Navigator>
);

export default MemberStackRoutes;
