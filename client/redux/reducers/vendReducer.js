const initialState = {
    isInit: false,
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                isInit: action.payload,
              };
        case 'TRUE':
            return {
                ...state,
                isInit: true,
              };
        default:
            return state;
    }
};