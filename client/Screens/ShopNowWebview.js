import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

const ShopNowWebview = ({route}) => {

	const webViewRef = useRef(null);
	const {link} = route.params;

	return (
	<>
		<WebView 
			source = {{ uri: link }}
			style = {{ flex: 1 }}
		/>

	</>

	);

};

export default ShopNowWebview;