import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchUsers = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/data");

  dispatch({ type: "FETCH_USERS", payload: response.data });
};
