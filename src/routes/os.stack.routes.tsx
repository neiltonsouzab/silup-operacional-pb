import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import {
  HomeTab as ServiceOrderHomeTab,
  EditTab as ServiceOrderEditTab,
} from './os.tabs.routes';

import ServiceOrderDetails from '../pages/ServiceOrder/Details';
import ServiceOrderFinishStepOne from '../pages/ServiceOrder/Finish/FinishStepOne';
import ServiceOrderFinishStepTwo from '../pages/ServiceOrder/Finish/FinishStepTwo';
import ServiceOrderFinished from '../pages/ServiceOrder/Finish/Finished';

const OsStack = createStackNavigator();

const OsStackRoutes: React.FC = () => (
  <OsStack.Navigator initialRouteName="ServiceOrderHome">
    <OsStack.Screen
      name="ServiceOrderHome"
      component={ServiceOrderHomeTab}
      options={{
        header: (props) => <Header {...props} title="Ordens de serviços" />,
      }}
    />

    <OsStack.Screen
      name="ServiceOrderEdit"
      component={ServiceOrderEditTab}
      options={{
        header: (props) => <Header {...props} title="Edição de O.S" />,
      }}
    />

    <OsStack.Screen
      name="ServiceOrderDetails"
      component={ServiceOrderDetails}
      options={{
        header: (props) => <Header {...props} title="Detalhes da O.S" />,
      }}
    />

    <OsStack.Screen
      name="ServiceOrderFinishStepOne"
      component={ServiceOrderFinishStepOne}
      options={{
        header: (props) => <Header {...props} title="Finalizar O.S" />,
      }}
    />

    <OsStack.Screen
      name="ServiceOrderFinishStepTwo"
      component={ServiceOrderFinishStepTwo}
      options={{
        header: (props) => <Header {...props} title="Finalizar O.S" />,
      }}
    />

    <OsStack.Screen
      name="ServiceOrderFinished"
      component={ServiceOrderFinished}
      options={{
        headerShown: false,
      }}
    />
  </OsStack.Navigator>
);

export default OsStackRoutes;
