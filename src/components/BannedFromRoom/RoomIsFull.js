import { Alert, AlertTitle, Box, Link } from "@mui/material";
import React from "react";

export const BannedFromRoom = () => {
  return (
    <Box sx={{ width: 430 }}>
      <Alert severity="warning">
        <AlertTitle>Cannot join the room</AlertTitle>
        You have been banned from joining the room by host
        <Link href="/">Home</Link>
      </Alert>
    </Box>
  );
};
