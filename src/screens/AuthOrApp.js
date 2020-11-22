import React, { Component } from 'react'
import { SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'

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
				<SafeAreaView style={styles.container}>
					<ActivityIndicator size='large'  />
				</SafeAreaView>
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