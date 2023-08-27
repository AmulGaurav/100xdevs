import { BASE_URL } from "../config";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Card, Typography } from "@mui/material";
import { purchasedCoursesState } from "../store/atoms/user";
import {
  isPurchasedCoursesLoadingSelector,
  purchasedCoursesSelector,
} from "../store/selectors/user";
import { useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

function MyCourses() {
  const setPurchasedCourses = useSetRecoilState(purchasedCoursesState);
  const isLoading = useRecoilValue(isPurchasedCoursesLoadingSelector);
  const purchasedCourses = useRecoilValue(purchasedCoursesSelector);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/purchasedcourses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPurchasedCourses({
          isLoading: false,
          purchasedCourses: response.data.purchasedCourses,
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
      {purchasedCourses.map((course) => (
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
      <div>
        <Button
          style={{
            width: "90%",
            marginTop: "8px",
          }}
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            window.location.href = "/mycourses/" + course._id;
          }}
        >
          Start Course
        </Button>
      </div>
    </Card>
  );
}

export default MyCourses;
