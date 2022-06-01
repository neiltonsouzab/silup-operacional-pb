import React, { useCallback } from 'react';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  UserContainer,
  User,
  UserAvatar,
  UserDetails,
  UserName,
  UserOffice,
  CloseButton,
  MenuContainer,
  MenuItem,
  MenuLabel,
  Divisor,
} from './styles';

const MenuDrawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const { signOut, user } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const handelCloseDrawerMenu = useCallback(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, [navigation]);

  return (
    <Container>
      <DrawerContentScrollView>
        <UserContainer>
          <User>
            <UserAvatar>
              <Feather name="user" size={32} color="#1163ad" />
            </UserAvatar>
            <UserDetails>
              <UserName>{user.name}</UserName>
              <UserOffice>Eletricista</UserOffice>
            </UserDetails>
          </User>

          <CloseButton onPress={handelCloseDrawerMenu}>
            <Feather name="x" size={24} color="#1163ad" />
          </CloseButton>
        </UserContainer>

        <MenuContainer>
          <MenuItem onPress={() => navigation.navigate('Sync')}>
            <Feather name="refresh-cw" size={24} color="#C4C4C4" />
            <MenuLabel>Sincronização</MenuLabel>
          </MenuItem>

          <MenuItem onPress={() => navigation.navigate('ServiceOrder')}>
            <Feather name="map" size={24} color="#C4C4C4" />
            <MenuLabel>Rota</MenuLabel>
          </MenuItem>

          <MenuItem onPress={() => navigation.navigate('Round')}>
            <Feather name="truck" size={24} color="#C4C4C4" />
            <MenuLabel>Ronda</MenuLabel>
          </MenuItem>

          <MenuItem onPress={() => navigation.navigate('Notification')}>
            <Feather name="file" size={24} color="#C4C4C4" />
            <MenuLabel>Notificações</MenuLabel>
          </MenuItem>

          {/* <MenuItem onPress={() => navigation.navigate('PointIp')}>
            <Feather name="map-pin" size={24} color="#C4C4C4" />
            <MenuLabel>Ponto IP</MenuLabel>
          </MenuItem> */}

          <MenuItem onPress={() => navigation.navigate('Member')}>
            <Feather name="users" size={24} color="#C4C4C4" />
            <MenuLabel>Membros</MenuLabel>
          </MenuItem>

          <MenuItem onPress={() => navigation.navigate('Requisition')}>
            <Feather name="box" size={24} color="#C4C4C4" />
            <MenuLabel>Requisição</MenuLabel>
          </MenuItem>
        </MenuContainer>

        <Divisor />

        <MenuContainer>
          {/* <MenuItem onPress={() => navigation.navigate('Home')}>
            <Feather name="user" size={24} color="#C4C4C4" />
            <MenuLabel>Perfil</MenuLabel>
          </MenuItem> */}

          <MenuItem onPress={() => navigation.navigate('Password')}>
            <Feather name="lock" size={24} color="#C4C4C4" />
            <MenuLabel>Alterar senha</MenuLabel>
          </MenuItem>

          <MenuItem onPress={handleSignOut}>
            <Feather name="log-out" size={24} color="#C4C4C4" />
            <MenuLabel>Sair</MenuLabel>
          </MenuItem>
        </MenuContainer>
      </DrawerContentScrollView>
    </Container>
  );
};

export default MenuDrawer;
