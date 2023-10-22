const initialState = {
    tags_list: [],
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                tags_list: [...(new Set([...state.liked_articles, action.payload]))],
              };
        case 'REMOVE':
            const filtered = state.tags_list.filter(tag => tag != action.payload);
            return { 
                ...state, 
                tags_list: filtered,
            };
        case 'SET_LIST':
            return {
                ...state,
                tags_list: action.payload,
                };
        default:
            return state;
    }
};