import { useEffect, useState } from "react";

export const CountDownContent = ({ children, renderSecond, seconds = 3 }) => {
  const [second, setSecond] = useState(seconds);

  useEffect(() => {
    const int = setInterval(() => {
      setSecond((current) => {
        if (current - 1 <= 0) {
          clearInterval(int);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [renderSecond, seconds]);

  return second ? renderSecond(second) : children;
};
