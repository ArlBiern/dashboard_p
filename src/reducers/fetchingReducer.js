const fetchingUsers = (state = true, action) => {
  switch (action.type) {
    case "FETCHING_USERS":
      return action.payload;
    default:
      return state;
  }
};

export default fetchingUsers;
