import React,{useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { MESSAGE_TYPES } from "../../redux/actions/messageAction";
import { getDataAPI } from "../../utils/fetchData";
import UserCard from "../UserCard";
import { useHistory, useParams } from 'react-router-dom'
const LeftSide = () => {
    const { id } = useParams();
    const [search, setSearch] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { auth,message } = useSelector(state => state);
    const handleSubmit = async e => {
        e.preventDefault();
        if (!search) return setSearchUser([]);
        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token);
            setSearchUser(res.data.users);
        } catch (err) {
            
            dispatch({type:GLOBALTYPES.ALERT,payload:{error:err.response.data.msg}})
        }

    }

    const isActive = (user) => {
        if (id === user._id)
            return 'active';
    }
    
    const handleAddUser = (user) => {
        setSearch('')
        setSearchUser([])
        dispatch({ type: MESSAGE_TYPES.ADD_USER, payload: { ...user } })
        return history.push(`/message/${user._id}`);
    }
   
    return (
        <>
            <form className="message_header" onSubmit={handleSubmit}>
                <input type="text" value={search}
                    placeholder="Enter to Search..."
                    onChange={e => setSearch(e.target.value)}
                  
                    
                    
                />
                <button type="submit" style={{ display: "none" }}>
                    Search
                </button>

            </form>
                
          
            <div className="message_chat_list">
                {searchUser.length !== 0 
                    ? searchUser.map(user => (
                    
                         <div key={user._id} className={`message_user ${isActive(user)} `}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} />
                                </div>
                    ))
                    : <>
                        {
                            message.users.map((user) => (
                                <div key={user._id}
                                    className={`message_user ${isActive(user)}`}
                                  onClick={() => handleAddUser(user)}
                                >
                                    <UserCard user={user}>
                                        <i className="fas fa-circle"></i>
                                        </UserCard>


                                </div>
                            ))
                }
                
                    </>
                
                }
                
               
            </div>

            </>
    )
}

export default LeftSide;