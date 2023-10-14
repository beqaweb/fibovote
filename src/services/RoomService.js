import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { HeroService } from "./HeroService";

export class RoomService {
  static VOTERS_LIMIT = 5;

  static USER_ROLES = {
    SPECTATOR: "spectator",
    HOST: "host",
    VOTER: "voter",
  };

  constructor(firebaseApp, authService) {
    this.db = getDatabase(firebaseApp);
    this.authService = authService;
  }

  get userId() {
    return this.authService.uid;
  }

  get myRole() {
    if (!this.roomData) {
      return null;
    }
    return this.roomData.members[this.userId];
  }

  get myVote() {
    return this.roomData.votes[this.userId];
  }

  get iAmMember() {
    return Boolean(this.roomData && this.roomData.members[this.userId]);
  }

  get iAmbanned() {
    return Boolean(
      this.roomData && this.roomData.banned && this.roomData.banned[this.userId]
    );
  }

  get canJoinAsVoter() {
    return Boolean(
      this.roomData &&
        Object.values(this.roomData.members).filter(
          ({ role }) => role === RoomService.USER_ROLES.VOTER
        ).length < RoomService.VOTERS_LIMIT
    );
  }

  setHostAway() {
    update(ref(this.db, `rooms/${this.roomId}`), { hostAway: true });
  }

  setHostBack() {
    update(ref(this.db, `rooms/${this.roomId}`), { hostAway: false });
  }

  createRoom() {
    return new Promise((resolve) => {
      const record = push(ref(this.db, "rooms"), {
        members: {
          [this.userId]: RoomService.USER_ROLES.HOST,
        },
        owner: this.userId,
        heroes: {
          [this.userId]: HeroService.randomHeroName(),
        },
        hostAway: false,
      });
      resolve(record.key);
    });
  }

  watchRoom(roomId, callback) {
    this.roomId = roomId;

    return onValue(ref(this.db, `rooms/${this.roomId}`), (snapshot) => {
      const roomData = snapshot.val();

      if (!roomData) {
        // likely room was deleted
        this.roomData = null;
        this.roomId = null;
        callback(this.roomData);
        return;
      }

      this.roomData = roomData;

      const countVoters = Object.values(roomData.members).filter(
        (role) => role === RoomService.USER_ROLES.VOTER
      ).length;

      this.roomData.isFull = countVoters === RoomService.VOTERS_LIMIT;

      callback(this.roomData);
    });
  }

  watchRoomMembers(members, callback) {
    const userUids = Object.keys(members);
    const membersData = {};
    const unsubscribes = [];

    userUids.forEach((uid) => {
      unsubscribes.push(
        onValue(ref(this.db, `users/${uid}`), (snapshot) => {
          membersData[uid] = snapshot.val();
          membersData[uid].role = members[uid];
          if (Object.keys(membersData).length === userUids.length) {
            callback(membersData);
          }
        })
      );
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }

  joinRoom(role, hero) {
    set(ref(this.db, `rooms/${this.roomId}/members/${this.userId}`), role);
    set(ref(this.db, `rooms/${this.roomId}/heroes/${this.userId}`), hero);
  }

  leaveRoom() {
    remove(ref(this.db, `rooms/${this.roomId}/members/${this.userId}`));
    remove(ref(this.db, `rooms/${this.roomId}/votes/${this.userId}`));
    remove(ref(this.db, `rooms/${this.roomId}/heroes/${this.userId}`));
  }

  vote(num) {
    set(ref(this.db, `rooms/${this.roomId}/votes/${this.userId}`), num);
  }

  reveal() {
    set(ref(this.db, `rooms/${this.roomId}/reveal`), Date.now());
  }

  reset() {
    update(ref(this.db, `rooms/${this.roomId}`), {
      votes: {},
      reveal: null,
    });
  }

  kick(userId) {
    remove(ref(this.db, `rooms/${this.roomId}/members/${userId}`));
    remove(ref(this.db, `rooms/${this.roomId}/votes/${userId}`));
  }

  ban(userId) {
    set(ref(this.db, `rooms/${this.roomId}/banned/${userId}`), Date.now());
  }

  getUnanimousStoryPoint() {
    const votes = this.roomData.votes || {};
    const nums = Object.values(votes);
    const count = nums.reduce((acc, cur) => {
      return { ...acc, [cur]: acc[cur] ? acc[cur] + 1 : 1 };
    }, {});
    const countedNums = Object.keys(count);
    if (countedNums.length === 1) {
      //everyone voted same (one) number
      return countedNums[0];
    }
    return null;
  }
}
