import { atom, selector } from "recoil";
import { fetchMyProfile } from "../api/userApi.js";

export const loggedInUserState = atom({
  key: "loggedInUserState",
  default: selector({
    key: "loggedInUserState/Default",
    get: async () => {
      if (localStorage.getItem("access_token")) {
        const me = await fetchMyProfile();
        return me;
      }
      return null;
    },
  }),
});
