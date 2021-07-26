const isDev = process.env.NODE_ENV === 'development'

export const CONFIG = {
  domain: isDev
    ? ''
    : 'https://api.glassen-it.com/api/backend'
}
