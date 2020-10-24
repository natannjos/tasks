import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import { Swipeable } from 'react-native-gesture-handler'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

	const doneOrNotStyle = props.doneAt != null 
	? { textDecorationLine: 'line-through'} : {}


	const date = props.doneAt ? props.doneAt: props.estimatedAt

	const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

	const showRightContent = () => {
		return (
				<TouchableOpacity onPress={() => console.warn('Funcionou')}>
					<View style={styles.rightActions}>
						<FontAwesome name='trash' size={30} color='white'/>
					</View>
				</TouchableOpacity>
		)
	}
	


	return (
		<Swipeable
			renderRightActions={showRightContent}
		>
			<TouchableWithoutFeedback
				onPress={ () => props.toggleTask(props.id) }>
				<View style={styles.container}>


						<View style={styles.checkContainer}>
							{getCheckView(props.doneAt)}
						</View>

						<View>
							<Text style={ [ styles.task, doneOrNotStyle ] }>{props.desc}</Text>
							<Text style={ styles.date }>
								{props.doneAt ? 'Feito em ': ''}
								{formatedDate}
							</Text>
						</View>
				</View>
			</TouchableWithoutFeedback>
		</Swipeable>

	)
}

function getCheckView(doneAt) {
	if(doneAt) {
		return ( 
			<View>
				<FontAwesome name="check-circle" size={30} color='#4d7031'/>
			</View>
		)
			
		} else {
				return ( 
					<View style={styles.pending}></View>
				)
		}
}


import commonStyles from '../commonStyles'
commonStyles.loadFont()

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderColor: '#AAA',
		borderBottomWidth: 1,
		alignItems: 'center',
		paddingVertical: 10
	},
	checkContainer: {
		width: '20%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	pending: {
		height: 25,
		width: 25,
		borderRadius: 13,
		borderWidth: 2,
		borderColor: '#555',
	},
	done: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	task: {
		color: commonStyles.colors.mainText,
		fontSize: 16
	},
	date: {
		color: commonStyles.colors.subText,
		fontSize: 13
	},
	rightActions: {
		flex: 1,
		backgroundColor: '#f15b4e',
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'flex-end',
		paddingHorizontal: 20,
		borderColor: '#AAA',
		borderBottomWidth: 1
	}
})