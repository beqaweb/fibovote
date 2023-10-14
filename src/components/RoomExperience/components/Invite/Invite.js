import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useMemo, useRef } from "react";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { enqueueSnackbar } from "notistack";

import { roomService } from "../../../../App";

export const Invite = () => {
  const linkInputRef = useRef();

  const link = useMemo(() => {
    let str = `${window.location.protocol}//${window.location.hostname}`;
    if (window.location.port) {
      str += `:${window.location.port}`;
    }
    str += `/${roomService.roomId}`;
    return str;
  }, []);

  const handleCopyLink = () => {
    const copyText = linkInputRef.current;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    enqueueSnackbar("The link is copied now");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <ShareIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        size="small"
        variant="standard"
        label="Invite others with this link"
        readOnly
        value={link}
        inputRef={linkInputRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Copy link">
                <IconButton onClick={handleCopyLink} edge="end">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
