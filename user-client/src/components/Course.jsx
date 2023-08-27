import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Typography } from "@mui/material";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseAtom } from "../store/atoms/course";
import {
  isCourseLoadingSelector,
  courseTitle,
  courseDescription,
  courseImageLink,
  coursePrice,
  courseDetails,
} from "../store/selectors/course";
import { isPurchasedCourseState } from "../store/atoms/user";
import Loading from "./Loading";

function Course() {
  const { courseId } = useParams();
  const setCourse = useSetRecoilState(courseAtom);
  const isLoading = useRecoilValue(isCourseLoadingSelector);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/courses/` + courseId, {
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
  }, []);

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          zIndex: "1",
        }}
      >
        <CourseCard />
      </div>
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
  const [isPurchasedCourse, setIsPurchasedCourse] = useRecoilState(
    isPurchasedCourseState
  );

  useEffect(() => {
    if (window.location.href.split("/")[3] === "mycourses") {
      setIsPurchasedCourse(true);
    }
  }, []);

  return (
    <Card
      style={{
        margin: "10px",
        textAlign: "center",
        width: "300px",
        height: isPurchasedCourse ? "340px" : "350px",
      }}
    >
      <ImageLink />
      <Title />
      <Description />
      <Price />
      {!isPurchasedCourse && <PurchaseCourse />}
    </Card>
  );
}

function Title() {
  const title = useRecoilValue(courseTitle);
  const isPurchasedCourse = useRecoilValue(isPurchasedCourseState);

  return (
    <>
      <Typography
        style={{
          margin: isPurchasedCourse ? "9px 0px" : "0px",
        }}
        variant="h5"
      >
        {title}
      </Typography>
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
  const isPurchasedCourse = useRecoilValue(isPurchasedCourseState);

  return (
    <>
      <Typography
        style={{
          marginTop: isPurchasedCourse ? "9px" : "0px",
        }}
        variant="subtitle1"
      >
        <strong>${price}</strong>
      </Typography>
    </>
  );
}

function PurchaseCourse() {
  const course = useRecoilValue(courseDetails);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/user/purchasedcourses`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const purchasedCourses = response.data.purchasedCourses;
    const existingCourse = purchasedCourses.find((c) => c._id === course._id);

    if (existingCourse) {
      setAlreadyPurchased(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Button
          style={{
            marginTop: "8px",
            width: "90%",
          }}
          variant="contained"
          size="small"
          color="secondary"
          disabled={alreadyPurchased ? true : false}
          onClick={async () => {
            if (
              confirm(
                `$${course.price} will be get deducted from your bank account.\nDo you want to proceed?`
              )
            ) {
              const response = await axios.post(
                `${BASE_URL}/user/courses/` + course._id,
                {},
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );

              alert(response.data.message);
              window.location.href = "/course/" + course._id;
            }
          }}
        >
          {alreadyPurchased ? "Purchased" : "Purchase"}
        </Button>
      </div>
    </>
  );
}

export default Course;
