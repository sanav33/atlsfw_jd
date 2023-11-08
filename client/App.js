// This is example code to hit the server endpoint to access the posts in JSON format.

import React, { useState, useEffect} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, StyleSheet, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommunityScreen from './Screens/CommunityScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import MY_IP_ADDRESS from './environment_variables.mjs';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './redux/store';
import Article from "./components/Article";
import ArticleContent from './Screens/ArticleContent';
import AuthorNameScreen from './Screens/AuthorNameScreen';
import ProfilePage from './Screens/ProfilePage';
import NavBar from './components/NavBar';


const Stack = createNativeStackNavigator();
const App = () => {
  console.log("found local ip @", MY_IP_ADDRESS);
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Community"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#02833D',
          },
          headerTintColor: 'white',
        }}>
        <Stack.Screen name="Log In" component={LoginScreen}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Author" component={AuthorNameScreen} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Article Content" component={ArticleContent} />
        {/* add saved screen and future screens */}
      </Stack.Navigator>
      <NavBar/>
    </NavigationContainer>
    </Provider>
    
  );

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  logo: {
    width: 66,
    height: 58,
  }, 
  likes: {
    flexDirection: 'row',
    paddingTop: 1
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
});


export default App;

// const LikeButton = () => {
//   //set button to red or black
//   const [liked, setLiked] = useState(false);
//   //likes count
//   const [count, setCount] = useState(1);

//   //get likes from endpoint
//   const [ip, setIp] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://" + MY_IP_ADDRESS +":5050/posts/6434998aac3580d94d2d9858");
//         // console.log(response);
//         const data = await response.json();
//         setCount(data.likes);
//         setIp(data.likes);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Pressable onPress={() => setLiked((isLiked) => !isLiked)} style={styles.likes}>
//       <MaterialCommunityIcons
//         name={liked ? "heart" : "heart-outline"}
//         size={32}
//         color={liked ? "red" : "black"}
//       />
//       <Text>{liked ? (count + 1) : count}</Text>
//     </Pressable>
    
//   );
// };
// //need to keep track of the loaded article content with global var
// var contents = " ";
// var articleTitle = " ";

// const ArticleButton = () => {
  
//   const [showText, setShowText] = useState(false);
  
//   // console.log("contents init: " + contents + ";");

//   const [ip, setIp] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //"http://<your IP here>:5050/posts/<objectID>"
//         //check IP every time u start
//         //objID can be found on cloud.mongodb.com, look in gc for login
//         const response = await fetch("http://" + MY_IP_ADDRESS + ":5050/posts/6434998aac3580d94d2d9858");
//         const data = await response.json();
//         setIp(data.content);

//         //data = the specificed obj in JSON format

//         // console.log("still empty: " + contents + ";");
//         contents = data.content;
//         articleTitle = data.title;
//         // console.log("has contents: " + contents + ";");
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <View>
//       <Button title="Show Article" onPress={() => setShowText(!showText)}/>
//       {showText ? <Text>{contents}</Text> : null}
//     </View>
//   );
// };