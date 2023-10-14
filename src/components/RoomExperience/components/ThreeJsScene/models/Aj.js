import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useModelSetup } from "../hooks/useModelSetup";

export const Aj = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/aj.glb");
  const { actions } = useAnimations(animations, group);

  useModelSetup(
    {
      onHeadPositionChange: props.onHeadPositionChange,
      actions,
      nodes,
      excludedActions: Aj.excludedActions,
    },
    ref
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.007}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            name="Boy01_Body_Geo"
            geometry={nodes.Boy01_Body_Geo.geometry}
            material={materials.Boy01_Body_MAT1}
            skeleton={nodes.Boy01_Body_Geo.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Boy01_Brows_Geo"
            geometry={nodes.Boy01_Brows_Geo.geometry}
            material={materials.Boy01_Brows_MAT2}
            skeleton={nodes.Boy01_Brows_Geo.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Boy01_Eyes_Geo"
            geometry={nodes.Boy01_Eyes_Geo.geometry}
            material={materials.Boy01_Eyes_MAT2}
            skeleton={nodes.Boy01_Eyes_Geo.skeleton}
          />
          <skinnedMesh
            castShadow
            name="h_Geo"
            geometry={nodes.h_Geo.geometry}
            material={materials.Boy01_Mouth_MAT2}
            skeleton={nodes.h_Geo.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

Aj.excludedActions = [];
