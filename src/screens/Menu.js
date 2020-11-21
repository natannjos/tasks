import React from 'react'
import { ScrollView, View, Text, StyleSheet, Platform, TouchableOpacity, ToastAndroid } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { FontAwesome } from '@expo/vector-icons'
import { Gravatar } from 'react-native-gravatar'
import commonStyles from '../commonStyles'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'


export default props => {
		
		const logout = () => {
			SecureStore.deleteItemAsync('userData')
			delete axios.defaults.headers.common['Authorization']
			props.navigation.navigate('Auth')
			ToastAndroid.show('Você saiu', ToastAndroid.SHORT);
	}
	return (
		<ScrollView style={{paddingTop: 25}}>
			<View style={styles.header}>
				<Text style={styles.title}>
					Tasks
				</Text>
				<Gravatar style={styles.avatar}
					options={{
						email: props.navigation.getParam('email'),
						secure: true
					}}
				/>
			</View>

			<View style={styles.userInfo}>
				<Text style={styles.name}>
					{props.navigation.getParam('name')}
				</Text>
				<Text style={styles.email}>
					{props.navigation.getParam('email')}
				</Text>
			</View>

			<TouchableOpacity onPress={logout}>
				<View style={styles.logoutIcon}>
						<FontAwesome size={25} name='sign-out' color='#800'/>
						<Text style={{marginLeft: 10}}>Logout</Text>
				</View>
			</TouchableOpacity>

			<DrawerItems {...props} />

		</ScrollView>
	)
}

const styles = StyleSheet.create({
	header: {
		borderBottomWidth:1,
		borderColor: '#ddd'
	},
	title: {
		color: '#000',
		fontSize: 30,
		paddingTop: Platform.OS === 'ios' ? 70 : 30,
		padding: 10,
	},
	avatar: {
		height: 60,
		width: 60,
		borderWidth: 3,
		borderRadius: 30,
		borderColor: '#666',
		backgroundColor: "#222",
		margin: 10,
	},
	userInfo: {
		marginLeft: 10
	},
	name: {
		fontSize: 20,
		marginBottom: 5,
		color: commonStyles.colors.mainText
	},
	email: {
		fontSize: 15,
		color: commonStyles.colors.subText,
		marginBottom: 10
	},
	logout:{
		marginLeft: 20,
		alignItems: 'flex-start',
	},
	logoutIcon: {
		marginLeft: 10,
		marginBottom: 10,
		flexDirection: 'row',
	}
})