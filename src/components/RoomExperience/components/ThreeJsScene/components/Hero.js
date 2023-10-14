import React, { forwardRef, useEffect, useRef } from "react";

// models
import { HeroName } from "./HeroName";

export const Hero = forwardRef(
  (
    {
      cameraRef,
      uid,
      index,
      name,
      role,
      component: ModelComponent,
      componentProps = {},
      onCleanup,
    },
    ref
  ) => {
    const heroNameRef = useRef();

    useEffect(() => {
      return () => {
        onCleanup && onCleanup(uid);
      };
    }, [onCleanup, uid]);

    return !ModelComponent ? null : (
      <>
        <ModelComponent
          ref={ref}
          onHeadPositionChange={(headPosition) => {
            heroNameRef.current.setPosition(headPosition);
          }}
          position={[index - 0.5, 0 + (ModelComponent.postAddY || 0), 0]}
          {...componentProps}
        />

        <HeroName
          ref={heroNameRef}
          text={name}
          cameraRef={cameraRef}
          addY={ModelComponent.nameAddY}
        />
      </>
    );
  }
);
