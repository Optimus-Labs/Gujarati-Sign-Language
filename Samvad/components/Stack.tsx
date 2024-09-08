import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";
import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";

export interface StackProps extends PropsWithChildren, ViewProps, ShortcutProps{
  flex?: number;
  direction? : "row" | "column";
  gap?: number;
  alignItems? : "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  justifyContent? : "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly";

}

export function Stack ({
  flex,
  direction,
  gap,
  alignItems,
  justifyContent,
  children,
  style,
  ...restProps
} : StackProps) {
  return (<View style={[defaultShortcuts(restProps), {
    flex,
    flexDirection: direction,
    gap,
    alignItems,
    justifyContent,
  }, style
  ]} {... restProps}>
    {children}
    </View>);
}
