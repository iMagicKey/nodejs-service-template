import { createSlice } from '@/store/createSlice'

const initialState = {
    value: 0,
    status: 'idle',
}

const fetchCount = async (amount) => {
    const response = await fetch('/api/counter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
    })
    const result = await response.json()

    return result
}

// Если вы не используете асинхронные thunks, вы можете использовать `createSlice`.
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: (create) => ({
        increment: create.reducer((state) => {
            state.value += 1
        }),
        decrement: create.reducer((state) => {
            state.value -= 1
        }),
        set: create.reducer((state, action) => {
            state.value = action.payload
        }),
        incrementByAmount: create.reducer((state, action) => {
            state.value += action.payload
        }),
        setAsync: create.asyncThunk(
            async (amount) => {
                const response = await fetchCount(amount)

                return response.data
            },
            {
                pending: (state) => {
                    state.status = 'loading'
                },
                fulfilled: (state, action) => {
                    state.status = 'idle'
                    state.value += action.payload
                },
                rejected: (state) => {
                    state.status = 'failed'
                },
            }
        ),
    }),
    selectors: {
        selectCount: (counter) => counter.value,
        selectStatus: (counter) => counter.status,
    },
})

// Генерация action creators для каждой функции редьюсера.
export const { decrement, increment, set, incrementByAmount, setAsync } = counterSlice.actions

// Селекторы, возвращаемые `slice.selectors`, принимают корневое состояние в качестве первого аргумента.
export const { selectCount, selectStatus } = counterSlice.selectors

// Мы также можем писать thunks вручную, которые могут содержать как синхронную, так и асинхронную логику.
// Вот пример условного диспетчеризации действий на основе текущего состояния.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
        dispatch(incrementByAmount(amount))
    }
}
