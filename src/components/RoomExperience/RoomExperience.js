import { Alert, Box, Grid } from "@mui/material";
import React, { useCallback, useMemo } from "react";

import { authService, roomService } from "../../App";
import { RoomService } from "../../services/RoomService";

import { Numbers } from "./components/Numbers/Numbers";
import { HostControls } from "./components/HostControls/HostControls";
import { Invite } from "./components/Invite/Invite";
import { RoomInfo } from "./components/RoomInfo/RoomInfo";
import { ThreeJsScene } from "./components/ThreeJsScene/ThreeJsScene";

export const COUNTDOWN_SECONDS = 3;

const RoomExperience = ({ room, members }) => {
  const myRole = room.members[authService.uid];

  const memberEntries = useMemo(() => {
    const entries = Object.entries(members || {});
    entries.sort(([uidA], [uidB]) => {
      if (uidA < uidB) {
        return -1;
      }
      if (uidA > uidB) {
        return 1;
      }
      return 0;
    });
    return entries;
  }, [members]);

  const hostEntry = memberEntries.find(
    ([_uid, { role }]) => role === RoomService.USER_ROLES.HOST
  );

  const [, hostData] = hostEntry;

  const everyoneVoted = useMemo(() => {
    if (!room.votes) {
      return false;
    }
    const voters = Object.entries(members).filter(
      ([_uid, member]) => member.role === RoomService.USER_ROLES.VOTER
    );
    return !voters.some(([uid]) => !room.votes[uid]);
  }, [room.votes, members]);

  const myVote = room.votes ? roomService.myVote : null;

  const handleReveal = () => {
    roomService.reveal();
  };

  const handleReset = () => {
    roomService.reset();
  };

  const handleChoose = useCallback((num) => {
    roomService.vote(num);
  }, []);

  return (
    <Grid container flexDirection="column">
      <Grid sx={{ my: 1 }} item>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Invite />
          {room.hostAway && (
            <Alert sx={{ my: 1 }} variant="outlined" severity="warning">
              Hold up folks, {hostData.name} (host) is away...
            </Alert>
          )}
        </Box>
      </Grid>

      <Grid item alignSelf="center">
        <ThreeJsScene
          countdownSeconds={COUNTDOWN_SECONDS}
          reveal={room.reveal}
          votes={room.votes}
          memberEntries={memberEntries}
          hostEntry={hostEntry}
        />
      </Grid>

      <Grid sx={{ my: 1 }} item alignSelf="center">
        <Box sx={{ width: 600 }}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <RoomInfo
              countdownSeconds={COUNTDOWN_SECONDS}
              hostEntry={hostEntry}
              myRole={myRole}
              members={members}
              reveal={room.reveal}
              votes={room.votes}
              everyoneVoted={everyoneVoted}
            />

            {myRole === RoomService.USER_ROLES.HOST && (
              <Box sx={{ ml: 1, alignSelf: "flex-start" }}>
                <HostControls
                  reveal={room.reveal}
                  everyoneVoted={everyoneVoted}
                  onRevealRequest={handleReveal}
                  onResetRequest={handleReset}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>

      {myRole === RoomService.USER_ROLES.VOTER && !room.reveal && (
        <Grid sx={{ my: 1 }} item alignSelf="center">
          <Numbers myVote={myVote} onChoose={handleChoose} />
        </Grid>
      )}
    </Grid>
  );
};

export default RoomExperience;
