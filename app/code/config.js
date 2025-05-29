export const WEB_PORT = Number(process.env.WEB_PORT) || 8080
export const WEB_HTTPS = process.env.WEB_HTTPS === 'true' || false

export const SHEDULER_INTERVAL = Number(process.env.SHEDULER_INTERVAL) || 15000
