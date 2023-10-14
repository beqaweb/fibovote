import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useModelSetup } from "../hooks/useModelSetup";

export const KnightPelegrini = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/knight_d_pelegrini.glb"
  );
  const { actions } = useAnimations(animations, group);

  useModelSetup(
    {
      onHeadPositionChange: props.onHeadPositionChange,
      actions,
      nodes,
      excludedActions: KnightPelegrini.excludedActions,
    },
    ref
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials.Knight_MAT2}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Head_Hands"
            geometry={nodes.Head_Hands.geometry}
            material={materials.Knight_MAT2}
            skeleton={nodes.Head_Hands.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Lower_Armor"
            geometry={nodes.Lower_Armor.geometry}
            material={materials.Knight_MAT2}
            skeleton={nodes.Lower_Armor.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

KnightPelegrini.excludedActions = [];
