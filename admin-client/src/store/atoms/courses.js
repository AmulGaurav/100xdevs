import { atom } from "recoil";

export const coursesAtom = atom({
  key: "coursesAtom",
  default: {
    isLoading: true,
    courses: {
      isLoading: true,
      courses: [],
    },
  },
});
