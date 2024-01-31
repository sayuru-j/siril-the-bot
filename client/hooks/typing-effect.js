import { useEffect, useState } from "react";

export function useTypingEffect(textToType, interKeyStrokeDurationInMs) {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPosition((val) => val + 1);
    }, interKeyStrokeDurationInMs);

    return () => {
      clearInterval(intervalId);
    };
  }, [interKeyStrokeDurationInMs]);

  return textToType.substring(0, currentPosition);
}
