import { Flex, Center, Box } from "@chakra-ui/react"
import Link from 'next/link'
import { List, ListItem, ListIcon } from "@chakra-ui/react"
import { faHeading, faBold, faItalic, faUnderline, faCode } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {
    return (
        <Flex 
            minHeight="100%"
            width="100%"
            alignItems="stretch"      
            maxW={{ xl: "1200px" }}
            m="0 auto"
            justifyContent="top">   
            <Box flex="2" m={2} w="100px">
                {children}
            </Box>         
            <Box flex="1" m={2} w="100px" bg="green.500">                
            <List spacing={3}>
                <ListItem>
                    <Link href="/">
                        Home
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/articles">
                        Articles
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/campaigns">
                        Campaigns
                    </Link>
                </ListItem>
            </List>
            </Box>
        </Flex> 
    )
}
