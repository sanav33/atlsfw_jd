const initialState = {
    user_id: "",
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ID':
            return {
                ...state,
                user_id: action.payload,
              };
        default:
            return state;
    }
};