import React, { useState, useEffect } from 'react'

export default function WebSocketClient() {
    const [webSocket, setWebSocket] = useState(null)

    useEffect(() => {
        const ws = new WebSocket('/socket')
        ws.onopen = () => {
            console.log('Connected to WebSocket server')
            setWebSocket(ws)
        }

        ws.onmessage = (event) => {
            console.log(JSON.parse(event.data))
        }

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server')
            setWebSocket(null)
        }

        return () => {
            ws.close()
        }
    }, [setWebSocket])

    return <div>{webSocket ? <p>WebSocket connected</p> : <p>WebSocket disconnected</p>}</div>
}
