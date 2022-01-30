import { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

class FormFields extends Component {
  onInputChange(e) {
    this.props.onInputChange(e);
  }

  onInputBlur(e) {
    this.props.onInputBlur(e);
  }

  render() {
    let { name, username, email, city } = this.props.data;

    return (
      <Box className="form_box" component="form" noValidate autoComplete="off">
        <TextField
          error={name.error}
          helperText={name.helperText}
          onChange={this.onInputChange.bind(this)}
          onBlur={this.onInputBlur.bind(this)}
          value={name.value}
          fullWidth
          label="Name"
          name="name"
          id="fullWidth"
          className="form_textField"
        />
        <TextField
          error={username.error}
          helperText={username.helperText}
          onChange={this.onInputChange.bind(this)}
          onBlur={this.onInputBlur.bind(this)}
          value={username.value}
          fullWidth
          label="Username"
          name="username"
          id="fullWidth"
          className="form_textField"
        />
        <TextField
          error={email.error}
          helperText={email.helperText}
          onChange={this.onInputChange.bind(this)}
          onBlur={this.onInputBlur.bind(this)}
          value={email.value}
          fullWidth
          label="Email"
          name="email"
          id="fullWidth"
          className="form_textField"
        />
        <TextField
          error={city.error}
          helperText={city.helperText}
          onChange={this.onInputChange.bind(this)}
          onBlur={this.onInputBlur.bind(this)}
          value={city.value}
          fullWidth
          label="City"
          name="city"
          id="fullWidth"
          className="form_textField"
        />
      </Box>
    );
  }
}

export default FormFields;
