import { BASE_URL } from "../config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button } from "@mui/material";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { coursesAtom } from "../store/atoms/courses";
import {
  isCoursesLoadingSelector,
  coursesSelector,
} from "../store/selectors/courses";

function Courses() {
  const setCourses = useSetRecoilState(coursesAtom);
  const isLoading = useRecoilValue(isCoursesLoadingSelector);
  const coursesState = useRecoilValue(coursesSelector);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/courses`, {
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
    return <>Loading...</>;
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
  const navigate = useNavigate();

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
        navigate("/course/" + course._id);
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
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            navigate("/course/" + course._id);
          }}
        >
          View
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={async () => {
            if (
              confirm(
                "Deleting? The course will disappear like a magician's trick. OK or cancel? 🎩"
              )
            ) {
              await axios.delete(`${BASE_URL}/admin/courses/` + course._id, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              });
              window.location.href = "/courses";
            }
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
