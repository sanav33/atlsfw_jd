const initialState = {
    liked_articles: [],
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LIKE':
            return {
                ...state,
                liked_articles: [...state.liked_articles, action.payload],
              };
        case 'DISLIKE':
            const filtered = state.liked_articles.filter(article => article.id !== action.payload)
            return { 
                ...state, 
                liked_articles: filtered,
            }
        default:
            return state;
    }
};