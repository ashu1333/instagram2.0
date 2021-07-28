export const MESSAGE_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',

}


export const addMessage = ({msg,auth }) => async dispatch => {
    

    dispatch({type:MESSAGE_TYPES.ADD_MESSAGE,payload:msg})
}