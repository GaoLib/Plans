export const getToken = () => {
    const token = localStorage.getItem('TOKEN')
    if (token) {
      return token
    } else {
      return false
    }
}