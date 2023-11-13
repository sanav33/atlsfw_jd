const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phoneNum: "",
  birthday: "",
  gender: "",
  agreeSubscribe: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};