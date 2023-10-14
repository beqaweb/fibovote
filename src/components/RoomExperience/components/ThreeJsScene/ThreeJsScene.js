import {
  // OrbitControls,
  PerspectiveCamera,
  // useHelper,
} from "@react-three/drei";
import React, { Suspense, useCallback, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import { Box, Typography } from "@mui/material";
// import { DirectionalLightHelper } from "three";

import { RoomService } from "../../../../services/RoomService";
import { Hero } from "./components/Hero";
import { HostHero } from "./components/HostHero";
import { heroService, roomService } from "../../../../App";
import { LinearProgressWithLabel } from "../../../LinearProgressWithLabel/LinearProgressWithLabel";
import { useScene } from "./hooks/useScene";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <Box
        sx={{
          width: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ mb: 2, whiteSpace: "nowrap" }}>
          Loading the scene
        </Typography>
        <LinearProgressWithLabel
          variant="determinate"
          value={parseInt(progress)}
        />
      </Box>
    </Html>
  );
}

// const LightHelper = () => {
//   const dirLight = useRef(null);
//   useHelper(dirLight, DirectionalLightHelper, "red");

//   return (
//     <>
//       <directionalLight
//         color={"#005F00"}
//         intensity={4}
//         position={[0, 15, 100]}
//         ref={dirLight}
//       />
//     </>
//   );
// };

export const ThreeJsScene = ({
  countdownSeconds,
  reveal,
  votes,
  memberEntries,
  hostEntry,
}) => {
  const cameraRef = useRef();

  const [hostUid, hostData] = hostEntry || [];

  const hostHeroRef = useRef();

  const voterEntries = memberEntries.filter(
    ([_uid, { role }]) => role === RoomService.USER_ROLES.VOTER
  );

  const voterHeroRefs = useRef({});

  const assignRef = (uid, heroRef) => {
    voterHeroRefs.current[uid] = heroRef;
  };

  const handleHeroCleanup = useCallback((uid) => {
    delete voterHeroRefs.current[uid];
  }, []);

  useScene({
    reveal,
    hostHeroRef,
    voterHeroRefs,
    countdownSeconds,
  });

  return (
    <div
      style={{
        width: "100vw",
        height: 500,
      }}
    >
      <Canvas shadows>
        <Suspense fallback={<Loader />}>
          {/* <OrbitControls /> */}

          {/* <color attach="background" args={["black"]} /> */}

          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            fov={50}
            position={[0, 1.2, 4]}
          />

          <ambientLight intensity={1} />
          <directionalLight intensity={6} position={[0, 15, 20]} castShadow />
          {/* <LightHelper /> */}

          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
          >
            <planeGeometry args={[20, 10]} />
            <meshStandardMaterial color="#37936b" />
          </mesh>

          <HostHero
            ref={hostHeroRef}
            name={hostData.name}
            role={hostData.role}
            component={heroService.getMemberHero(hostUid).component}
            cameraRef={cameraRef}
          />

          {voterEntries.map(([uid, { name, role }], index) => {
            return (
              <Hero
                ref={(heroRef) => assignRef(uid, heroRef)}
                key={uid}
                uid={uid}
                name={name}
                role={role}
                component={heroService.getMemberHero(uid).component}
                index={index}
                cameraRef={cameraRef}
                onCleanup={handleHeroCleanup}
              />
            );
          })}
        </Suspense>
      </Canvas>
    </div>
  );
};
