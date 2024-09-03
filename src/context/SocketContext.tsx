import { createContext, useContext, useEffect, useRef, useState } from "react";

export type SocketType = {
    isReady: boolean,
    data: null,
    send: ((v: string | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined
}

export const SocketContext = createContext<SocketType>({
    isReady: false,
    data: null,
    send: (v: string | ArrayBufferLike | Blob | ArrayBufferView) => {}
});

export default function SocketProvider({ children }: { children: any }) {
    const [isReady, setIsReady] = useState(false)
    const [data, setData] = useState(null)
    const ws = useRef<WebSocket>(null)
    console.log(isReady);
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/chat/room/")

        socket.onopen = () => setIsReady(true)
        socket.onclose = () => setIsReady(false)
        socket.onmessage = (event) => {
            console.log(event);
            setData(event.data)
        }

        ws.current = socket

        return () => {
            socket.close()
        }
    }, [])
    return (
        <SocketContext.Provider value={{ isReady, data, send: ws.current?.send.bind(ws.current) }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);