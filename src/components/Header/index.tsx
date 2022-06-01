import React, { useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

import { StackHeaderProps } from '@react-navigation/stack';

import {
  Container,
  Content,
  MenuButton,
  Title,
  BackButtonContainer,
  BackButton,
} from './styles';

interface HeaderProps extends StackHeaderProps {
  title: string;
  onBack?(): void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, navigation }) => {
  const [canGoBack, setCanGoBack] = useState(navigation.canGoBack());

  const handleOpenDrawerMenu = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <Container>
      <Content>
        <MenuButton onPress={handleOpenDrawerMenu}>
          <Feather name="menu" color="#FFF" size={32} />
        </MenuButton>

        <Title>{title}</Title>

        <BackButtonContainer>
          {canGoBack && (
            <BackButton onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" color="#FFF" size={32} />
            </BackButton>
          )}
        </BackButtonContainer>
      </Content>
    </Container>
  );
};

export default Header;
