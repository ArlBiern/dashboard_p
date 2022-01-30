import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

const _fetchUsers = _.memoize(async (dispatch) => {
  const response = await jsonPlaceholder.get("/data");

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
    const response = await jsonPlaceholder.post("/data", formValues);

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
        `/data/${formValues.id}`,
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
      const response = await jsonPlaceholder.get(`/data/${userId}`);

      dispatch({ type: "FETCH_USER", payload: response.data });
    }
  } catch (err) {
    alert("There is no user with given ID in the database...");
  }
};
