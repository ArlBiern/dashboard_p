import { Component } from "react";
import { connect } from "react-redux";

import FormFields from "./FormFields";
import FormButtons from "./FormButtons";
import validationFunction from "../../helpers/validationFunction";
import { editUser, fetchUser } from "../../actions";
import "../../styles/form.css";

class EditUserForm extends Component {
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

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);

    this.setState({
      name: {
        value: this.props.user.name,
        helperText: "",
        error: false,
        filled: true,
      },
      username: {
        value: this.props.user.username,
        helperText: "",
        error: false,
        filled: true,
      },
      email: {
        value: this.props.user.email,
        helperText: "",
        error: false,
        filled: true,
      },
      city: {
        value: this.props.user.city,
        helperText: "",
        error: false,
        filled: true,
      },
    });
  }

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

    if (!this.props.user) {
      alert(
        "Probably you have tried to edit user that do not exist. Go to the dashboard and choose proper one."
      );
      return;
    }

    if (dataValidation) {
      const formValues = {
        id: this.props.user.id,
        name: this.state.name.value,
        username: this.state.username.value,
        email: this.state.email.value,
        city: this.state.city.value,
      };
      this.props.editUser(formValues);
      this.props.history.push("/");
    } else {
      alert("Proszę uzupełnij wszystkie pola");
    }
  }

  render() {
    return (
      <div className="form_cnt">
        <h4 className="form_title">Edit User form</h4>
        <FormFields
          onInputChange={this.onInputChange.bind(this)}
          onInputBlur={this.onInputBlur.bind(this)}
          data={this.state}
          user={this.props.user}
        />
        <FormButtons
          onSubmit={this.handleSubmit.bind(this)}
          buttonRole="Edit"
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find((user) => user.id === +ownProps.match.params.id),
  };
};

export default connect(mapStateToProps, { editUser, fetchUser })(EditUserForm);
