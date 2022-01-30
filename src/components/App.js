import { Route, Switch, Link } from "react-router-dom";

import "../styles/app.css";
import UsersList from "./UsersList";
import AddUserForm from "./Forms/AddUserForm";
import EditUserForm from "./Forms/EditUserForm";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div className="app_cnt">
      <h1 className="app_heading">
        <Link to="/" className="router_link">
          Dashboard
        </Link>
      </h1>
      <Switch>
        <Route path="/" exact component={UsersList} />
        <Route path="/adduser" exact component={AddUserForm} />
        <Route path="/edituser/:id" exact component={EditUserForm} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
