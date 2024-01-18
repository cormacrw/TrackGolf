import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Heading, Button } from "@gluestack-ui/themed"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../nav/navigation'
import DefaultLayout from '../layouts/DefaultLayout'

interface DashboardScreenProps extends NativeStackScreenProps<StackParamList, 'Dashboard'> {
}

function DashboardScreen (props: DashboardScreenProps) {
  const { navigation } = props
  return (
    <DefaultLayout title="Dashboard">
      <Button onPress={() => navigation.navigate('MatchWizard')}>
        <Text>New Match</Text>
      </Button>
    </DefaultLayout>
  )
}

export default DashboardScreen