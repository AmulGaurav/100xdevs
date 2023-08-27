import { BASE_URL } from "../config";
import { useEffect } from "react";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { coursesAtom } from "../store/atoms/courses";
import {
  isCoursesLoadingSelector,
  coursesSelector,
} from "../store/selectors/courses";
import Loading from "./Loading";

function Courses() {
  const setCourses = useSetRecoilState(coursesAtom);
  const isLoading = useRecoilValue(isCoursesLoadingSelector);
  const coursesState = useRecoilValue(coursesSelector);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/courses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCourses({
          isLoading: false,
          courses: response.data.courses,
        });
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {coursesState.map((course) => (
        // eslint-disable-next-line react/jsx-key
        <div>
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <Card
      style={{
        margin: "10px",
        textAlign: "center",
        width: "300px",
        height: "350px",
        cursor: "pointer",
      }}
      onClick={() => {
        window.location.href = "/courses/" + course._id;
      }}
    >
      <img
        style={{
          height: "60%",
          backgroundSize: "cover",
        }}
        src={course.imageLink}
        alt=""
      />
      <Typography variant="h5">{course.title}</Typography>
      <Typography variant="subtitle1">{course.description}</Typography>
      <Typography variant="subtitle1">${course.price}</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          cursor: "default",
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Button
          style={{
            width: "90%",
            marginTop: "8px",
          }}
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            window.location.href = "/courses/" + course._id;
          }}
        >
          View Course
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
