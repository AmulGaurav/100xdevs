import { BASE_URL } from "../config";
import { Card, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { passwordState, usernameState } from "../store/atoms/user";
import { Username, Password } from "./Signup";

function Signin() {
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
        <Username />
        <br />
        <br />
        <Password />
        <br />
        <br />
        <SignInButton />
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

function SignInButton() {
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);
  return (
    <>
      <Button
        variant="contained"
        size="large"
        onClick={async () => {
          const response = await axios.post(`${BASE_URL}/user/login`, {
            username,
            password,
          });
          let data = response.data;
          localStorage.setItem("token", data.token);
          alert(data.message);
          window.location.href = "/";
        }}
      >
        Sign In
      </Button>
    </>
  );
}

export default Signin;
