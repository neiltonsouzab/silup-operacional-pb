import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import Requisition from './requisition.tabs.routes';

const RequisitionStack = createStackNavigator();

const RequisitionStackRoutes: React.FC = () => (
  <RequisitionStack.Navigator initialRouteName="Requisition">
    <RequisitionStack.Screen
      name="Requisition"
      component={Requisition}
      options={{
        header: (props) => <Header {...props} title="Requisição" />,
      }}
    />
  </RequisitionStack.Navigator>
);

export default RequisitionStackRoutes;
