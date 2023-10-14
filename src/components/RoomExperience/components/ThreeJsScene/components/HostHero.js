import React, { forwardRef } from "react";

import { Hero } from "./Hero";

export const HostHero = forwardRef(
  ({ cameraRef, name, role, component }, ref) => {
    return (
      <Hero
        ref={ref}
        name={name}
        role={role}
        component={component}
        cameraRef={cameraRef}
        componentProps={{
          position: [-2, 0 + (component.postAddY || 0), 0.5],
          rotation: [0, 1, 0],
        }}
      />
    );
  }
);
