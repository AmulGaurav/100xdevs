import { atom } from "recoil";

export const courseAtom = atom({
  key: "courseAtom",
  default: {
    isLoading: true,
    course: null,
  },
});

export const isCourseUpdating = atom({
  key: "isCourseUpdating",
  default: false,
});
