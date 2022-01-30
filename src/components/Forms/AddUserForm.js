import { Component } from "react";
import { connect } from "react-redux";

import FormFields from "./FormFields";
import FormButtons from "./FormButtons";
import validationFunction from "../../helpers/validationFunction";
import { addUser } from "../../actions";
import "../../styles/form.css";

class AddUserForm extends Component {
  state = {
    name: {
      value: "",
      helperText: "",
      error: false,
      filled: false,
    },
    username: {
      value: "",
      helperText: "",
      error: false,
      filled: false,
    },
    email: {
      value: "",
      helperText: "",
      error: false,
      filled: false,
    },
    city: {
      value: "",
      helperText: "",
      error: false,
      filled: false,
    },
  };

  onInputChange(e) {
    let { name, value } = e.target;

    this.setState({
      [name]: {
        ...this.state[name],
        value: value,
      },
    });
  }

  onInputBlur(e) {
    const { name } = e.target;
    const validation = validationFunction(e, this.state);
    this.setState({
      [name]: {
        ...this.state[name],
        error: validation[name].error,
        helperText: validation[name].helperText,
        filled: validation[name].filled,
      },
    });
  }

  handleSubmit(e) {
    let dataValidation = Object.values(this.state).every((key) => {
      return key.filled;
    });

    if (dataValidation) {
      const formValues = {
        id: Math.floor(Math.random() * 100000),
        name: this.state.name.value,
        username: this.state.username.value,
        email: this.state.email.value,
        city: this.state.city.value,
      };
      this.props.addUser(formValues);
      this.props.history.push("/");
    } else {
      alert("Uzupełnij wszystkie pola");
    }
  }

  render() {
    return (
      <div className="form_cnt">
        <h4 className="form_title">Add User form</h4>
        <FormFields
          onInputChange={this.onInputChange.bind(this)}
          onInputBlur={this.onInputBlur.bind(this)}
          data={this.state}
        />
        <FormButtons onSubmit={this.handleSubmit.bind(this)} buttonRole="Add" />
      </div>
    );
  }
}

export default connect(null, { addUser })(AddUserForm);
