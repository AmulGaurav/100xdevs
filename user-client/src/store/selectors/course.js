import { selector } from "recoil";
import { courseAtom } from "../atoms/course";

export const isCourseLoadingSelector = selector({
  key: "isCourseLoadingSelector",
  get: ({ get }) => {
    const state = get(courseAtom);

    return state.isLoading;
  },
});

export const courseDetails = selector({
  key: "courseDetails",
  get: ({ get }) => {
    const state = get(courseAtom);

    return state.course;
  },
});

export const courseId = selector({
  key: "courseId",
  get: ({ get }) => {
    const state = get(courseAtom);
    if (state.course) {
      return state.course._id;
    }

    return;
  },
});

export const courseTitle = selector({
  key: "courseTitle",
  get: ({ get }) => {
    const state = get(courseAtom);
    if (state.course) {
      return state.course.title;
    }

    return "";
  },
});

export const courseDescription = selector({
  key: "courseDescription",
  get: ({ get }) => {
    const state = get(courseAtom);
    if (state.course) {
      return state.course.description;
    }

    return "";
  },
});

export const courseImageLink = selector({
  key: "courseImageLink",
  get: ({ get }) => {
    const state = get(courseAtom);
    if (state.course) {
      return state.course.imageLink;
    }

    return "";
  },
});

export const coursePrice = selector({
  key: "coursePrice",
  get: ({ get }) => {
    const state = get(courseAtom);
    if (state.course) {
      return state.course.price;
    }

    return "";
  },
});
