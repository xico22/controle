const initState = {
    authError: null
  }
  
  const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
            ...state,
            authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
            authError: null
            }
        case 'SIGNOUT_SUCESS':
            console.log('logout sucess');
            return state;
        case 'SIGNUP_SUCESS':
            console.log('signup sucess');
            return {
                ...state,
                authError:null
            }
        case 'SIGNUP_ERROR':
            return{
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
  };
  
  export default authReducer;