import { createContext, useContext, useEffect, useRef, useState } from "react";

export type SocketType = {
    isReady: boolean,
    roomid: any,
    event: any,
    send: ((v: string | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined
}

export const SocketContext = createContext<SocketType>({
    isReady: false,
    roomid: null,
    event: null,
    send: (v: string | ArrayBufferLike | Blob | ArrayBufferView) => {}
});

export default function SocketProvider({ id: roomid, children }: { id: number, children: any }) {
    const [isReady, setIsReady] = useState(false)
    const [event, setEvent] = useState(null)
    const ws = useRef<WebSocket>(null)
    console.log(isReady);
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomid}/`)

        socket.onopen = () => setIsReady(true)
        socket.onclose = () => setIsReady(false)
        socket.onmessage = (event) => setEvent(event.data)

        ws.current = socket

        return () => {
            socket.close()
        }
    }, [])
    return (
        <SocketContext.Provider value={{ isReady, roomid, event, send: ws.current?.send.bind(ws.current) }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);