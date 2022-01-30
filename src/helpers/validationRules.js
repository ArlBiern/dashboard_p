const validationRules = {
  name: {
    required: {
      value: true,
      errorText: `Name field is required`,
    },
    regex: {
      value: /^[a-zA-Z ]{2,50}$/,
      errorText: `This input should contain only letters (minimum 2 and maximum 50)`,
    },
  },
  username: {
    required: {
      value: true,
      errorText: `Username field is required`,
    },
    regex: {
      value: /^[a-zA-Z ]{2,50}$/,
      errorText: `This input should contain only letters (minimum 2 and maximum 50)`,
    },
  },
  email: {
    required: {
      value: true,
      errorText: `Email field is required`,
    },
    regex: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      errorText: `Please eneter correct e-mail address`,
    },
  },
  city: {
    required: {
      value: true,
      errorText: `City field is required`,
    },

    regex: {
      value: /^[a-zA-Z ]{2,100}$/,
      errorText: `This input should contain only letters (minimum 2 and maximum 100)`,
    },
  },
};

export default validationRules;
