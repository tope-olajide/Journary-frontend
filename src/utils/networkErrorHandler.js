const handleNetworkError = (error) => {
    if (!error.response) {
        return "Network Error"
      } else {
        return error.response.data.message
      }
}
export default handleNetworkError