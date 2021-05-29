import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import "./header.css";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../UserCard";
const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      console.log(res);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
  return (
    <div className="search_wrapper">
      <form className="search_form" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          className="search"
          value={search}
          title="Enter to Search"
          onChange={(e) => {
            setSearch(e.target.value.toLocaleLowerCase().replace(/ /g, ""));
          }}
        />

        <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
          <span className="material-icons">search</span>
          <span>Enter to Search</span>
        </div>

        <div
          className="close_search"
          onClick={handleClose}
          style={{ opacity: users?.length === 0 ? 0 : 1 }}
        >
          &times;
        </div>

        <button type="submit" style={{ display: "none" }}>
          Search
        </button>

        <div className="users">
          {search &&
            users.map((user) => (
              <>
                <div>
                  <UserCard
                    key={user._id}
                    user={user}
                    border="border"
                    handleClose={handleClose}
                  />
                </div>
              </>
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
