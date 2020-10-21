import * as Font from 'expo-font';

function loadFont() {
	Font.loadAsync({
		Lato: require('../assets/fonts/Lato.ttf')
	})
}


export default {
	loadFont,
	fontFamily: 'Lato',
	colors: {
		today: '#b13b44',
		secondary: 'white',
		mainText: '#222',
		subText: '#555',
	}
}