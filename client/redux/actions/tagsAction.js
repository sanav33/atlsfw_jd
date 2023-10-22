export const set_tags_list = (data) => {
    return {
      type: 'SET_LIST',
      payload: data, //a new array of tags
    };
};

export const add_tag = (data) => {
    return {
      type: 'ADD',
      payload: data, //a single tag
    };
  };

export const remove_tag = (data) => {
    return {
      type: 'REMOVE',
      payload: data, //a single tag
    };
  };