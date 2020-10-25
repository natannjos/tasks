import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import moment from 'moment'
import 'moment/locale/pt-br'



export default props => {

	const doneOrNotStyle = props.doneAt != null 
	? { textDecorationLine: 'line-through'} : {}


	const date = props.doneAt ? props.doneAt: props.estimatedAt

	const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

	const showRightContent = () => {
		return (
			<View style={styles.rightActions}>

				<TouchableOpacity onPress={() => props.onDelete && props.onDelete(props.id)}>
					<View style={styles.deleteButton}>
						<FontAwesome name='trash' size={30} color='white' style={styles.icon}/>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => props.onEdit && props.onEdit(props.id)}>
					<View style={styles.editButton}>
						<FontAwesome name='pencil' size={30} color='white' style={styles.icon}/>
					</View>	
				</TouchableOpacity>	
			</View>

		)
	}

	return (
		<Swipeable
			renderRightActions={showRightContent}
			overshootRight={false}
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

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderColor: '#AAA',
		borderBottomWidth: 1,
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: 'white'
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
		flexDirection: 'row',
		borderColor: '#AAA',
		borderBottomWidth: 1
	},
	editButton: {
		flex: 1,
		backgroundColor: 'green',
		alignItems:'center',
		justifyContent: 'center',
		paddingHorizontal: 10
	},
	deleteButton: {
		flex: 1,
		backgroundColor: 'red',
		alignItems:'center',
		justifyContent: 'center',
		paddingHorizontal: 10
	},
	editText: {
		color: 'white',
		fontSize: 20,
		margin: 10
	},
	icon: {
		marginHorizontal: 5
	}
})