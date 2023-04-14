// This is example code to hit the server endpoint to access the posts in JSON format.

import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [ip, setIp] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://128.61.53.208:5050/posts/6434998aac3580d94d2d9858");
        const data = await response.json();
        // count = data.likes;
        // console.log(data.likes);
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

const DisplayAnImage = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=700&q=60" }}/>
      <LikeButton/>
    </View>
  );
};



export default DisplayAnImage;
