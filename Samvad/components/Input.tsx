import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends ShortcutProps, TextInputProps {}

export default function Input(props: InputProps) {
  return (
    <TextInput
      style={[
        defaultShortcuts(props),
        {
          fontSize: 16,
          borderRadius: 12,
          backgroundColor: "white",
          color: "black",
          borderWidth : 1,
          
        },
      ]}
      {...props}
    />
  );
}
