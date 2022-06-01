import React, { useCallback, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import offline from '../../../../services/offline';
import RoundAddress from '../../../../database/model/RoundAddress';

import {
  Container,
  RoundAddressList,
  RoundAddressItem,
  RoundAddressItemAddress,
} from './styles';

type RouteParams = {
  roundId: number;
};

const AddressList: React.FC = () => {
  const route = useRoute();
  const database = useDatabase();

  const routeParams = route.params as RouteParams;

  const [roundAddresses, setRoundAddresses] = useState<RoundAddress[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadRoundAddress = async (): Promise<void> => {
        const result = await offline
          .roundsAddresses(database)
          .findByRoundId(routeParams.roundId);

        setRoundAddresses(result);
      };

      loadRoundAddress();
    }, [database, routeParams.roundId]),
  );

  return (
    <Container>
      <RoundAddressList
        data={roundAddresses}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RoundAddressItem>
            <RoundAddressItemAddress>{item.address}</RoundAddressItemAddress>
          </RoundAddressItem>
        )}
      />
    </Container>
  );
};

export default AddressList;
