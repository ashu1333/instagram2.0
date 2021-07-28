import { MESSAGE_TYPES } from "../actions/messageAction";

const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    firstLoad: false
    
}
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_TYPES.ADD_USER:
            if (state.users.every(user => user._id != action.payload._id)) {
                return {
                    ...state,
                    users:[action.payload,...state.users]
               }
           }
        
        default:
            return state;
    }
}

export default messageReducer;