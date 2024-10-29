import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Landing from "./components/Landing";
import Course from "./components/Course";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
import { useEffect } from "react";
import axios from "axios";
import { usernameSelector } from "./store/selectors/user";

function App() {
  const username = useRecoilValue(usernameSelector);
  const setUser = useSetRecoilState(userAtom);

  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.username) {
        setUser({
          isLoading: false,
          username: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          username: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        username: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#eeeeee",
        overflowY: "auto",
        padding: "8px",
      }}
    >
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {username && (
            <>
              <Route path="/addcourse" element={<AddCourse />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<Course />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
