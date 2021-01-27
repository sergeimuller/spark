import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.css'
import { SocketProvider } from '../context/SocketContext';
import { useSocket } from '../hooks/useSocket'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function SparkApp({ Component, pageProps }) {
  const socket = useSocket('http://localhost:3000')  
  return (
  <ChakraProvider>
    <SocketProvider value={socket}>
      <Component {...pageProps} />
    </SocketProvider>
  </ChakraProvider>
  )
}

export default SparkApp
