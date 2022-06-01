import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';

import database from '../database';

import { AuthProvider } from './auth';
import { GeoProvider } from './geo';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <DatabaseProvider database={database}>
      <GeoProvider>
        <>{children}</>
      </GeoProvider>
    </DatabaseProvider>
  </AuthProvider>
);

export default AppProvider;
