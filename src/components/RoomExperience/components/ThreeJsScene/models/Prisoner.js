import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useModelSetup } from "../hooks/useModelSetup";

export const Prisoner = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/prisoner.glb");
  const { actions } = useAnimations(animations, group);

  useModelSetup(
    {
      onHeadPositionChange: props.onHeadPositionChange,
      actions,
      nodes,
      excludedActions: Prisoner.excludedActions,
    },
    ref
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          geometry={nodes.Prisoner.geometry}
          material={materials.Prisoner_material}
          skeleton={nodes.Prisoner.skeleton}
        />
      </group>
    </group>
  );
});

Prisoner.nameAddY = 0.02;
Prisoner.excludedActions = ["danceFlair"];
