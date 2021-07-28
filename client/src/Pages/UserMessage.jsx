import LeftSide from "../Component/Message/LeftSide";
import RightSide from "../Component/Message/RightSide";
import React from "react";
const UserMessage = () => {
    return (
         <div className="message d-flex">
            <div className="col-md-4 border-right px-0">
                <LeftSide/>
            </div>

            <div className="col-md-8 px-0 right_mess">
               <RightSide/>
            </div>
          


            </div>
        
    );
}
 
export default UserMessage;