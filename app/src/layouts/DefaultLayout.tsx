import { SafeAreaView } from 'react-native'
import { Heading, Button } from "@gluestack-ui/themed"
import Header from '../components/nav/Header'
import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
  title?: string
}

function DefaultLayout(props: DefaultLayoutProps) {
  return (
    <SafeAreaView>
      <Header title={props.title} />
      {props.children}
    </SafeAreaView>
  )
}

export default DefaultLayout