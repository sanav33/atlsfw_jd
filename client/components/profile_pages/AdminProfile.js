import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Button,
  TextInput,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import MY_IP_ADDRESS from "../../environment_variables.mjs";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions/userInfoAction";
import hashString from '../../utils/hashingUtils.mjs';

const AdminProfile = () => {
  const userInfo = useSelector((store) => store.userInfo.userInfo);
  const [selectedTab, setSelectedTab] = useState("auth");
  const [email, setEmail] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [savedPath, setSavedPath] = useState(null);
  const [topLiked, setTopLiked] = useState([]); 
  const [topSaved, setTopSaved] = useState([]);
  const [editedFirstName, setEditedFirstName] = useState(userInfo["first_name"]);
  const [editedLastName, setEditedLastName] = useState(userInfo["last_name"]);
  const [editedUsername, setEditedUsername] = useState(userInfo["username"]);
  const [editedBirthday, setEditedBirthday] = useState(userInfo["birthday"]);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(userInfo["phone_number"]);
  const dispatch = useDispatch();
  const user_id = useSelector((store) => store.user_id.user_id);

  useEffect(() => {
    // fetch top most liked and saved articles upon loading of the page
    const fetchTopLiked = async () => {
      try {
        const url = `http://${MY_IP_ADDRESS}:5050/posts/top_liked`;
        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data)) {
          setTopLiked(response.data);
        }
      } catch (error) {
        console.error("Error fetching top liked posts:", error.message);
      }
    };

    const fetchTopSaved = async () => {
      try {
        const url = `http://${MY_IP_ADDRESS}:5050/posts/top_saved`;
        const response = await axios.get(url);
        if (response.data && Array.isArray(response.data)) {
          setTopSaved(response.data);
        } 
      } catch (error) {
        console.error("Error fetching top saved posts:", error.message);
      }
    };
    fetchTopLiked();
    fetchTopSaved();
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const selectTab = (tab) => {
    setSelectedTab(tab);
  };

  const switchEditMode = () => {
    setEditMode(true);
    setEditedFirstName(userInfo.first_name);
    setEditedLastName(userInfo.last_name);
    setEditedUsername(userInfo.username);
    setEditedBirthday(userInfo.birthday);
    setEditedPhoneNumber(userInfo.phone_number);
  };


  const saveChanges = async () => {
    setEditMode(false);
    if (imageUri) {
      const newPath = await saveImageLocally(imageUri);
      setSavedPath(newPath);
    }

    const updatedUserInfo = {
      first_name: editedFirstName,
      last_name: editedLastName,
      username: editedUsername,
      birthday: editedBirthday,
      phone_number: editedPhoneNumber,
    };

    // Send the user data to your backend
    const response = await axios.patch("http://" + MY_IP_ADDRESS + ":5050/edit/" + user_id, updatedUserInfo);
    
    if (response.status == 200) {
      dispatch(
        setUserInfo({
          ...userInfo,
          first_name: editedFirstName,
          last_name: editedLastName,
          username: editedUsername,
          birthday: editedBirthday,
          phone_number: editedPhoneNumber,
       })
      );
    }
  };


  const saveImageLocally = async (fileUri) => {
    const fileName = fileUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: fileUri,
        to: newPath,
      });
      return newPath;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAuth = async () => {
    try {
      const hashed_email = await hashString(email);
      // Send email to backend
      const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/vendor', {
          hashed_email
        });
      Alert.alert('Success', "Vendor Email is Authorized",
        [{text:'OK',
          cancelable: true,
          },
        ],
      );
    } catch (error) {
      console.error('Error during authorization:', error.response.data.message);
      Alert.alert('Authorization Error', error.response.data.message,
        [{text:'Try Again',
          cancelable: true,
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}></View>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage} disabled={!editMode}>
            <Image
              source={savedPath ? { uri: savedPath } : require("./user.jpg")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.name}>
            {userInfo["first_name"] + " " + userInfo["last_name"]}
          </Text>
          {editMode && (
            <Button title="Change Profile Picture" onPress={pickImage} />
          )}
          <View style={styles.infoContainer}>
            <TouchableOpacity
              style={[
                styles.infoTab,
                selectedTab === "auth" && styles.selectedTab,
              ]}
              onPress={() => selectTab("auth")}
            >
              <Text style={selectedTab === "auth" && styles.selectedTabText}>
                Authorize Vendor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.infoTab,
                selectedTab === "most liked" && styles.selectedTab,
              ]}
              onPress={() => selectTab("most liked")}
            >
              <Text
                style={selectedTab === "most liked" && styles.selectedTabText}
              >
                Most Liked
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.infoTab,
                selectedTab === "most saved" && styles.selectedTab,
              ]}
              onPress={() => selectTab("most saved")}
            >
              <Text
                style={selectedTab === "most saved" && styles.selectedTabText}
              >
                Most Saved
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {selectedTab === "auth" && (
          <View style={styles.contactSection}>
            <TextInput
                placeholder="Vendor Email*"
                style={styles.input}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
          
            <View style={styles.editProfileButton}>
            <Button
                title="Authorize vendor"
                color="black"
                onPress={handleAuth}
            />
            </View>
          </View>
        )}

        {selectedTab === "most liked" && (
          <View style={styles.detailsSection}>
            {topLiked
              .sort((a, b) => b.like_count - a.like_count) // Sort in descending order
              .slice(0, 3)
              .map((article, index) => (
                <View key={article._id} style={styles.articleContainer}>
                  <Text style={styles.articleTitle}>
                    {article.article_title}
                  </Text>
                  <Text style={styles.articleAuthor}>
                    Author: {article.author_name}
                  </Text>
                  <Text style={styles.articleLikeCount}>
                    Likes: {article.like_count}
                  </Text>
                  <Text style={styles.articleTags}>
                    Tags:{" "}
                    {article.tags && article.tags.length > 0
                      ? article.tags.join(", ")
                      : "No tags"}
                  </Text>
                </View>
              ))}
          </View>
        )}
        {selectedTab === "most saved" && (
          <View style={styles.detailsSection}>
            {topSaved
              .sort((a, b) => b.save_count - a.save_count) // Sort in descending order
              .slice(0, 3)
              .map((article, index) => (
                <View key={article._id} style={styles.articleContainer}>
                  <Text style={styles.articleTitle}>
                    {article.article_title}
                  </Text>
                  <Text style={styles.articleAuthor}>
                    Author: {article.author_name}
                  </Text>
                  <Text style={styles.articleLikeCount}>
                    Saves: {article.save_count}
                  </Text>
                  <Text style={styles.articleTags}>
                    Tags:{" "}
                    {article.tags && article.tags.length > 0
                      ? article.tags.join(", ")
                      : "No tags"}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
      {/* Footer section */}
      <View style={styles.footer}>
        <View style={styles.notificationSection}>
          <Text style={styles.notificationText}>
            Subscribe to Notifications?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        {!editMode ? (
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={switchEditMode}
          >
            <Text>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={saveChanges}
          >
            <Text>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#02833D", // A green color similar to the one in the image.
    padding: 50,
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginTop: -50, // Negative margin to pull the profile section up, overlapping the header
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white", // Adjust color as needed to match the background
    overflow: "hidden",
    backgroundColor: "white", // Assuming a white background for the profile picture
    zIndex: 1,
  },
  name: {
    fontSize: 14, // Adjust the size as needed
    fontWeight: "bold", // Use 'normal', 'bold', '100', '200', ... '900'
    marginVertical: 8,
    color: "#000000",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  infoTab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsSection: {
    padding: 16,
    color: "#424242",
  },
  articleContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  articleAuthor: {
    fontSize: 14,
    color: "#757575",
  },
  articleLikeCount: {
    fontSize: 14,
    color: "#757575",
  },
  articleTags: {
    fontSize: 14,
    color: "#757575",
  },
  notificationSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginTop: "auto",
  },
  editProfileButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
  },
  selectedTabText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  notificationText: {
    marginRight: 8,
  },
  interestItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#bcbcbc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkboxSelected: {
    height: 12,
    width: 12,
    borderRadius: 1,
    backgroundColor: "#000",
  },
  interestText: {
    fontSize: 15,
    color: "#424242",
    padding: 3,
  },
  footer: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  contactSection: {
    padding: 30,
    color: "#424242",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  label: {
    fontSize: 15,
    color: "#424242",
    paddingVertical: 5,
  },
  value: {
    fontSize: 15,
    color: "#424242",
    paddingVertical: 5,
  },
});

export default AdminProfile;