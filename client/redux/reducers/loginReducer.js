const initialState = {
    isLogged: false,
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLogged: !state.isLogged,
              };
        default:
            return state;
    }
};