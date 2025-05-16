import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import { useUser } from '../context/UserContext';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <Ionicons
            name="person-circle-outline"
            size={28}
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('Profile')}
          />
        ),
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function MainNavigator() {
  const { user } = useUser();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (

        <>
          <Stack.Screen name="Drawer" component={DrawerRoutes} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      ) : (

        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
