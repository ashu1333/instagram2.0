import { GLOBALTYPES, EditData, DeleteData } from "./globalTypes";
import { POST_TYPES } from "./postAction";
import { postDataAPI } from "../../utils/fetchData";

export const createComment =
  ({ post, newComment, auth }) =>
  async (dispatch) => {
    // console.log(post);
    const newPost = { ...post, comment: [...post.comment, newComment] };
    // console.log(newPost);
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

    try {
      const data = { ...newComment, postId: post._id };
      const res = await postDataAPI("comment", data, auth.token);
      console.log(res);
    } catch (err) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.message },
      });
    }
  };
