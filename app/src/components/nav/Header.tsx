import { Heading, Button, Box } from "@gluestack-ui/themed"

interface HeaderProps {
  title?: string
}

function Header (props: HeaderProps) {
  return (
    <Box>
      <Heading textAlign='center'>{props.title}</Heading>
    </Box>
  )
}

export default Header