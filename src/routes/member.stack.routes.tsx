import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import MemberList from '../pages/Member/List';

const MemberStack = createStackNavigator();

const MemberStackRoutes: React.FC = () => (
  <MemberStack.Navigator initialRouteName="MemberList">
    <MemberStack.Screen
      name="MemberList"
      component={MemberList}
      options={{
        header: (props) => <Header {...props} title="Membros" />,
      }}
    />
  </MemberStack.Navigator>
);

export default MemberStackRoutes;
