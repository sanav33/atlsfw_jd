import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

const UserProfileScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [savedPath, setSavedPath] = useState(null); // Move this inside the component

  const saveImageLocally = async (fileUri) => {
    const fileName = fileUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: fileUri,
        to: newPath,
      });
      console.log('Image saved at', newPath);
      setSavedPath(newPath); // This will now work because setSavedPath is defined in this scope
      return newPath;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      await saveImageLocally(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile Page</Text>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {savedPath && <Image source={{ uri: savedPath }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 60,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    textAlign: 'center',
  },
});

export default UserProfileScreen;
