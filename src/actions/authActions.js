

const url = 'https://journary.herokuapp.com/api/user/';
export function setCurrentUser(userData) {
    return {
      type: 'SET_CURRENT_USER',
      userData
    };
  }

  export const signUp = async (userData)=> {
    const { dispatch } = React.useContext(Store);
    return(<>
      const response = await axios.post(`${url}signup`, userData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common.authorization = token;
    dispatch(setCurrentUser(jsonwebtoken
      .decode(localStorage.getItem('token'))));</>
    )
    
}