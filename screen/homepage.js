import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SQLite from 'expo-sqlite';
import city from '../assets/city.jpg';
import logo from '../assets/logo.png';

const Tab = createBottomTabNavigator();

function HomepageScreen({ navigation }) {
  const [buttonPressed, setButtonPressed] = React.useState(false);

  React.useEffect(() => {
    createusertable();
  }, []);

  const createusertable = () => {
    const db = SQLite.openDatabase('data.db');
    db.transaction((trs) => {
      trs.executeSql(
        'CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY NOT NULL, user_name TEXT , user_mail TEXT ,user_pass TEXT);'
      );
    });
  };

  const handleButtonPress = () => {
    setButtonPressed(!buttonPressed);
  };

  return (
    <View style={styles.container}>
      <Image source={city} style={styles.backgroundImage} resizeMode="cover" />
      <Image source={logo} style={styles.logo} />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Découvrez les trésors architecturaux</Text>
        <TouchableHighlight
          style={[styles.headerButton, buttonPressed && styles.headerButtonPressed]}
          underlayColor="lightGray"
          onPress={() => navigation.navigate('login')}
          onHideUnderlay={() => setButtonPressed(false)}
          onShowUnderlay={() => setButtonPressed(true)}
        >
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.headerButton, buttonPressed && styles.headerButtonPressed]}
          underlayColor="lightGray"
          onPress={() => navigation.navigate('cities')}
          onHideUnderlay={() => setButtonPressed(false)}
          onShowUnderlay={() => setButtonPressed(true)}
        >
          <Text style={styles.buttonText}>Villes</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
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
        <Tab.Screen name="Home" component={HomepageScreen} />
        {/*...autres écrans ici...*/}
      </Tab.Navigator>
          </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightGreen',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    top: -40,
    left: 90,
    width: 200,
    height: 200,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  headerButton: {
    margin: 5,
    width: '60%', 
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent:   'center',
    alignItems: 'center',
    marginBottom: 10, 
  },
  headerButtonPressed: {
    backgroundColor: 'lightGray',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

