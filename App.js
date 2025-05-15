import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider, useUser } from './src/context/UserContext';
import { ThemeProvider } from './src/context/ThemeContext';
import MainNavigator from './src/navigation/MainNavigation';
import AuthNavigation from './src/navigation/AuthNavigation'; // ⬅️ Novo import

function AppRoutes() {
  const { user } = useUser();

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigation />}  {/* ⬅️ Usa o AuthNavigator agora */}
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
