import { Alert, AlertTitle, Box, Link } from "@mui/material";
import React from "react";

const NoRoom = () => {
  return (
    <Box sx={{ width: 430 }}>
      <Alert severity="warning">
        <AlertTitle>No room found</AlertTitle>
        The room you are looking for could not be found.{" "}
        <Link href="/">Home</Link>
      </Alert>
    </Box>
  );
};

export default NoRoom;
