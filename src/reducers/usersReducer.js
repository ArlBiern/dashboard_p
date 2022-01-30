const posts = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    case "FETCH_USER":
      return [...state, action.payload];
    case "ADD_USER":
      return [...state, action.payload];
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id !== action.payload.id) {
          return user;
        }
        return {
          ...user,
          ...action.payload,
        };
      });
    case "DELETE_USER": {
      return state.filter((user) => user.id !== action.payload);
    }
    default:
      return state;
  }
};

export default posts;
