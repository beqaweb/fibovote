import { useEffect } from "react";

import { roomService } from "../../../../../App";

export const useScene = ({
  reveal,
  hostHeroRef,
  voterHeroRefs,
  countdownSeconds,
}) => {
  useEffect(() => {
    let timeout;
    let cleanup;

    if (reveal) {
      timeout = setTimeout(() => {
        const refs = Object.values(voterHeroRefs.current);

        cleanup = () => {
          hostHeroRef.current && hostHeroRef.current.stop();
          hostHeroRef.current && hostHeroRef.current.do("idle", ["idleSad"]);
          refs.forEach((ref) => {
            ref && ref.stop();
            ref && ref.do("idle", ["idleSad"]);
          });
        };

        if (roomService.getUnanimousStoryPoint()) {
          hostHeroRef.current.do(["victory", "cheer"]);
          refs.forEach((ref) => {
            ref.do(["dance", "cheer"]);
          });
        } else {
          hostHeroRef.current.do(["sad", "neutral"]);
          refs.forEach((ref) => {
            ref.do(["sad", "neutral"]);
          });
        }
      }, countdownSeconds * 1000);
    }

    return () => {
      timeout && clearTimeout(timeout);
      cleanup && cleanup();
    };
  }, [hostHeroRef, voterHeroRefs, countdownSeconds, reveal]);
};
