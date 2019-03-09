const saveAccessToken = (tk: string) => localStorage.setItem('accessToken', tk)

const clearAccessToken = () => localStorage.removeItem('accessToken')

const getAccessToken = () => localStorage.getItem('accessToken')

export { saveAccessToken, clearAccessToken, getAccessToken }
