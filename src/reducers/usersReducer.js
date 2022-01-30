const posts = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;
    case "FETCH_USER":
      return [...state, action.payload];
    case "ADD_USER":
      return [...state, action.payload];
    case "EDIT_USER":
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return {
          ...item,
          ...action.payload,
        };
      });
    default:
      return state;
  }
};

export default posts;
