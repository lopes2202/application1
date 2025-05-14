import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider, useUser } from './src/context/UserContext';
import { ThemeProvider } from './src/context/ThemeContext';
import LoginScreen from './src/screens/LoginScreen';
import MainNavigator from './src/navigation/MainNavigation';

function AppRoutes() {
  const { user } = useUser();

  return (
    <NavigationContainer>
      {user ? (
        <MainNavigator />
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </ThemeProvider>
  );
}
