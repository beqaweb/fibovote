import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export const MarqueeText = ({ text, noAnimation }) => {
  const [textState, setTextState] = useState("");

  useEffect(() => {
    if (typeof text !== "string") {
      return;
    }

    setTextState("");

    if (!text) {
      return;
    }

    const fullText = text;
    const int = setInterval(() => {
      setTextState((currentVal) => {
        if (currentVal.length === fullText.length) {
          clearInterval(int);
          return currentVal;
        }
        return fullText.slice(0, currentVal.length + 1);
      });
    }, 30);

    return () => {
      clearInterval(int);
    };
  }, [text]);

  return typeof text === "string" ? (
    <Typography fontSize="inherit">{noAnimation ? text : textState}</Typography>
  ) : (
    text
  );
};
