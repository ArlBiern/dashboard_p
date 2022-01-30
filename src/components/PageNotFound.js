import { Link } from "react-router-dom";

import "../styles/pageNotFound.css";

function PageNotFound() {
  return (
    <div className="pageNotFound_cnt">
      <h3 className="pageNotFound_mainText">Upsss... Page not Found.</h3>
      <p className="pageNotFound_helpText">
        Please retur to the{" "}
        <Link to="/" className="router_link pageNotFound_returnLink">
          Home
        </Link>{" "}
        page.
      </p>
    </div>
  );
}

export default PageNotFound;
