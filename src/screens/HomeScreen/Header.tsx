import React from 'react';
import { Image, View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { homeStyles } from './HomeScreent.styles';

const Header = () => {
  return (
    <View style={homeStyles.headerRow}>
      <Image
        style={homeStyles.logo}
        source={{ uri: 'https://i.imgur.com/0wO8m1H.png' }} // placeholder school logo
      />
      <View style={homeStyles.schoolCol}>
        <Text style={homeStyles.schoolTitle}>St. Xavier’s Public School</Text>
        <Text style={homeStyles.schoolSub}>Student Portal</Text>
      </View>

      <View style={homeStyles.headerRight}>
        <View style={homeStyles.bellWrap}>
          <IconButton icon="bell-outline" size={22} />
          <View style={homeStyles.badge}><Text style={homeStyles.badgeText}>3</Text></View>
        </View>
        <Avatar.Image
          size={42}
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
        />
      </View>
    </View>
  );
};
export default Header;
