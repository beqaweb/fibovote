import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

import { MarqueeText } from "../../../MarqueeText/MarqueeText";
import { RoomService } from "../../../../services/RoomService";
import { CountDownContent } from "../../../CountDownContent/CountDownContent";
import { roomService } from "../../../../App";

export const RoomInfo = ({
  countdownSeconds,
  hostEntry,
  myRole,
  members,
  votes,
  reveal,
  everyoneVoted,
}) => {
  const [, hostData] = hostEntry || [];

  const revealedAt = reveal ? new Date(reveal) : null;

  const voters = Object.entries(members).filter(
    ([_uid, { role }]) => role === RoomService.USER_ROLES.VOTER
  );

  const noVoters = voters.length === 0;

  const notVotedNames = voters
    .filter(([uid]) => !votes || (votes && !(uid in votes)))
    .map(([_uid, { name }]) => name);

  const notVotedNamesStr = notVotedNames.slice(1).reduce((acc, cur, i, arr) => {
    return acc + (i === arr.length - 1 ? ` and ${cur}` : `, ${cur}`);
  }, notVotedNames[0]);

  const calcFinalPoint = () => {
    return roomService.getUnanimousStoryPoint();
  };

  const results = everyoneVoted && revealedAt && (
    <CountDownContent
      seconds={countdownSeconds}
      renderSecond={(second) => (
        <Typography fontSize="inherit">
          Revealing in{" "}
          <Typography fontSize="inherit" component="span" fontWeight={500}>
            {second}
          </Typography>
        </Typography>
      )}
    >
      <TableContainer
        sx={{ width: "auto", minWidth: 200, display: "inline-block" }}
        component={Paper}
      >
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
              }}
            >
              <TableCell>Name</TableCell>
              <TableCell align="right">Vote</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {voters.map(([uid, { name }], i) => {
              const vote = votes[uid];
              return (
                <TableRow
                  key={uid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">{vote}</TableCell>
                </TableRow>
              );
            })}
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                borderTop: (theme) => `3px solid ${theme.palette.divider}`,
              }}
            >
              <TableCell>
                <Typography fontWeight={500} variant="h6">
                  Result
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={500} variant="h6">
                  {calcFinalPoint() || "?"}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CountDownContent>
  );

  if (noVoters) {
    return (
      <Box sx={{ flex: 1 }}>
        <MarqueeText text="No voters have joined yet ¯\_(ツ)_/¯ please send invite to them (link above)" />
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1 }}>
      <Typography component="div">
        {results}

        {everyoneVoted && !revealedAt && (
          <MarqueeText
            text={
              "Everyone has voted, " +
              (myRole === RoomService.USER_ROLES.HOST
                ? "you can reveal the points now"
                : `waiting for ${hostData.name} (host) to reveal the points`)
            }
          />
        )}

        {!everyoneVoted && (
          <MarqueeText
            text={`Voting is in progress, waiting for: ${notVotedNamesStr}`}
            noAnimation={notVotedNames.length !== voters.length}
          />
        )}
      </Typography>
    </Box>
  );
};
