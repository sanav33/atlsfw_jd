export const like = (data) => {
    return {
      type: 'LIKE',
      payload: data,
    };
  };

export const unlike = (data) => {
    return {
      type: 'UNLIKE',
      payload: data,
    };
  };

export const get_list = (data) => {
  return {
    type: 'GET_LIST',
    payload: data,
  };
};