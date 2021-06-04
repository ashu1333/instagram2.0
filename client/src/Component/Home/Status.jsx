import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import StatusModal from "../StatusModal";
const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} size="big-avatar" />

      <button
        className="statusBtn flex-fill"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        {auth.user.fullname},What are you thinking?
      </button>
    </div>
  );
};

export default Status;
