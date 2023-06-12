import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';

import Inscription from './inscription';
import Login from './login';
import Cities from './cities';
import Building from './building';

const Tab = createBottomTabNavigator();

function HomepageScreen({ navigation }) {
  const [buttonPressed, setButtonPressed] = React.useState(false);

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

  const handleButtonPress = () => {
    setButtonPressed(!buttonPressed);
  };

  const city = require('../assets/city.jpg');
  const logo = require('../assets/logo.png');

  return (
    <ImageBackground source={city} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <Text style={styles.title}>Welcome to Visit My Cities</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Change 'center' to 'flex-start'
    alignItems: 'center',
    marginTop: -20, // Add margin at the top
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
    marginBottom: 20
  }
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
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-out';
          } else if (route.name === 'Cities') {
            iconName = focused ? 'locate' : 'navigate';
          } else if (route.name === 'Building') {
            iconName = focused ? 'home' : 'home-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: 'white',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomepageScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Inscription" component={Inscription} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Cities" component={Cities} />
      <Tab.Screen name="Building" component={Building} />
    </Tab.Navigator>
  );
}
