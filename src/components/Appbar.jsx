import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Appbar() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "4px",
      }}
    >
      <div>
        <Typography variant="h6">Coursera</Typography>
      </div>
      {isLoggedIn ? (
        <div>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.clear();
              setIsLoggedIn(false);
            }}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div>
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
    </div>
  );
}

export default Appbar;
