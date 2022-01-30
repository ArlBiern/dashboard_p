import validationRules from "./validationRules";

const validationFunction = (e, state) => {
  let { name, value } = e.target;
  let { required, regex } = validationRules[name];

  if (required.value && state[name].value.length === 0) {
    return {
      [name]: {
        ...state[name],
        error: true,
        helperText: required.errorText,
        filled: false,
      },
    };
  } else if (regex.value) {
    let regExTest = new RegExp(regex.value);

    if (!regExTest.test(value)) {
      return {
        [name]: {
          ...state[name],
          error: true,
          helperText: regex.errorText,
          filled: false,
        },
      };
    } else {
      return {
        [name]: {
          ...state[name],
          error: false,
          helperText: "",
          filled: true,
        },
      };
    }
  } else {
    return {
      [name]: {
        ...state[name],
        error: false,
        helperText: "",
        filled: true,
      },
    };
  }
};

export default validationFunction;
