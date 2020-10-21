import * as Font from 'expo-font';


Font.loadAsync({
	Lato: require('../assets/fonts/Lato.ttf')
})


export default {
	fontFamily: 'Lato',
	colors: {
		secondary: 'white',
		mainText: '#222',
		subText: '#555',
	}
}