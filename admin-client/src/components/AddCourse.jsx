import { BASE_URL } from "../config";
import { useState } from "react";
import {
  Card,
  Button,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { courseDetails } from "../store/selectors/course";
import { isCourseUpdating } from "../store/atoms/course";

function AddCourse() {
  const course = useRecoilValue(courseDetails);
  const [title, setTitle] = useState(course ? course.title : "");
  const [description, setDescription] = useState(
    course ? course.description : ""
  );
  const [imageLink, setImageLink] = useState(course ? course.imageLink : "");
  const [price, setPrice] = useState(course ? course.price : "");
  const [publish, setpublish] = useState(course ? course.published : true);
  const [isUpdating, setIsUpdating] = useRecoilState(isCourseUpdating);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        variant="outlined"
        style={{
          marginTop: "60px",
          padding: "20px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <div>
          <Typography
            style={{
              fontWeight: "600",
              marginBottom: "15px",
            }}
            variant="h6"
          >
            {isUpdating ? "Updating Course" : "Create Course"}
          </Typography>
        </div>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth={true}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth={true}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          label="Image Link"
          variant="outlined"
          fullWidth={true}
          value={imageLink}
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
          name="image_link"
        />
        <br />
        <br />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth={true}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <br />
        <FormControl
          fullWidth
          style={{
            textAlign: "left",
          }}
        >
          <InputLabel id="demo-simple-select-label">Publish</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={publish}
            label="Publish"
            onChange={(event) => {
              setpublish(event.target.value);
            }}
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          onClick={async () => {
            if (isUpdating) {
              await axios.put(
                `${BASE_URL}/admin/courses/` + course._id,
                {
                  title,
                  description,
                  imageLink,
                  price,
                  published: publish,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              alert("Course Updated Successfully");
              setIsUpdating(false);
            } else {
              const response = await axios.post(
                `${BASE_URL}/admin/courses`,
                {
                  title,
                  description,
                  imageLink,
                  price,
                  published: publish,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              if (response.statusText !== "OK")
                throw new Error(
                  alert("You don't have access to view the courses.")
                );
              else {
                setTitle("");
                setDescription("");
                setImageLink("");
                setPrice("");
                alert("Course created successfully");
              }
            }
          }}
        >
          {isUpdating ? "Update Course" : "Add Course"}
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
