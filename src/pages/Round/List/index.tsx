import React, { useCallback, useState } from 'react';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import Round from '../../../database/model/Round';
import offline from '../../../services/offline';
import {
  Container,
  RoundList,
  RoundItem,
  RoundItemInfo,
  RoundItemInfoLabel,
  RoundItemInfoValue,
  RoundEmptyText,
} from './styles';

const List: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();

  const [rounds, setRounds] = useState<Round[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadRoundAddresses = async (): Promise<void> => {
        const round = await offline.rounds(database).findAll();

        setRounds(round);
      };

      loadRoundAddresses();
    }, [database]),
  );

  const handleNavigateToRoundDetails = useCallback(
    (roundId: number) => {
      navigation.navigate('RoundDetails', { roundId });
    },
    [navigation],
  );

  return (
    <Container>
      {rounds.length > 0 ? (
        <RoundList
          data={rounds}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <RoundItem
              onPress={() => handleNavigateToRoundDetails(item.originalId)}
            >
              <RoundItemInfo>
                <RoundItemInfoLabel>RONDA</RoundItemInfoLabel>
                <RoundItemInfoValue>0000{item.originalId}</RoundItemInfoValue>
              </RoundItemInfo>
              <RoundItemInfo>
                <RoundItemInfoLabel>EQUIPE</RoundItemInfoLabel>
                <RoundItemInfoValue>{item.teamName}</RoundItemInfoValue>
              </RoundItemInfo>
              <RoundItemInfo>
                <RoundItemInfoLabel>VEÍCULO</RoundItemInfoLabel>
                <RoundItemInfoValue>{item.vehicleName}</RoundItemInfoValue>
              </RoundItemInfo>
            </RoundItem>
          )}
        />
      ) : (
        <RoundEmptyText>Nenhuma ronda encontrada.</RoundEmptyText>
      )}
    </Container>
  );
};

export default List;
