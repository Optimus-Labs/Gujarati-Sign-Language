import React, { useState, useRef } from "react";
import {
  View,
  PanResponder,
  StyleSheet,
  Button,
  GestureResponderEvent,
  Text,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import Toast from "react-native-toast-message";

export default function WriteScreen() {
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const viewShotRef = useRef<ViewShot | null>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event: GestureResponderEvent) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentPath(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (event: GestureResponderEvent) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentPath((prevPath) => `${prevPath} L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath("");
    },
  });

  const handleSubmit = async () => {
    const viewShot = viewShotRef.current;
    if (viewShot) {
      setIsProcessing(true);
      try {
        const uri = await viewShot.capture();
        if (uri) {
          const text = await recognizeText(uri);
          setRecognizedText(text);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Text recognized successfully",
          });
        }
      } catch (error) {
        console.error("Error processing image:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to process image",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const recognizeText = async (imageUri: string): Promise<string> => {
    const apiUrl = "https://ocrapi-4.onrender.com/ocr"; // Use 10.0.2.2 for Android emulator, localhost for iOS simulator
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/png",
      name: "image.png",
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error("OCR request failed");
      }

      const result = await response.json();
      console.log("OCR Result:", result);
      return result.text;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleClear = () => {
    setPaths([]);
    setCurrentPath("");
    setRecognizedText("");
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShotRef} style={styles.drawingArea}>
        <View {...panResponder.panHandlers}>
          <Svg height="100%" width="100%">
            {paths.map((path, index) => (
              <Path
                key={index}
                d={path}
                stroke="black"
                strokeWidth={15}
                fill="none"
              />
            ))}
            <Path d={currentPath} stroke="black" strokeWidth={15} fill="none" />
          </Svg>
        </View>
      </ViewShot>
      <View style={styles.buttonContainer}>
        <Button
          title={isProcessing ? "Processing..." : "Recognize Text"}
          onPress={handleSubmit}
          disabled={isProcessing}
        />
        <Button title="Clear" onPress={handleClear} disabled={isProcessing} />
      </View>
      {recognizedText !== "" && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Recognized Text:</Text>
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        </View>
      )}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  drawingArea: {
    flex: 1,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  textContainer: {
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  recognizedText: {
    fontSize: 16,
  },
});
