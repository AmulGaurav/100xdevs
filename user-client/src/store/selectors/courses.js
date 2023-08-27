import { selector } from "recoil";
import { coursesAtom } from "../atoms/courses";

export const isCoursesLoadingSelector = selector({
  key: "isCoursesLoadingSelector",
  get: ({ get }) => {
    const state = get(coursesAtom);

    return state.isLoading;
  },
});

export const coursesSelector = selector({
  key: "coursesSelector",
  get: ({ get }) => {
    const state = get(coursesAtom);

    return state.courses;
  },
});
