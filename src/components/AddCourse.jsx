import { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

function AddCourse() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [imageLink, setImageLink] = useState("");
  let [price, setPrice] = useState("");
  const [publish, setpublish] = useState(true);

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
        <TextField
          label="Title"
          variant="outlined"
          fullWidth={true}
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
          onClick={() => {
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
              body: JSON.stringify({
                title,
                description,
                imageLink,
                price,
                published: publish,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }).then((resp) => {
              if (!resp.ok)
                throw new Error(
                  alert("You don't have access to view the courses.")
                );
              else {
                alert("Course created successfully");
              }
            });
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
