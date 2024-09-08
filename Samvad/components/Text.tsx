import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";
import { PropsWithChildren } from "react";
import { Text as RNText, TextProps } from "react-native";

interface CustomTextProps extends PropsWithChildren, ShortcutProps, TextProps {
  fontSize?: number;
  bold?: boolean;
  underline?: boolean;
  color?: string;
}

export function Text({
  fontSize,
  bold,
  underline,
  color,
  children,
  ...restProps
}: CustomTextProps) {
  return (
    <RNText style={[defaultShortcuts(restProps), {
      fontSize,
      fontWeight: bold ? "bold" : "normal",
      textDecorationLine: underline ? "underline" : "none",
      color,
    }]} {...restProps}>
      {children}
    </RNText>
  )
}
