import { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@mui/material/Button";

import FormFields from "./FormFields";
import validationRules from "../../data/validationRules";
import { editUser, fetchUser } from "../../actions";
import "../../styles/form.css";

class EditUserForm extends Component {
  constructor() {
    super();

    this.state = {
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

    this.addButton = createRef();
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
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
    let { name, value } = e.target;
    let { required, regex } = validationRules[name];

    if (required.value && this.state[name].value.length === 0) {
      this.setState({
        [name]: {
          ...this.state[name],
          error: true,
          helperText: required.errorText,
          filled: false,
        },
      });

      return;
    } else if (regex.value) {
      let regExTest = new RegExp(regex.value);

      if (!regExTest.test(value)) {
        this.setState({
          [name]: {
            ...this.state[name],
            error: true,
            helperText: regex.errorText,
            filled: false,
          },
        });
      } else {
        this.setState({
          [name]: {
            ...this.state[name],
            error: false,
            helperText: "",
            filled: true,
          },
        });
      }
    } else {
      this.setState({
        [name]: {
          ...this.state[name],
          error: false,
          helperText: "",
          filled: true,
        },
      });
    }
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
        />
        <div className="form_buttonsCnt">
          <Button variant="outlined" color="error" className="form_button">
            <Link className="router_link" to="/">
              Cancel
            </Link>
          </Button>
          <Button
            ref={this.addButton}
            variant="contained"
            color="success"
            className="form_button"
            type="submit"
            onClick={this.handleSubmit.bind(this)}
          >
            Edit
          </Button>
        </div>
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
