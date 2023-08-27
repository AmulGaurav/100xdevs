import { BASE_URL } from "../config";
import {
  Card,
  TextField,
  Button,
  Typography,
  Link,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  usernameState,
  passwordState,
  showPasswordState,
} from "../store/atoms/user";

function Signup() {
  const navigate = useNavigate();

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
        <Typography variant="h6">Welcome to Coursera, sign up below</Typography>
      </div>
      <Card
        variant="outlined"
        style={{
          padding: "20px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <Username />
        <br />
        <br />
        <Password />
        <br />
        <br />
        <SignUpButton />
        <br />
        <br />
        <Typography>
          Already a user?{" "}
          <Link
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/signin");
            }}
          >
            Login
          </Link>
        </Typography>
      </Card>
    </div>
  );
}

export function Username() {
  const setUsername = useSetRecoilState(usernameState);

  return (
    <>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth={true}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
    </>
  );
}

export function Password() {
  const [showPassword, setShowPassword] = useRecoilState(showPasswordState);
  const setPassword = useSetRecoilState(passwordState);

  return (
    <>
      <FormControl
        variant="outlined"
        fullWidth={true}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
    </>
  );
}

function SignUpButton() {
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);

  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={async () => {
          const response = await axios.post(`${BASE_URL}/admin/signup`, {
            username,
            password,
          });
          const data = response.data;
          localStorage.setItem("token", data.token);
          alert(data.message);
          window.location.href = "/";
        }}
      >
        Sign Up
      </Button>
    </>
  );
}

export default Signup;
