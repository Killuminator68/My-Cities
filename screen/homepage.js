import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';

import Inscription from './inscription';
import Login from './login';
import Cities from './cities';
import Camera from './camera';

const Tab = createBottomTabNavigator();

function HomepageScreen() {
  const createusertable = () => {
    const db = SQLite.openDatabase('data.db');
    db.transaction((trs) => {
      trs.executeSql(
        'CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY NOT NULL, user_name TEXT , user_mail TEXT ,user_pass TEXT);'
      );
    });
  };

  React.useEffect(() => {
    createusertable();
  }, []);

  const city = require('../assets/city.jpg');
  const logo = require('../assets/logo.png');

  return (
    <ImageBackground source={city} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Welcome to Visit My Cities</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -25,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default function Homepage() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Inscription') {
            iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted';
          } else if (route.name === 'Login') {
            iconName = focused ? 'login' : 'logout';
          } else if (route.name === 'Cities') {
            iconName = focused ? 'map-marker' : 'map-marker-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#545454',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomepageScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Inscription" component={Inscription} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Cities" component={Cities} />
      <Tab.Screen name="Camera" component={Camera} />
    </Tab.Navigator>
  );
}
