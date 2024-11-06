import { Grid, Typography } from "@mui/material";
import dashboardImage from "../assets/dashboard.jpg";

function Landing() {
  return (
    <Grid
      container
      style={{
        padding: "5vw",
      }}
    >
      <Grid item xs={12} md={6} lg={6}>
        <div
          style={{
            marginTop: "100px",
          }}
        >
          <Typography variant="h2">CourseMania Student</Typography>
          <Typography variant="h5">A place to learn, earn & grow</Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <img
          style={{
            marginTop: "20px",
            borderRadius: "10px",
          }}
          width={"100%"}
          src={dashboardImage}
          alt=""
        />
      </Grid>
    </Grid>
  );
}

export default Landing;
