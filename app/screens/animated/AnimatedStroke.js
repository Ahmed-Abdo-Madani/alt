import React, { useRef, useState } from "react";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];
const colors2 = ["#FF3346", "#8BFF33", "#A380FF", "#33DBFF"];

const AnimatedStroke = ({ d, progress }) => {
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const stroke2 = colors[Math.round(Math.random() * (colors2.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef(null);
  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.42, 0.25, 0.28, 1)(progress.value),
  }));

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.27, 0, 0.63, 1)(progress.value),
    fillOpacity: progress.value,
  }));

  return (
    <>
      <AnimatedPath
        animatedProps={animatedBGProps}
        d={d}
        stroke={stroke}
        strokeWidth={1.5}
        fill="white"
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={animatedProps}
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        fill={stroke2}
        stroke={stroke2}
        strokeWidth={1.5}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedStroke;
