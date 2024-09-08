import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface PasswordProps extends ShortcutProps, TextInputProps {}

export default function Password(props: PasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[
          defaultShortcuts(props),
          styles.input,
          props.style,
        ]}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={togglePasswordVisibility}
      >
        <Ionicons
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: "white",
    color: "black",
    borderWidth: 1,
    paddingRight: 40, // Make room for the icon
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
});
