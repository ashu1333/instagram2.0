import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";

export const login = (data) => async (dispatch) => {
  try {
    const res = await postDataAPI("login", data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const res = await postDataAPI("register", data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
