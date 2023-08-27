import { BASE_URL } from "../config";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Typography, Grid } from "@mui/material";
import AddCourse from "./AddCourse";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseAtom, isCourseUpdating } from "../store/atoms/course";
import {
  isCourseLoadingSelector,
  courseTitle,
  courseDescription,
  courseImageLink,
  coursePrice,
  isCoursePublished,
  courseId,
} from "../store/selectors/course";
import Loading from "./Loading";

function Course() {
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseAtom);
  const isLoading = useRecoilValue(isCourseLoadingSelector);
  const isUpdating = useRecoilValue(isCourseUpdating);

  useEffect(() => {
    if (!isUpdating) {
      axios
        .get(`${BASE_URL}/admin/courses/` + courseId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setCourse({
            isLoading: false,
            course: response.data.course,
          });
        });
    }
  }, [isUpdating]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
      <GrayTopper />
      {isUpdating ? (
        <Grid
          container
          style={{
            zIndex: "1",
          }}
        >
          <Grid
            item
            lg={7}
            md={12}
            sm={12}
            style={{
              marginTop: "-40px",
            }}
          >
            <div>
              <AddCourse />
            </div>
          </Grid>
          <Grid item lg={5} md={12} sm={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CourseCard />
            </div>
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            zIndex: "1",
          }}
        >
          <CourseCard />
        </div>
      )}
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);

  return (
    <div
      style={{
        height: "250px",
        width: "100%",
        backgroundColor: "#212121",
        zIndex: "0",
        marginBottom: "-50px",
      }}
    >
      <div
        style={{
          height: "250px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            color: "white",
            fontWeight: "600",
          }}
          variant="h3"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
}

function CourseCard() {
  return (
    <Card
      style={{
        margin: "10px",
        textAlign: "center",
        width: "300px",
        height: "380px",
      }}
    >
      <ImageLink />
      <Title />
      <Description />
      <Price />
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
        <UpdateCourse />
        <DeleteCourse />
      </div>
      <Publish />
    </Card>
  );
}

function Title() {
  const title = useRecoilValue(courseTitle);

  return (
    <>
      <Typography variant="h5">{title}</Typography>
    </>
  );
}

function Description() {
  const description = useRecoilValue(courseDescription);

  return (
    <>
      <Typography variant="subtitle1">{description}</Typography>
    </>
  );
}

function ImageLink() {
  const imageLink = useRecoilValue(courseImageLink);

  return (
    <>
      <img
        style={{
          height: "60%",
          backgroundSize: "cover",
        }}
        src={imageLink}
        alt=""
      />
    </>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);

  return (
    <>
      <Typography variant="subtitle1">${price}</Typography>
    </>
  );
}

function Publish() {
  const published = useRecoilValue(isCoursePublished);

  return (
    <div
      style={{
        marginTop: "10px",
        backgroundColor: "orange",
      }}
    >
      {published ? "published" : "un-published"}
    </div>
  );
}

function UpdateCourse() {
  const [isUpdating, setIsUpdating] = useRecoilState(isCourseUpdating);

  return (
    <>
      {!isUpdating && (
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => {
            setIsUpdating(true);
          }}
        >
          Update
        </Button>
      )}
    </>
  );
}

function DeleteCourse() {
  const id = useRecoilValue(courseId);

  return (
    <>
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
            await axios.delete(`${BASE_URL}/admin/courses/` + id, {
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
    </>
  );
}

export default Course;
