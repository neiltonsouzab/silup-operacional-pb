import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';

import Sync from './sync.tabs.routes';

import SyncHome from '../pages/Sync/Home';

import SyncSend from '../pages/Sync/Send';
import SyncReceive from '../pages/Sync/Receive';
import SyncReceiveFeedaback from '../pages/Sync/ReceiveFeedback';
import SyncSendFeedback from '../pages/Sync/SendFeedback';

const SyncStack = createStackNavigator();

const SyncStackRoutes: React.FC = () => (
  <SyncStack.Navigator initialRouteName="Sync">
    <SyncStack.Screen
      name="Sync"
      component={SyncHome}
      options={{
        header: (props) => <Header {...props} title="Sincronização" />,
      }}
    />

    <SyncStack.Screen
      name="SyncSend"
      component={SyncSend}
      options={{
        header: (props) => <Header {...props} title="Enviar Dados" />,
      }}
    />

    <SyncStack.Screen
      name="SyncReceive"
      component={SyncReceive}
      options={{
        header: (props) => <Header {...props} title="Receber Dados" />,
      }}
    />

    <SyncStack.Screen
      name="SyncReceiveFeedback"
      component={SyncReceiveFeedaback}
      options={{
        header: (props) => (
          <Header {...props} title="Relatório de Recebimento" />
        ),
      }}
    />

    <SyncStack.Screen
      name="SyncSendFeedback"
      component={SyncSendFeedback}
      options={{
        header: (props) => <Header {...props} title="Relatório de Envio" />,
      }}
    />
  </SyncStack.Navigator>
);

export default SyncStackRoutes;
