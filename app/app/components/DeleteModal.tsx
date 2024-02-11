import * as React from "react"
import { Pressable, PressableStateCallbackType, Text, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

export interface DeleteModalProps {
  title: string
  msg: string
  onConfirm: () => void
  onCancel: () => void
  show: boolean
}

/**
 * Describe your component here
 */
export const DeleteModal = observer(function DeleteModal(props: DeleteModalProps) {
  const {
    title,
    msg,
    onConfirm,
    onCancel,
    show
  } = props
  const navigation = useNavigation()

  function $button({ pressed }: PressableStateCallbackType) {
    return [
      $confirmBtn,
      !!pressed && [{opacity: 0.6}]
    ]
  }

  function $cancel({ pressed }: PressableStateCallbackType) {
    return [
      $cancelBtn,
      !!pressed && [{opacity: 0.6}]
    ]
  }

  if (!show) {
    return <></>
  }

  return (
    <View style={$overlay}>
      <View style={$background}></View>
      <View style={$modalContainer}>
        <View style={$modal}>
          <Text style={$header}>{title}</Text>
          <Text style={$body}>{msg}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Pressable style={$button} onPress={onConfirm}>
              <Text style={$confirmBtnText}>Confirm</Text>
            </Pressable>
            <Pressable style={$cancel} onPress={onCancel}>
              <Text style={$btnText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>

    </View>
  )
})

const $overlay: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}

const $confirmBtn: ViewStyle = {
  backgroundColor: colors.primary,
  padding: 10,
  borderRadius: 5,
  marginRight: 5
}


const $confirmBtnText: TextStyle = {
  color: colors.background,
  fontFamily: typography.primary.bold
}

const $cancelBtn: ViewStyle = {
  padding: 10,
  borderRadius: 5
}

const $btnText: TextStyle = {
  color: colors.text,
  fontFamily: typography.primary.bold
}

const $background: ViewStyle = {
  backgroundColor: '#00000060',
  width: '100%',
  height: '100%',
}

const $modal: ViewStyle = {
  width: 300,
  backgroundColor: colors.lightBackground,
  borderRadius: 10,
  padding: 20
}

const $modalContainer: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center'
}

const $header: TextStyle = {
  textAlign: 'center',
  color: colors.text,
  fontFamily: typography.primary.bold,
  fontSize: 16,
  marginBottom: 10
}

const $body: TextStyle = {
  textAlign: 'center',
  color: colors.text,
  fontFamily: typography.primary.medium,
  fontSize: 14
}