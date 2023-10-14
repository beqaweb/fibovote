import React, { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import ChooseRole from "../../components/ChooseRole";
import { heroService, roomService } from "../../App";
import NoRoom from "../../components/NoRoom";
import RoomExperience from "../../components/RoomExperience";
import RoomIsFull from "../../components/RoomIsFull/RoomIsFull";
import { RoomService } from "../../services/RoomService";
import { BannedFromRoom } from "../../components/BannedFromRoom/RoomIsFull";

const Room = () => {
  const [loading, setLoading] = useState(true);
  const [roomData, setRoomData] = useState(null);
  const [members, setMembers] = useState(null);

  const { roomId } = useParams();

  const joined = Boolean(roomService.iAmMember);
  const banned = Boolean(roomService.iAmbanned);

  const handleChooseRole = (userRole) => {
    const hero = heroService.chooseRandomHero();
    roomService.joinRoom(userRole, hero);
  };

  useEffect(() => {
    let firstLoad = true;

    return roomService.watchRoom(roomId, (room) => {
      setRoomData(room);

      if (firstLoad) {
        if (roomService.myRole === RoomService.USER_ROLES.HOST) {
          roomService.setHostBack();
        }
        firstLoad = false;
      }

      if (loading) {
        setLoading(false);
      }
    });
  }, [roomId, loading]);

  useEffect(() => {
    if (!roomData) {
      return;
    }

    return roomService.watchRoomMembers(roomData.members, (data) => {
      setMembers({ ...data });
    });
  }, [roomData]);

  useEffect(() => {
    window.onbeforeunload = () => {
      if (roomService.myRole === RoomService.USER_ROLES.HOST) {
        roomService.setHostAway();
      } else {
        roomService.leaveRoom();
      }
    };
  }, []);

  const linearProgress = (
    <Box sx={{ width: 300 }}>
      <LinearProgress />
    </Box>
  );

  return loading ? (
    linearProgress
  ) : !roomData ? (
    <NoRoom />
  ) : banned ? (
    <BannedFromRoom />
  ) : roomData.isFull ? (
    <RoomIsFull />
  ) : !joined ? (
    <ChooseRole onChooseRole={handleChooseRole} />
  ) : !members ? ( // check if members is still loading (roomService.watchRoomMembers)
    linearProgress
  ) : (
    <RoomExperience room={roomData} members={members} />
  );
};

export default Room;
