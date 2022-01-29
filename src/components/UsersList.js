import { Component } from "react";
import { connect } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { fetchUsers } from "../actions";
import "../styles/usersList.css";

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
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsersList() {
    return this.props.users.map((user) => {
      return (
        <StyledTableRow key={user.id}>
          <StyledTableCell>{user.id}</StyledTableCell>
          <StyledTableCell align="center">{user.name}</StyledTableCell>
          <StyledTableCell align="center">{user.username}</StyledTableCell>
          <StyledTableCell align="center">{user.email}</StyledTableCell>
          <StyledTableCell align="center">{user.address.city}</StyledTableCell>
          <StyledTableCell align="center">
            <Button variant="outlined" color="success">
              edit
            </Button>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Button variant="outlined" color="error">
              delete
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  }

  render() {
    return (
      <div className="usersList_cnt">
        <div className="usersList_header">
          <h3>User list</h3>
          <Button variant="contained" color="success">
            Add new
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">E-mail</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderUsersList()}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers })(UsersList);
