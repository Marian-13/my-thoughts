const AUTH_TOKEN_KEY = 'auth_token_key'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY)
export const saveAuthToken = newToken => localStorage.setItem(AUTH_TOKEN_KEY, newToken)
export const deleteAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY)

export const isUserLoggedIn = () => getAuthToken()
