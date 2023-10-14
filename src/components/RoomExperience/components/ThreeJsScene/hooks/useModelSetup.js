import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { Vector3 } from "three";

export const useModelSetup = (props, ref) => {
  const currentActionRef = useRef();

  useFrame(() => {
    const pos = new Vector3();
    pos.setFromMatrixPosition(props.nodes.mixamorigHeadTop_End.matrixWorld);
    props.onHeadPositionChange && props.onHeadPositionChange(pos);
  });

  const handleStop = useCallback(() => {
    if (props.actions[currentActionRef.current]) {
      props.actions[currentActionRef.current].reset().stop();
    }
  }, [props.actions]);

  const handleDo = useCallback(
    (pattern, excludeRandom = []) => {
      const moves = Object.keys(props.actions).filter((item) =>
        new RegExp(
          Array.isArray(pattern) ? pattern.join("|") : pattern,
          "i"
        ).test(item)
      );
      const excludedActions = (props.excludedActions || []).concat(
        excludeRandom
      );
      const findAction = () => {
        const random = moves[Math.floor(Math.random() * moves.length + 0)];
        return excludedActions.includes(random) ? findAction() : random;
      };
      if (props.actions[currentActionRef.current]) {
        props.actions[currentActionRef.current].stop();
      }
      currentActionRef.current = findAction();
      props.actions[currentActionRef.current].play();
    },
    [props.actions, props.excludedActions]
  );

  useImperativeHandle(ref, () => ({
    stop: handleStop,
    do: handleDo,
  }));

  useEffect(() => {
    handleDo("idle", ["idleSad"]);
  }, [handleDo]);
};
