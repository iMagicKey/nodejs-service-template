import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { inc, dec, set } from '@/actions'
import apiFetch from '@/utils/api-fetch'

function MainPage({ count }) {
    const dispatch = useDispatch()

    const handlerIncClick = () => {
        dispatch(inc())
    }

    const handlerDecClick = () => {
        dispatch(dec())
    }

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
                <div className="border border-solid border-black/10 px-6 py-2 bg-black/5" onClick={handlerIncClick}>
                    INC
                </div>
                <button className="border border-solid border-black/10 px-6 py-2 bg-black/5" onClick={handlerDecClick}>
                    DEC
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

const mapStateToProps = (state) => ({
    count: state.count,
})

export default connect(mapStateToProps)(MainPage)
