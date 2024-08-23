'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'

import { makeStore } from '@/store/store'


export const StoreProvider = ({ children }) => {
    const storeRef = useRef(null)

    if (!storeRef.current) {
        // Создаем экземпляр store при первом рендере
        storeRef.current = makeStore()
    }

    useEffect(() => {
        if (storeRef.current != null) {
            // Настраиваем слушатели с использованием предоставленных значений по умолчанию
            // Опционально, но необходимо для поведения `refetchOnFocus`/`refetchOnReconnect`
            const unsubscribe = setupListeners(storeRef.current.dispatch)
            return unsubscribe
        }
    }, [])

    return <Provider store={storeRef.current}>{children}</Provider>
}
