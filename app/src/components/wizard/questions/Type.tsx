import { Heading, Button, Box, Text } from "@gluestack-ui/themed"
import Btn from '../../form/Btn'

function TypeQuestion () {
  return (
    <Box>
      <Text>What type of game did you play?</Text>
      <Btn text="Friendly" />
      <Btn text="Division Rivals" />
      <Btn text="Champions" />
    </Box>
  )
}

export default TypeQuestion