import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type StackParamList = {
  Dashboard: undefined
  MatchWizard: undefined
};

const Stack = createNativeStackNavigator<StackParamList>()

export default Stack