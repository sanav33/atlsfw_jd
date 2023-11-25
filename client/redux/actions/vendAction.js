//get
export const getVend = (data) => {
    return {
      type: 'INIT',
      payload: data,
    };
  };
   

//set to true
export const setVend = () => {
    return {
      type: 'TRUE',
    };
  };
