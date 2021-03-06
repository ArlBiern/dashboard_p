import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

const _fetchUsers = _.memoize(async (dispatch) => {
  const response = await jsonPlaceholder.get("/");

  const requiredData = [];
  response.data.forEach((item) => {
    requiredData.push({
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      city: item.address.city,
    });
  });

  if (response.status === 200) {
    dispatch({ type: "FETCH_USERS", payload: requiredData });
    dispatch({ type: "FETCHING_USERS", payload: false });
  }
});

export const fetchUsers = () => (dispatch) => {
  try {
    _fetchUsers(dispatch);
  } catch (err) {
    alert("Something went wrong... Please check your internet connection. ");
  }
};

export const addUser = (formValues) => async (dispatch) => {
  try {
    const response = await jsonPlaceholder.post("/", formValues);

    if (response.status === 201) {
      dispatch({ type: "ADD_USER", payload: formValues });
    }
  } catch (err) {
    alert("Something went wrong, data were not saved on server.... ");
  }
};

export const editUser = (formValues) => async (dispatch) => {
  try {
    if (formValues.id <= 10) {
      const response = await jsonPlaceholder.patch(
        `/${formValues.id}`,
        formValues
      );
      if (response.status === 200) {
        dispatch({ type: "EDIT_USER", payload: formValues });
      }
    } else {
      dispatch({ type: "EDIT_USER", payload: formValues });
    }
  } catch (err) {
    alert("Something went wrong, data were not saved on server.... ");
  }
};

export const fetchUser = (userId) => async (dispatch, getState) => {
  try {
    const searchedUser = getState().users.filter((user) => user.id === +userId);

    if (!searchedUser.length) {
      const response = await jsonPlaceholder.get(`/${userId}`);

      dispatch({ type: "FETCH_USER", payload: response.data });
    }
  } catch (err) {
    alert("There is no user with given ID in the database...");
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    if (userId <= 10) {
      const response = await jsonPlaceholder.delete(`/${userId}`);
      if (response.status === 200) {
        dispatch({ type: "DELETE_USER", payload: +userId });
      }
    } else {
      dispatch({ type: "DELETE_USER", payload: +userId });
    }
  } catch (err) {
    alert("Something went wrong, data were not saved on server.... ");
  }
};

export const fetchingUsers = (fetchingState) => {
  return {
    type: "FETCHING_USERS",
    payload: fetchingState,
  };
};

export const sortUsers = (direction) => {
  return {
    type: "SORT_USERS",
    payload: direction,
  };
};
