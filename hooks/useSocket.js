import { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";

export function useSocket(url) {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socketIo = socketIOClient(url)

        setSocket(socketIo)

        function cleanup() {
        socketIo.disconnect()
        }
        return cleanup

        // should only run once and not on every re-render,
        // so pass an empty array
    }, [])

    return socket
}