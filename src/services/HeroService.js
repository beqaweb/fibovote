import { getDatabase } from "firebase/database";

import { Ch03 } from "../components/RoomExperience/components/ThreeJsScene/models/Ch03";
import { Aj } from "../components/RoomExperience/components/ThreeJsScene/models/Aj";
import { Prisoner } from "../components/RoomExperience/components/ThreeJsScene/models/Prisoner";
import { Arissa } from "../components/RoomExperience/components/ThreeJsScene/models/Arissa";
import { PeasantGirl } from "../components/RoomExperience/components/ThreeJsScene/models/PeasantGirl";
import { KnightPelegrini } from "../components/RoomExperience/components/ThreeJsScene/models/KnightPelegrini";
import { MremirehODesbiens } from "../components/RoomExperience/components/ThreeJsScene/models/MremirehODesbiens";
import { PaladinJNordstorm } from "../components/RoomExperience/components/ThreeJsScene/models/PaladinJNordstorm";

export class HeroService {
  static HEROES = {
    Ch03,
    Aj,
    Prisoner,
    Arissa,
    PeasantGirl,
    KnightPelegrini,
    MremirehODesbiens,
    PaladinJNordstorm,
  };

  static randomHeroName(exclude = []) {
    const names = Object.keys(HeroService.HEROES);
    const randomIndex = Math.floor(Math.random() * names.length + 0);
    const name = names[randomIndex];
    return exclude.includes(name) ? HeroService.randomHeroName(exclude) : name;
  }

  constructor(firebaseApp, authService, roomService) {
    this.db = getDatabase(firebaseApp);
    this.authService = authService;
    this.roomService = roomService;
  }

  get userId() {
    return this.authService.uid;
  }

  chooseRandomHero() {
    const exclude = Object.values(this.roomService.roomData.heroes);
    return HeroService.randomHeroName(exclude);
  }

  getMemberHero(uid) {
    const name = this.roomService.roomData.heroes[uid];
    return { name, component: HeroService.HEROES[name] };
  }
}
