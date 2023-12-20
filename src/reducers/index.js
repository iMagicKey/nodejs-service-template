const initialState = {
    count: 0,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INC':
            return { ...state, count: state.count + 1 }
        case 'DEC':
            return { ...state, count: state.count - 1 }
        case 'SET':
            return { ...state, count: action.payload }
        default:
            return state
    }
}

export default rootReducer
