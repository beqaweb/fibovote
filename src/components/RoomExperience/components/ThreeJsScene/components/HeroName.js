import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Text } from "@react-three/drei";

export const HeroName = forwardRef(({ text, cameraRef, addY }, ref) => {
  const textRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      setPosition: (pos) => {
        if (!cameraRef.current || !textRef.current) {
          return;
        }
        pos.y += 0.1 + (addY || 0);
        textRef.current.position.copy(pos);
        textRef.current.lookAt(cameraRef.current.position);
      },
    }),
    [addY, cameraRef]
  );

  return (
    <Text ref={textRef} fontSize={0.1} color="#000">
      {text}
    </Text>
  );
});
