import React, { useEffect, useState } from "react";
import { imageUpload } from '../../utils/ImageUpload';
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useParams } from "react-router";
import MsgDisplay from "./MsgDisplay";
import UserCard from "../UserCard";
const RightSide = () => {
    const { id } = useParams();
    const { auth, message } = useSelector(state => state);
    const [user, setUser] = useState([]);
    const [text, setText] = useState('');
    const [media, setMedia] = useState([]);
    const [loadMedia, setLoadMedia] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        const newUser = message.users.find(user => user._id === id)
        if (newUser) {
            setUser(newUser);
        }
        console.log(newUser);
    },[message.users,id])

       const handleChangeMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setMedia([...media, ...newMedia])
    }

  
    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (!text.trim() && media.length == 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)

        let newArr = [];
        if (media.length > 0) newArr = await imageUpload(media);
       
        const msg = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: newArr,
            createdAt:new Date().toISOString()
       }
       
        setLoadMedia(false);

        // await dispatch(addMessage({ msg, auth }));
    
    }
    
    return (
        <>
        <div className="message_header" style={{cursor: 'pointer'}} >
    
                {
                    user.length !== 0 &&       <UserCard user={user}>
                 <div className="d-flex">
                 <i className="fas fa-phone-alt"
                            />

                            <i className="fas fa-video mx-3"
                            />

                            <i className="fas fa-trash text-danger"
                            />
            </div>
                </UserCard>     }
        
         
           
               
            </div>

            <div className="chat_container"
            style={{height:media.length>0?'calc(100% - 180px)': ''}}
            
            >
                <div className="chat_display">
                    <div className="chat_row other_message">
                       
                        <MsgDisplay user={user} />
                        
                    </div>

                    <div className="chat_row your_message">
                       
                          <MsgDisplay user={auth.user}/>
                    </div>
                </div>
              
            </div>

              <div className="show_media" style={{display: media.length > 0 ? 'grid' : 'none'}} >
                {
                    media.map((item, index) => (
                        <div key={index} id="file_media" className="img-thumbnail">
                           <img src={URL.createObjectURL(item)} width="20%"/>
                            <span onClick={() => handleDeleteMedia(index)} >&times;</span>
                        </div>
                    ))
                }
            </div>

  
            <form className="chat_input" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Your Message..."
                    value={text}
                    onChange={e => setText(e.target.value)} />
                

                              <div className="file_upload">
                    <i className="fas fa-image text-danger" />
                    <input type="file" name="file" id="file"
                    multiple accept="image/*,video/*" onChange={handleChangeMedia} />
                </div>



                <button type="submit" className="material-icons" 
                disabled={(text) ? false : true}>
                    near_me
                </button>
            </form>
            </>
    );
}


export default RightSide;