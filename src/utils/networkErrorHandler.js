const handleNetworkError = (error) => {
  console.log(error)
    if (!error || !error.response) {
        return "Network Error"
      } else if(error.response) {
        return error.response.data.message
      }
      return error
}
export default handleNetworkError