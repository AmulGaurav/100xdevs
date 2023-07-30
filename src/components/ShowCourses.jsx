import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

function ShowCourses() {
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((resp) => {
      resp.json().then((data) => {
        setCourses(data.courses);
      });
    });
  }, []);

  return (
    <div>
      {courses.map((course) => (
        // eslint-disable-next-line react/jsx-key
        <Course
          title={course.title}
          description={course.description}
          price={course.price}
        />
      ))}
    </div>
  );
}

function Course(props) {
  return (
    <div>
      <Typography sx={{ mb: -2 }} variant="h6">
        {props.title}
      </Typography>
      <br />
      {props.description}
      <br />
      {props.price}
      <br />
      <br />
    </div>
  );
}

export default ShowCourses;
