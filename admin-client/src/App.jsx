import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Landing from "./components/Landing";
import Course from "./components/Course";
import { useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";
import { useEffect } from "react";
import axios from "axios";

function App() {
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
      }}
    >
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
