import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export default class AuthOrApp extends Component {

	componentDidMount = async () => {
		const userDataJson = await SecureStore.getItemAsync('userData')
		let userData = null 

		try {
			userData = JSON.parse(userDataJson)
			
		} catch (error) {
			console.log(error)
		}

		if(userData && userData.token) {
			axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
			this.props.navigation.navigate('Home', userData)
		} else {
			this.props.navigation.navigate('Auth')
		}
	}

	render() {

		return (
				<View style={styles.container}>
					<ActivityIndicator size='large'  />
				</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'black',
	}
})