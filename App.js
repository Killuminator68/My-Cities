import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screen/login';
import Validation from './screen/valid';
import Homepage from './screen/homepage';
import Modify from './screen/modify';
import Inscription from './screen/inscription';
import Cities from './screen/cities';
import Buildings from './screen/buildings';
import Building from './screen/building';
import AddBuilding from './screen/addbuilding';
import Admin from './screen/admin';
import Camera from './screen/camera';
import Promote from './screen/promote';
import Pending from './screen/pending';
import Pendingexe from './screen/pendingexe';
import { Provider } from 'react-redux';
import Store from './store/configStore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
          <Stack.Screen name="inscription" component={Inscription} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="valid" component={Validation} options={{ headerShown: false }} />
          <Stack.Screen name="modify" component={Modify} options={{ headerShown: false }} />
          <Stack.Screen name="cities" component={Cities} options={{ headerShown: false }} />
          <Stack.Screen name="buildings" component={Buildings} options={{ headerShown: false }} />
          <Stack.Screen name="building" component={Building} options={{ headerShown: false }} />
          <Stack.Screen name="addbuilding" component={AddBuilding} options={{ headerShown: false }} />
          <Stack.Screen name="admin" component={Admin} options={{ headerShown: false }} />
          <Stack.Screen name="promote" component={Promote} options={{ headerShown: false }} />
          <Stack.Screen name="pending" component={Pending} options={{ headerShown: false }} />
          <Stack.Screen name="pendingexe" component={Pendingexe} options={{ headerShown: false }} />
          <Stack.Screen name="camera" component={Camera} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}



