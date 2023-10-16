import {View, Image, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { like, unlike } from "../redux/actions/likeAction";
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthorNameScreen from '../Screens/AuthorNameScreen'; // Import the AuthorNameScreen component

const Article = (props) => {
	const { image, title, author, likes, id} = props.article;

	const [currentScreen, setCurrentScreen] = useState('Community');

	const [ratio, setRatio] = useState(1);
	const [isSavePressed, setSavePressed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(1);

	const LikeButton = () => {};

	const navigateToPage = (pageName) => {
        setCurrentScreen(pageName);
    };

    const navigateToAuthorPage = () => {
      setCurrentScreen('AuthorNameScreen');
    };
	useEffect(() => {
		if (image) {
			Image.getSize(image, (width, height) => setRatio(width / height));
		}
	}, [image]);

	//redux stuff
	const dispatch = useDispatch();
 
	const isLogged = useSelector((store) => store.isLogged.isLogged);
	const liked_articles = useSelector((store) => store.liked_articles.liked_articles);

	const handleLike = () => {
		setLiked((isLiked) => !isLiked);
		// //check if logged in 
		// if (isLogged) {
		// 	addedToDB();
		// }
		// // TODO: if not, go to login
		
	}
	// const addedToDB = async () => {
	// 	// TODO: get user ID
	// 	// TODO: figure out URL format
	// 	const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/' + '/posts/:user_id/:article_id/', {
	// 		liked_articles
	// 	});

	// 	console.log(response.data);
	// 	const data = response.data;

	// 	if (data.success) {
	// 		//dispatch like action if article has been added
	// 		dispatch(like(id));
	// 	} else {
	// 		// TODO: send data failed msg or smth
	// 	}
	// }

	return (
		<View style={styles.article}>
			<View>
				<Image
					source={{
						uri:image,
					}}
					style={[styles.image, {aspectRatio: ratio}]}
				/>
				<Text style={styles.title}>{title}</Text>
				<TouchableOpacity onPress={navigateToAuthorPage} style={{ marginTop: 10 }}>
            <Text style={styles.authorName}>{author}</Text>
         </TouchableOpacity>
         				<Pressable onPress={() => handleLike()} style={styles.likeButton}>
      				<MaterialCommunityIcons
        			name={liked ? "heart" : "heart-outline"}
        			size={32}
        			color={liked ? "red" : "black"}
      				/>
      			<Text>{liked ? (likes + 1) : likes}</Text>
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

