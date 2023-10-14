import { Button, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChairIcon from "@mui/icons-material/Chair";

import { roomService } from "../../App";

const CreateRoom = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    roomService.createRoom().then((roomId) => {
      navigate(`/${roomId}`);
    });
  };

  return (
    <Grid container justifyContent="center" sx={{ width: 400 }}>
      <Grid item sx={{ paddingY: 2 }}>
        <Button
          type="submit"
          variant="contained"
          endIcon={<ChairIcon />}
          onClick={handleCreate}
        >
          Create room
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoom;
