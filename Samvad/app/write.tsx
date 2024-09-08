import React, { useState, useRef } from 'react';
import { View, PanResponder, StyleSheet, Button, GestureResponderEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';
import Toast from 'react-native-toast-message';

export default function WriteScreen() {
    const [paths, setPaths] = useState<string[]>([]);
    const [currentPath, setCurrentPath] = useState<string>('');
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
            setCurrentPath(prevPath => `${prevPath} L${locationX},${locationY}`);
        },
        onPanResponderRelease: () => {
            setPaths(prevPaths => [...prevPaths, currentPath]);
            setCurrentPath('');
        },
    });

    const handleSubmit = async () => {
        const viewShot = viewShotRef.current;
        if (viewShot) { // Add null check
            const uri = await viewShot.capture(); // Remove optional chaining
            if (uri) {
                await sendImageToAPI(uri);
            }
        }
    };

    const sendImageToAPI = async (imageUri: string) => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                type: 'image/png',
                name: 'drawing.png',
            } as any);

            const response = await fetch('http://something.app/image', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Image sent successfully'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to send image'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error sending image'
            });
            console.error('Error sending image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ViewShot ref={viewShotRef} style={styles.drawingArea}>
                <View {...panResponder.panHandlers}>
                    <Svg height="100%" width="100%">
                        {paths.map((path, index) => (
                            <Path key={index} d={path} stroke="black" strokeWidth={2} fill="none" />
                        ))}
                        <Path d={currentPath} stroke="black" strokeWidth={2} fill="none" />
                    </Svg>
                </View>
            </ViewShot>
            <Button title="Submit" onPress={handleSubmit} />
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    drawingArea: {
        flex: 1,
    },
});