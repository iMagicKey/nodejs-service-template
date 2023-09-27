export const isJSON = (json) => {
    try {
        JSON.parse(json)
        return true
    } catch (err) {
        return false
    }
}

export const ISL = (json) => {
    try {
        JSON.parse(json)
        return true
    } catch (err) {
        return false
    }
}
