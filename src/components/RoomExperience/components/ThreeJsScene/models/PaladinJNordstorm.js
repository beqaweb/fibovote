import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useModelSetup } from "../hooks/useModelSetup";

export const PaladinJNordstorm = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/paladin_j_nordstrom.glb"
  );
  const { actions } = useAnimations(animations, group);

  useModelSetup(
    {
      onHeadPositionChange: props.onHeadPositionChange,
      actions,
      nodes,
      excludedActions: PaladinJNordstorm.excludedActions,
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
            name="Paladin_J_Nordstrom"
            geometry={nodes.Paladin_J_Nordstrom.geometry}
            material={materials.Paladin_MAT}
            skeleton={nodes.Paladin_J_Nordstrom.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Paladin_J_Nordstrom_Helmet"
            geometry={nodes.Paladin_J_Nordstrom_Helmet.geometry}
            material={materials.Paladin_MAT}
            skeleton={nodes.Paladin_J_Nordstrom_Helmet.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

PaladinJNordstorm.excludedActions = [];
