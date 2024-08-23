import Counter from '@/components/Counter'
import WebSocketClient from '@/components/WebSocketClient'

export const metadata = {
    title: 'DoubleFun NextJS Template',
}

export default function HomePage() {
    return (
        <>
            <Counter />
            <WebSocketClient />
        </>
    )
}
