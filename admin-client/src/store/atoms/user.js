import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    isLoading: true,
    username: null,
  },
});

export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const passwordState = atom({
  key: "passwordState",
  default: "",
});

export const showPasswordState = atom({
  key: "showPasswordState",
  default: "false",
});
