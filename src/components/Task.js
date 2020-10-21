import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';


import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

	const doneOrNotStyle = props.doneAt != null 
	? { textDecorationLine: 'line-through'} : {}


	const date = props.doneAt ? props.doneAt: props.estimatedAt

	const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

	return (
		<TouchableHighlight
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
		</TouchableHighlight>
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
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.mainText,
		fontSize: 16
	},
	date: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.subText,
		fontSize: 13
	}
})