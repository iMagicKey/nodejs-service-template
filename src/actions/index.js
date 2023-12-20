export const inc = () => ({
    type: 'INC',
})

export const dec = () => ({
    type: 'DEC',
})

export const set = (count) => ({
    type: 'SET',
    payload: count,
})
