import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddCourse from "./components/AddCourse";
import ShowCourses from "./components/ShowCourses";
import Landing from "./components/Landing";

function App() {
  return (
    <>
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
            <Route path="/showcourses" element={<ShowCourses />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
