import { selector } from "recoil";
import { purchasedCoursesState, userAtom } from "../atoms/user";

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

export const isPurchasedCoursesLoadingSelector = selector({
  key: "isPurchasedCoursesLoadingSelector",
  get: ({ get }) => {
    const state = get(purchasedCoursesState);

    return state.isLoading;
  },
});

export const purchasedCoursesSelector = selector({
  key: "purchasedCoursesSelector",
  get: ({ get }) => {
    const state = get(purchasedCoursesState);

    return state.purchasedCourses;
  },
});
