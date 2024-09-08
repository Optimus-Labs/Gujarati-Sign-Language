import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Text } from "./Text";

interface ButtonProps extends ShortcutProps, TouchableOpacityProps {
  variant?: "contained" | "outlined" | "ghost";
  isLoading?: boolean;
}

export default function Button({
  onPress,
  children,
  variant = "contained",
  isLoading,
  ...restProps
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[
        defaultShortcuts(restProps),
        styles[variant].button,
        isLoading && disabled.button,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator animating size={22} />
      ) : (
        <Text style={styles[variant].text}> {children} </Text>
      )}
    </TouchableOpacity>
  );
}

const disabled = StyleSheet.create({
  button: {
    opacity: 0.5,
  },
  text : {
    color : "white"
  }
});

const styles = {
  contained: StyleSheet.create({
    button: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: "black",
    },
    text: {
      textAlign: "center",
      color: "white",
      fontSize: 18,
    },
  }),
  outlined: StyleSheet.create({
    button: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: "darkgray",
      borderWidth: 1,
    },
    text: {
      textAlign: "center",
      color: "black",
      fontSize: 18,
    },
  }),
  ghost: StyleSheet.create({
    button: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: "transparent",
    },
    text: {
      textAlign: "center",
      color: "black",
      fontSize: 18,
    },
  }),
};
