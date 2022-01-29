import "../styles/app.css";
import UsersList from "./UsersList";

function App() {
  return (
    <div className="app_cnt">
      <h1 className="app_heading">Dashboard</h1>
      <UsersList />
    </div>
  );
}

export default App;
