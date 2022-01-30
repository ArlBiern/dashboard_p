import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import _ from "lodash";

import { fetchUsers, deleteUser, fetchingUsers, sortUsers } from "../actions";
import "../styles/usersList.css";
import "../styles/modal.css";

Modal.setAppElement("#root");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

class UsersList extends Component {
  state = { modalOpen: false, userIdToDelete: "" };

  componentDidMount() {
    _.memoize(() => this.props.fetchingUsers(true));

    this.props.fetchUsers();
  }

  deleteModalOpen(e) {
    this.setState({
      modalOpen: true,
      userIdToDelete: e.target.dataset.user,
    });
  }

  deleteModalClose() {
    this.setState({
      modalOpen: false,
      userIdToDelete: "",
    });
  }

  deleteUser() {
    this.props.deleteUser(this.state.userIdToDelete);
    this.deleteModalClose();
  }

  renderUsersList() {
    if (this.props.fetching) {
      return (
        <tr className="noUsers_row">
          <td colSpan="7">Fetching data....</td>
        </tr>
      );
    }

    if (this.props.users.length === 0) {
      return (
        <tr className="noUsers_row">
          <td colSpan="7">There are no more users in databese.</td>
        </tr>
      );
    } else {
      return this.props.users.map((user) => {
        return (
          <StyledTableRow key={user.id}>
            <StyledTableCell>{user.id}</StyledTableCell>
            <StyledTableCell align="center">{user.name}</StyledTableCell>
            <StyledTableCell align="center">{user.username}</StyledTableCell>
            <StyledTableCell align="center">{user.email}</StyledTableCell>
            <StyledTableCell align="center">{user.city}</StyledTableCell>
            <StyledTableCell align="center">
              <Button variant="outlined" color="success">
                <Link
                  className="router_link"
                  to={`/edituser/${user.id}`}
                  user={user}
                >
                  edit
                </Link>
              </Button>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Button
                variant="outlined"
                color="error"
                onClick={this.deleteModalOpen.bind(this)}
                data-user={user.id}
              >
                delete
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        );
      });
    }
  }

  sortByUsername(e) {
    const sortOption = e.target.dataset.sort;
    this.props.sortUsers(+sortOption);
    if (sortOption === "1") {
      e.target.innerText = "Sort descending";
      e.target.dataset.sort = "-1";
      e.target.classList.add("descending");
    } else {
      e.target.innerText = "Sort ascending";
      e.target.dataset.sort = "1";
      e.target.classList.remove("descending");
    }
  }

  render() {
    return (
      <div className="usersList_cnt">
        <div className="usersList_header">
          <h3>User list</h3>
          <Button variant="contained" color="success">
            <Link className="router_link" to="/adduser">
              Add new
            </Link>
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center" className="usernameField">
                  Username
                  <Button
                    variant="contained"
                    color="success"
                    data-sort="1"
                    onClick={this.sortByUsername.bind(this)}
                    className="sortButton"
                  >
                    Sort ascending
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">E-mail</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderUsersList()}</TableBody>
          </Table>
        </TableContainer>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.deleteModalClose.bind(this)}
          className="modal_cnt"
        >
          <h2 className="modalTitle">Delete</h2>
          <p className="modalText">
            Would you like to delete user with ID {this.state.userIdToDelete}?
          </p>
          <div className="modalButtons_cnt">
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.deleteModalClose.bind(this)}
              className="modalButton"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={this.deleteUser.bind(this)}
              className="modalButton"
            >
              Delete
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    fetching: state.fetchingUsers,
  };
};

export default connect(mapStateToProps, {
  fetchUsers,
  deleteUser,
  fetchingUsers,
  sortUsers,
})(UsersList);
