'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { decrement, increment, set, incrementIfOdd, setAsync, selectCount, selectStatus } from '@/store/slices/counter'
import apiFetch from '@/utils/api-fetch'

export default function Counter() {
    const dispatch = useDispatch()
    const count = useSelector(selectCount)
    const status = useSelector(selectStatus)

    const handleInputChange = (event) => {
        if (event.target.value) {
            dispatch(set(event.target.value))
        }
    }

    const handleSendClick = () => {
        apiFetch('/api/success', {
            count,
        })
    }

    return (
        <div className="p-4 flex flex-col">
            <div className="max-w-screen-2xl mx-auto overflow-hidden flex flex-col text-[2em]">Count: {count}</div>
            <div className="flex gap-5">
                <div className="cursor-pointer border border-solid border-black/10 px-6 py-2 bg-black/5" onClick={() => dispatch(increment())}>
                    INC
                </div>
                <button className="cursor-pointer border border-solid border-black/10 px-6 py-2 bg-black/5" onClick={() => dispatch(decrement())}>
                    DEC
                </button>
                <button
                    className="cursor-pointer border border-solid border-black/10 px-6 py-2 bg-black/5"
                    onClick={() => dispatch(incrementIfOdd(10))}
                >
                    INC ODD
                </button>
                <button
                    className="cursor-pointer border border-solid border-black/10 px-6 py-2 bg-black/5 disabled:opacity-50"
                    disabled={status !== 'idle'}
                    onClick={() => dispatch(setAsync(Math.floor(Math.random() * 1000)))}
                >
                    GET ASYNC ({status})
                </button>

                <input
                    className="border border-solid border-black/10 px-6 py-2 bg-black/5"
                    onChange={handleInputChange}
                    value={count}
                    type="number"
                    placeholder="10"
                />
            </div>
            <div className="mt-3">
                <button className="border text-white border-solid border-blue-900/30 px-6 py-2 bg-blue-600/60" onClick={handleSendClick}>
                    Send
                </button>
            </div>
        </div>
    )
}
