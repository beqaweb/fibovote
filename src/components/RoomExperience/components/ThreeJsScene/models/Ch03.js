import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useModelSetup } from "../hooks/useModelSetup";

export const Ch03 = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/ch03.glb");
  const { actions } = useAnimations(animations, group);

  useModelSetup(
    {
      onHeadPositionChange: props.onHeadPositionChange,
      actions,
      nodes,
      excludedActions: Ch03.excludedActions,
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
            name="Ch03"
            geometry={nodes.Ch03.geometry}
            material={materials.Ch03_Body}
            skeleton={nodes.Ch03.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

Ch03.nameAddY = 0.02;
Ch03.excludedActions = [];
