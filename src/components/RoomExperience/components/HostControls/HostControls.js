import { Button } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const HostControls = ({
  reveal,
  everyoneVoted,
  onRevealRequest,
  onResetRequest,
}) => {
  const revealedAt = reveal ? new Date(reveal) : null;

  return revealedAt ? (
    <Button
      variant="contained"
      endIcon={<RestartAltIcon />}
      onClick={onResetRequest}
    >
      Reset
    </Button>
  ) : everyoneVoted ? (
    <Button
      variant="contained"
      endIcon={<VisibilityIcon />}
      onClick={onRevealRequest}
    >
      Reveal points
    </Button>
  ) : null;
};
