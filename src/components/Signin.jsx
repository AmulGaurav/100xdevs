import { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Appbar from "./Appbar";

function Signin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "100px",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6">Welcome back, sign in below</Typography>
      </div>
      <Card
        variant="outlined"
        style={{
          padding: "20px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <FormControl
          variant="outlined"
          fullWidth={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            fetch("http://localhost:3000/admin/login", {
              method: "POST",
              body: JSON.stringify({
                username: email,
                password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((resp) => {
              resp.json().then((data) => {
                localStorage.setItem("token", data.token);
                alert(data.message);
              });
            });
          }}
        >
          Sign In
        </Button>
        <br />
        <br />
        <Typography>
          New here?{" "}
          <Link
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export default Signin;
