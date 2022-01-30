import { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

class FormButtons extends Component {
  handleSubmit(e) {
    this.props.onSubmit(e);
  }

  render() {
    return (
      <div className="form_buttonsCnt">
        <Button variant="outlined" color="error" className="form_button">
          <Link className="router_link" to="/">
            Cancel
          </Link>
        </Button>
        <Button
          variant="contained"
          color="success"
          className="form_button"
          type="submit"
          onClick={this.handleSubmit.bind(this)}
        >
          {this.props.buttonRole}
        </Button>
      </div>
    );
  }
}

export default FormButtons;
