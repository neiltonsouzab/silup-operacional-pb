import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import Round from '../../../database/model/Round';

import offlineRepository from '../../../services/offline';

import Loading from '../../../components/Loading';
import InputDropdown from '../../../components/InputDropdown';
import InputText from '../../../components/InputText';
import ButtonFloat from '../../../components/ButtonFloat';

import {
  Container,
  Content,
  RoundHeader,
  RoundInfo,
  RoundInfoLabel,
  RoundInfoValue,
} from './styles';

interface DropdownProps {
  key: string;
  label: string;
}

type RouteParams = {
  roundNotificationId: string;
  roundId: string;
};

const NotificationFinishStepOne: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();
  const route = useRoute();
  const { roundNotificationId, roundId } = route.params as RouteParams;

  const [round, setRound] = useState<Round>();

  const [dropdownMembers, setDropdownMembers] = useState<DropdownProps[]>([]);
  const [dropdwonSolutions, setDropdwonSolutions] = useState<DropdownProps[]>(
    [],
  );

  const [memberId, setMemberId] = useState('');
  const [solutionId, setSolutionId] = useState('');
  const [obs, setObs] = useState('');

  useFocusEffect(
    useCallback(() => {
      const loadRound = async (): Promise<void> => {
        const rnd = await offlineRepository.rounds(database).findById(roundId);
        setRound(rnd);
      };

      const loadMembers = async (): Promise<void> => {
        const list = await offlineRepository.members(database).findAll();
        const membersList = list.map((member) => ({
          key: member.id,
          label: member.name,
        }));
        setDropdownMembers(membersList);
      };

      const loadSolutions = async (): Promise<void> => {
        const list = await offlineRepository.solutions(database).findAll();
        const solutionsList = list.map((solution) => ({
          key: solution.id,
          label: solution.name,
        }));
        setDropdwonSolutions(solutionsList);
      };

      loadRound();
      loadMembers();
      loadSolutions();
    }, [database, roundId]),
  );

  if (!round) {
    return <Loading text="Carregando informações..." />;
  }

  const navigateToRoundNotificationFinishStepTwo = (): void => {
    if (!memberId || !solutionId) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    navigation.navigate('RoundNotificationFinishStepTwo', {
      roundId,
      roundNotificationId,
      memberId,
      solutionId,
      obs,
    });
  };

  return (
    <Container enabled>
      <Content
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <RoundHeader>
          <RoundInfo>
            <RoundInfoLabel>RONDA</RoundInfoLabel>
            <RoundInfoValue>00{round.originalId}</RoundInfoValue>
          </RoundInfo>

          <RoundInfo>
            <RoundInfoLabel>EQUIPE</RoundInfoLabel>
            <RoundInfoValue>{round.teamName}</RoundInfoValue>
          </RoundInfo>

          <RoundInfo>
            <RoundInfoLabel>VEICULO</RoundInfoLabel>
            <RoundInfoValue>{round.vehicleName}</RoundInfoValue>
          </RoundInfo>
        </RoundHeader>

        <InputDropdown
          label="Membro *"
          modalTitle="Selecione o membro"
          data={dropdownMembers}
          onChange={(selected) => setMemberId(selected.key.toString())}
        />

        <InputDropdown
          label="Solução *"
          modalTitle="Selecione a solução"
          data={dropdwonSolutions}
          onChange={(selected) => setSolutionId(selected.key.toString())}
        />

        <InputText
          label="Observação"
          multiline
          onChangeText={(value) => setObs(value)}
        />
      </Content>

      <ButtonFloat
        icon="arrow-right"
        onPress={navigateToRoundNotificationFinishStepTwo}
      />
    </Container>
  );
};

export default NotificationFinishStepOne;
