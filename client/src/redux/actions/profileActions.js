import { GLOBALTYPES, DeleteData } from "./globalTypes";
import { getDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/ImageUpload";
import { patchDataAPI } from "../../utils/fetchData";
export const PROFILE_TYPES = {
  LOADING: "LOADING PROFILE",
  GET_USER: "GET_PROFILE_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const getProfileUsers =
  ({ users, id, auth }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
        const res = await getDataAPI(`/user/${id}`, auth.token);
        // const res1 =  getDataAPI(`/user_posts/${id}`, auth.token);

        const users = res;
        console.log(users);
        // const posts = await res1;

        dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data });

        // dispatch({
        //     type: PROFILE_TYPES.GET_POSTS,
        //     payload: {...posts.data, _id: id, page: 2}
        // })

        dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const updateProfileuser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your name" },
      });
    }
    if (userData.fullname.length > 25) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your Name is too long" },
      });
    }

    if (userData.story.length > 200) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Your story is too long" },
      });
    }

    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (avatar) media = await imageUpload([avatar]);
      console.log(media);
      const res = await patchDataAPI(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );
      console.log(res);

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    //CHANGE IN LOGGED IN USER DATA STATE
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    // CHANGE IN USER DATA STATE
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser });

    try {
      await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const Unfollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: DeleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: DeleteData(item.followers, auth.user._id),
          };
        }
      });
    }

    //CHANGE IN USER DATA STATE
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser });

    //CHANGE IN LOGGED IN USER DATA STATE
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      },
    });

    try {
      await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
