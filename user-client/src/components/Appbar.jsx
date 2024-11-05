import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { userAtom } from "../store/atoms/user";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  usernameSelector,
  isUserLoadingSelector,
} from "../store/selectors/user";
import { CircularProgress } from "@mui/material";

function Appbar() {
  const isLoading = useRecoilValue(isUserLoadingSelector);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "4px",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          marginLeft: "10px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <Typography
          style={{
            fontWeight: "600",
          }}
          variant="h6"
        >
          CourseMania
        </Typography>
      </div>

      <div
        style={{
          marginRight: "10px",
        }}
      >
        <UserMenu />
      </div>
    </div>
  );
}

function UserMenu() {
  const navigate = useNavigate();
  const username = useRecoilValue(usernameSelector);
  const setUser = useSetRecoilState(userAtom);

  return (
    <>
      {username ? (
        <div
          style={{
            display: "flex",
          }}
        >
          <Typography
            style={{
              fontSize: "18px",
            }}
            variant="h6"
            sx={{
              mr: 1.2,
              p: 0.5,
            }}
          >
            {username}
          </Typography>
          <Button
            variant="text"
            onClick={() => {
              navigate("/mycourses");
            }}
          >
            My Courses
          </Button>
          <Button
            variant="text"
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.clear();
              setUser({
                isLoading: false,
                username: null,
              });
              navigate("/");
            }}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div>
          <Button
            sx={{
              mr: 5,
            }}
            color="secondary"
            variant="contained"
            onClick={() => {
              window.open("https://course-mania-five.vercel.app/");
            }}
          >
            Admin DashBoard
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
          <Button
            sx={{
              ml: 1,
            }}
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}

export default Appbar;
