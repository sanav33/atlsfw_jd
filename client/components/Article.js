import {View, Image, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { like, unlike } from "../redux/actions/likeAction";
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthorNameScreen from '../Screens/AuthorNameScreen'; // Import the AuthorNameScreen component
import axios from 'axios';
import MY_IP_ADDRESS from '../environment_variables.mjs';
import { useNavigation } from '@react-navigation/native';

const Article = (props) => {
	const { image, title, author, likes, article_id, article_link} = props.article;

	const [currentScreen, setCurrentScreen] = useState('Community');

	const liked_articles_state = useSelector((store) => store.liked_articles.liked_articles);

  	const navigation = useNavigation();

	const [ratio, setRatio] = useState(1);
	const [isSavePressed, setSavePressed] = useState(false);
	const [liked, setLiked] = useState(liked_articles_state.includes(article_id));
	const [count, setCount] = useState(1);

	const LikeButton = () => {};

  const navigateToContent = (link) => {
  	navigation.navigate('Article Content', { link });
  };

	useEffect(() => {
		if (image) {
			Image.getSize(image, (width, height) => setRatio(width / height));
		}
	}, [image]);

	//begin like button functionality
	const dispatch = useDispatch();
 
	//redux states
	const isLogged = useSelector((store) => store.isLogged.isLogged);
	const user_id = useSelector((store) => store.user_id.user_id);
	let liked_articles = [];

	//set liked articles to liked 

	const handleLike = () => {
		// toggle button state
		setLiked((liked) => !liked);

		//check if logged in 
		console.log("inside article",isLogged);
		console.log(user_id);

		if (isLogged) {
			if (!liked) {
				// create temp list, append new liked article
				liked_articles = liked_articles_state.slice();
				liked_articles.push(article_id);
				liked_articles = [...new Set(liked_articles)];

				// hit BE endpoint
				addedToDB(liked_articles);
			} else {
				// create temp list, remove liked article
				liked_articles = liked_articles_state.slice();
				liked_articles.splice(liked_articles.indexOf(article_id), 1)

				// hit BE endpoint
				removeFromDB(liked_articles);
			}
		} else {
			navigation.navigate('Log In');
		}
		
	}

	const addedToDB = async () => {
		const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/' + 'posts/' + user_id + '/' + article_id + '?like=1', {
			liked_articles
		});

		console.log(response.data);
		const data = response.data;

		if (data.success) {
			//dispatch like action if article has been added to db
			dispatch(like(article_id));
			
		} else {
			console.log("well what about this");
          	console.log(data.message);
		}
	}

	const removeFromDB = async () => {
		const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/' + 'posts/' + user_id + '/' + article_id + '?like=-1', {
			liked_articles
		});

		console.log(response.data);
		const data = response.data;

		if (data.success) {
			//dispatch unlike action if article has been removed from db
			dispatch(unlike(article_id));
		} else {
			console.log("well what about this");
          	console.log(data.message);
		}
	}

	return (
		<View style={styles.article}>
			<View>
			<TouchableOpacity onPress={() => navigateToContent(article_link)}>
				<Image
					source={{
						uri:image,
					}}
					style={[styles.image, {aspectRatio: ratio}]}
				/>
				</TouchableOpacity>
				<Text style={styles.title}>{title}</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Author')} style={{ marginTop: 10 }}>
            		<Text style={styles.authorName}>{author}</Text>
         		</TouchableOpacity>
         		<Pressable onPress={() => handleLike()} style={styles.likeButton}>
      				<MaterialCommunityIcons
        			name={ liked ? "heart" : "heart-outline"}
        			size={32}
        			color={liked ? "red" : "black"}
      				/>
      				<Text>{liked ? likes + 1 : likes}</Text>
    			</Pressable>

          		<TouchableOpacity onPress={() => setSavePressed((isSavePressed) => !isSavePressed)} style={styles.saveButton}>
            		<Icon name={isSavePressed ? 'bookmark' : 'bookmark-o'} size={30} color={isSavePressed ? 'blue' : 'black'} />
         		</TouchableOpacity>
			</View>
		</View>

	); 
};

const styles = StyleSheet.create({
	article: {
		width: "100%",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		margin: 10,
		left: 10,
	},
	image: {
		width: "100%",
		borderRadius: 25,
	},
	likeButton: {
		// backgroundColor: "#D3CFD4",
		position: "absolute",
		bottom: 0,
		right: 10,
		padding: 5,
		borderRadius: 50,
	},
	saveButton: {
		position: "absolute",
		bottom: 22,
		right: 48,
		padding: 5,
		borderRadius: 50,
	},
	authorName: {
		textDecorationLine: 'underline',
		left: 10,
		marginBottom: 20,
	}
});

export default Article

