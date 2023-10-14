import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useModelSetup } from "../hooks/useModelSetup";

export const Arissa = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/arissa.glb");
  const { actions } = useAnimations(animations, group);

  useModelSetup(
    {
      onHeadPositionChange: props.onHeadPositionChange,
      actions,
      nodes,
      excludedActions: Arissa.excludedActions,
    },
    ref
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="arissaMeshes"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        />
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            castShadow
            name="arissaBody_Geo"
            geometry={nodes.arissaBody_Geo.geometry}
            material={materials.Arissa_MAT}
            skeleton={nodes.arissaBody_Geo.skeleton}
          />
          <skinnedMesh
            castShadow
            name="arissaCloak_Geo"
            geometry={nodes.arissaCloak_Geo.geometry}
            material={materials.Arissa_MAT}
            skeleton={nodes.arissaCloak_Geo.skeleton}
          />
          <skinnedMesh
            castShadow
            name="arissaSkirt_Geo"
            geometry={nodes.arissaSkirt_Geo.geometry}
            material={materials.Arissa_MAT}
            skeleton={nodes.arissaSkirt_Geo.skeleton}
          />
          <skinnedMesh
            castShadow
            name="arissaWeapons_Geo"
            geometry={nodes.arissaWeapons_Geo.geometry}
            material={materials.Arissa_MAT}
            skeleton={nodes.arissaWeapons_Geo.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

Arissa.excludedActions = ["danceFlair"];
