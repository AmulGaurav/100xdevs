import { selector } from "recoil";
import { userAtom } from "../atoms/user";

export const isUserLoadingSelector = selector({
  key: "isUserLoadingSelector",
  get: ({ get }) => {
    const state = get(userAtom);

    return state.isLoading;
  },
});

export const usernameSelector = selector({
  key: "usernameSelector",
  get: ({ get }) => {
    const state = get(userAtom);

    return state.username;
  },
});
