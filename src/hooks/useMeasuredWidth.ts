import { useState } from "react";
import type { LayoutChangeEvent } from "react-native";

export function useMeasuredWidth() {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const style = width ? { width } : undefined;

  return {
    width,
    style,
    onLayout,
  };
}
