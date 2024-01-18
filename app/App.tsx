import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/nav/navigation'
import DashboardScreen from './src/screens/Dashboard'
import MatchWizardScreen from './src/screens/wizard/MatchWizard'
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Dashboard" component={DashboardScreen}/>
          <Stack.Screen name="MatchWizard" component={MatchWizardScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}