import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";

import { authService } from "../../App";

const UserName = () => {
  const nameRef = useRef();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const name = nameRef.current.value;
    authService.updateUserData({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container flexDirection="column" sx={{ width: 300 }}>
        <Grid item sx={{ paddingY: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Your name?
          </Typography>
          <TextField
            inputRef={nameRef}
            fullWidth
            label="Name"
            variant="standard"
          />
        </Grid>
        <Grid item sx={{ paddingY: 2 }} alignSelf="flex-end">
          <Button
            type="submit"
            variant="contained"
            endIcon={<ArrowRightAltIcon />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserName;
