import { Heading, Button, Box, Text, IButtonProps } from "@gluestack-ui/themed"

interface BtnProps {
  text: string
  onPress?: () => void
}

function Btn (props: BtnProps) {
  return (
    <Button {...props}>
      <Text>
        {props.text}
      </Text>
    </Button>
  )
}

export default Btn