import { Alert, AlertTitle, Box, Link } from "@mui/material";
import React from "react";

const RoomIsFull = () => {
  return (
    <Box sx={{ width: 430 }}>
      <Alert severity="warning">
        <AlertTitle>The room is full</AlertTitle>
        The room you are looking for is currently full.{" "}
        <Link href="/">Home</Link>
      </Alert>
    </Box>
  );
};

export default RoomIsFull;
