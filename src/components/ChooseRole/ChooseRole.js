import React from "react";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

import { RoomService } from "../../services/RoomService";
import { roomService } from "../../App";

const ChooseRole = ({ onChooseRole }) => {
  const handleChooseToSpectate = () => {
    onChooseRole(RoomService.USER_ROLES.SPECTATOR);
  };

  const handleChooseToVote = () => {
    onChooseRole(RoomService.USER_ROLES.VOTER);
  };

  const joinAsVoterBtn = (
    <Button
      disabled={!roomService.canJoinAsVoter}
      variant="contained"
      endIcon={<HowToVoteIcon />}
      onClick={handleChooseToVote}
    >
      Vote
    </Button>
  );

  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      sx={{ width: 300 }}
    >
      <Grid item sx={{ paddingY: 2 }}>
        <Typography variant="h6">What you wanna do?</Typography>
      </Grid>
      <Grid item sx={{ paddingY: 2 }}>
        <Button
          variant="contained"
          endIcon={<VisibilityIcon />}
          onClick={handleChooseToSpectate}
        >
          Spectate
        </Button>
        <Typography variant="span" sx={{ mx: 1.5 }}>
          or
        </Typography>
        {roomService.canJoinAsVoter ? (
          joinAsVoterBtn
        ) : (
          <Tooltip title="Too many voters already in the room">
            <Box component="span">{joinAsVoterBtn}</Box>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
};

export default ChooseRole;
