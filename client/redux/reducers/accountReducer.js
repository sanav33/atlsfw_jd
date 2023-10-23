const initialState = {
    acct_type: 3,
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCT_TYPE':
            return {
                ...state,
                acct_type: action.payload,
              };
        default:
            return state;
    }
};