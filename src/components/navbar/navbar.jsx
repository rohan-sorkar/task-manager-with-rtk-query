import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ marginBottom: "50px" }} className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img
              style={{ width: "70px", height: "70px" }}
              src="./images/logo.png"
            />
            <h4 style={{fontSize: '22px', fontWeight: '500', color: '#2f3542'}}>Task manager</h4>
          </div>
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
