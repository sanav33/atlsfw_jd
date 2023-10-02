import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import encryptWithPublicKey from '../utils/encryptionUtils.mjs';
import hashString from '../utils/hashingUtils.mjs';
import MY_IP_ADDRESS from '../environment_variables.mjs';
import Article from "../components/Article";

var articles =  [
	{
		"article1" : {
			'title': 'Recycle Your Denim',
			'image': "https://wwd.com/wp-content/uploads/2017/04/shutterstock_564544348.jpg",
			'LikeCount': 0
		}
	},
	{
		"article2" : {
			'title': 'Sustainable Materials',
			'image': "https://alewivesfabrics.com/cdn/shop/files/IMG_6856_800x.jpg?v=1689828443",
			"LikeCount": 0
		}
	}
]

const HomeScreen = ({navigation}) => {
// 	// const ArticleButton = () => {
  
//   const [showText, setShowText] = useState(false);
  
//   // console.log("contents init: " + contents + ";");

//   const [ip, setIp] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         //"http://<your IP here>:5050/posts/<objectID>"
//         //check IP every time u start
//         //objID can be found on cloud.mongodb.com, look in gc for login
//         const response = await fetch("http://" + MY_IP_ADDRESS + ":5050/posts/");
//         const data = await response.json();
//         setIp(data.content);
//         console.log(data.content)

//         //data = the specificed obj in JSON format

//         // console.log("still empty: " + contents + ";");
//         // contents = data.content;
//         articleTitle = data.content[0][article_title];
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
	// return(
	// 	<View style={styles.container}> 
	// 	<View>
	// 		<Article
	// 			article={{
	// 				title: articles[0]["article1"]["title"],
	// 				image: articles[0]["article1"]["image"],
	// 			}}
				
	// 		/>
	// 		<Article
	// 			article={{
	// 				title: articles[1]["article2"]["title"],
	// 				image: articles[1]["article2"]["image"],
	// 			}}
				
	// 		/>
	// 	</View>
	// 	</View>


	// );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
});

export default HomeScreen;