import { useEffect } from "react";

function Landing() {
  useEffect(() => {
    if (localStorage.getItem("token") === undefined) {
      console.log("hello");
    }
  }, []);
  return <div></div>;
}

export default Landing;
