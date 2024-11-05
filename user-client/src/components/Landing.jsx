import { Grid, Typography } from "@mui/material";

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
          <Typography variant="h2">CourseMania User</Typography>
          <Typography variant="h5">A place to learn, earn & grow</Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <img
          style={{
            marginTop: "20px",
          }}
          width={"100%"}
          src="https://www.commonsense.org/sites/default/files/styles/ratio_16_9_large/public/png/2019-12/teachers-essential-guide-to-coding-in-the-classroom-6_1.png?itok=EIpQbo1O"
          alt=""
        />
      </Grid>
    </Grid>
  );
}

export default Landing;
