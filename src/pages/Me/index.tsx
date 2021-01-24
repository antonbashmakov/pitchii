import React from 'react';
import { ScrollView } from 'react-native';

import { MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

import avatar from '../../assets/avatar.png';

import {
  Container,
  Title,
  Header,
  Avatar,
  Username,
  Content,
  Stats,
  Separator,
  StatsText,
  StatsColumn,
  StatsNumber,
  ProfileColumn,
  ProfileEdit,
  ProfileText,
  Bookmark,
} from './styles';

const Me: React.FC = (props: Record<string, any>) => {
  const { navigation } = props;

  const onLogoutClick = (): void => {
    console.log('onLogoutClick');
    navigation.navigate('Auth');
  };

  return (
    <Container>
      <Header>
        <AntDesign
          style={{ position: 'absolute', left: 10, top: 10 }}
          name="adduser"
          size={24}
          color="black"
        />
        <Title>Matheus Castro</Title>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        <FontAwesome
          style={{ position: 'absolute', right: 13, top: 12 }}
          name="ellipsis-v"
          size={24}
          color="black"
        />
      </Header>
      <ScrollView>
        <Content>
          <Avatar source={avatar} />
          <Username>@matheuscastroweb</Username>
          <Stats>
            <StatsColumn>
              <StatsNumber>1950</StatsNumber>
              <StatsText>Following</StatsText>
            </StatsColumn>
            <Separator>|</Separator>
            <StatsColumn>
              <StatsNumber>650</StatsNumber>
              <StatsText>Followers</StatsText>
            </StatsColumn>
            <Separator>|</Separator>
            <StatsColumn>
              <StatsNumber>950</StatsNumber>
              <StatsText>Likes</StatsText>
            </StatsColumn>
          </Stats>
          <ProfileColumn>
            <ProfileEdit>
              <ProfileText onPress={() => onLogoutClick()}>Edit profile</ProfileText>
            </ProfileEdit>
            <Bookmark name="bookmark" size={24} color="black" />
          </ProfileColumn>

          <StatsText onClick={() => onLogoutClick()}>Tap to add bio</StatsText>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Me;
