/* eslint-disable no-async-promise-executor */
export default function apiFetch(url, data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data ? JSON.stringify(data) : undefined,
            })

            if (response.ok) {
                const responseData = await response.json()
                resolve(responseData)
            } else {
                reject(response.statusText)
            }
        } catch (error) {
            reject(error.message)
        }
    })
}
