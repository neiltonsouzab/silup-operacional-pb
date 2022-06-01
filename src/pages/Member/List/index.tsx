import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '@nozbe/watermelondb/hooks';
import { Feather } from '@expo/vector-icons';

import Member from '../../../database/model/Member';
import offlineRepository from '../../../services/offline';

import {
  Container,
  MemberList,
  MemberItem,
  MemberItemAvatar,
  MemberItemName,
  MemberListEmptyText,
} from './styles';

const List: React.FC = () => {
  const database = useDatabase();

  const [members, setMembers] = useState<Member[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadMembers = async (): Promise<void> => {
        const membersList = await offlineRepository.members(database).findAll();

        setMembers(membersList);
      };

      loadMembers();
    }, [database]),
  );

  return (
    <Container>
      {members.length > 0 ? (
        <MemberList>
          {members.map((member) => (
            <MemberItem key={member.id}>
              <MemberItemAvatar>
                <Feather name="user" size={32} color="#1163ad" />
              </MemberItemAvatar>
              <MemberItemName>{member.name}</MemberItemName>
            </MemberItem>
          ))}
        </MemberList>
      ) : (
        <MemberListEmptyText>Nenhum membro encontrado.</MemberListEmptyText>
      )}
    </Container>
  );
};

export default List;
