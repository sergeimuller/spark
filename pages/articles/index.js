import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from 'react'
import RichEditor from '../../components/richeditor'
import Layout from '../../components/layout'
import { SocketContext } from '../../context/SocketContext'
import { Button,
    Flex,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Stack,
    Checkbox
  } from "@chakra-ui/react"

export default function Articles() {
    const socket = useContext(SocketContext)
    if (socket) {
        console.log('socket available', socket)
        socket.emit('TEST')
    }
    return (
        <Layout>
            <Flex direction="column">
                <FormControl id="title">
                    <FormLabel>Title</FormLabel>
                    <Input type="text" />
                </FormControl>
                <RichEditor /><Stack direction="row" spacing={4}>
                <Button colorScheme="blue" >
                    Publish
                </Button>
                </Stack>
            </Flex>
        </Layout>
    )
}
