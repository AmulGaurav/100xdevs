import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginBottom: "90px",
        }}
      >
        <CircularProgress />
      </div>
    </div>
  );
}

export default Loading;
