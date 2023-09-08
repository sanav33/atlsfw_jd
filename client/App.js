// This is example code to hit the server endpoint to access the posts in JSON format.

import React, { useState, useEffect} from 'react';
import { Button, View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LikeButton = () => {
  //set button to red or black
  const [liked, setLiked] = useState(false);
  //likes count
  const [count, setCount] = useState(1);

  //get likes from endpoint
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://128.61.52.90:5050/posts/6434998aac3580d94d2d9858");
        // console.log(response);
        const data = await response.json();
        setCount(data.likes);
        setIp(data.likes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Pressable onPress={() => setLiked((isLiked) => !isLiked)} style={styles.likes}>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "black"}
      />
      <Text>{liked ? (count + 1) : count}</Text>
    </Pressable>
    
  );
};
//need to keep track of the loaded article content with global var
var contents = " ";
var articleTitle = " ";

const ArticleButton = () => {
  
  const [showText, setShowText] = useState(false);
  
  // console.log("contents init: " + contents + ";");

  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        //"http://<your IP here>:5050/posts/<objectID>"
        //check IP every time u start
        //objID can be found on cloud.mongodb.com, look in gc for login
        const response = await fetch("http://128.61.52.90:5050/posts/6434998aac3580d94d2d9858");
        const data = await response.json();
        setIp(data.content);

        //data = the specificed obj in JSON format

        // console.log("still empty: " + contents + ";");
        contents = data.content;
        articleTitle = data.title;
        // console.log("has contents: " + contents + ";");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Button title="Show Article" onPress={() => setShowText(!showText)}/>
      {showText ? <Text>{contents}</Text> : null}
    </View>
  );
};


const App = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: "https://cdn.thewirecutter.com/wp-content/media/2021/05/mensjeans-2048px-4026-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024&dpr=2" }}/>
      <View style={{flexDirection: 'row'}}>
        <ArticleButton/>
        <LikeButton/>
      </View>

    </View>
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
