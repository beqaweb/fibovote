import React, { forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useModelSetup } from "../hooks/useModelSetup";

export const MremirehODesbiens = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/mremireh_o_desbiens.glb"
  );
  const { actions } = useAnimations(animations, group);

  useModelSetup(
    {
      onHeadPositionChange: props.onHeadPositionChange,
      actions,
      nodes,
      excludedActions: MremirehODesbiens.excludedActions,
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
            name="mremireh_body"
            geometry={nodes.mremireh_body.geometry}
            material={materials.emireh_body_material}
            skeleton={nodes.mremireh_body.skeleton}
          />
          <skinnedMesh
            castShadow
            name="mremireh_shoe"
            geometry={nodes.mremireh_shoe.geometry}
            material={materials.emireh_shoe_material}
            skeleton={nodes.mremireh_shoe.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

MremirehODesbiens.nameAddY = 0.15;
MremirehODesbiens.excludedActions = [];
