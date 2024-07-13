import { atom, selector } from "recoil";
import { fetchMyProfile } from "../api/userApi.js";

export const loggedInUserState = atom({
  key: "loggedInUserState",
  default: null
});