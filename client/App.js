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
        const response = await fetch("http://128.61.53.208:5050/posts/6434998aac3580d94d2d9858");
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

const App = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=700&q=60" }}/>
      <LikeButton/>
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
  }
});


export default App;
