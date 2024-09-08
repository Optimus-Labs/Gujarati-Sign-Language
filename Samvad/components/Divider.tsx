import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";
import { View } from "react-native";

interface DividerProps extends ShortcutProps {}

export function Divider (props: DividerProps) {
  
  
  return (
    <View
    style = {[defaultShortcuts(props), {
      height: 1,
      backgroundColor: "gray"
    }]}
    />
  );
}