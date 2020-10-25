import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
	TouchableWithoutFeedback,
	TouchableOpacity,
	TextInput,
	View,
	Text,
	Platform
} from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {

	state = {
		...initialState
	}

	setTask = () => {
			this.props.editingTask 
			? this.setState({ 
					desc: this.props.editingTask.desc, 
					date: this.props.editingTask.estimatedAt
				}) 
			: null
	}

	getDatePicker = () => {
		let datePicker = <DateTimePicker 
			value={this.state.date}
			onChange={(_, date) => this.setState({ date, showDatePicker: false })}
			mode='date'
		/>

		const dateString = moment(this.state.date).format('ddd, D [de] MMM [de] YYYY')

		if(Platform.OS === 'android'){
			datePicker = (
				<View>
					<TouchableOpacity
						onPress={() => this.setState({ showDatePicker: true })}>
						<Text style={styles.date}>
							{dateString}
						</Text>
					</TouchableOpacity>
					{this.state.showDatePicker && datePicker}
				</View>
			)
		}
		return datePicker
	}

	save = () => {
		const newTask = {
			desc: this.state.desc,
			date: this.state.date
		}

		if(this.props.onSave){
			this.props.onSave(newTask)
		} else if(this.props.onEdit){
			this.props.onEdit(newTask)
		}
		this.setState({ ...initialState })
	}

	render() {
		
		return (

			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.isVisible}
				onRequestClose={() => this.props.onCancel}
				onShow={this.setTask}
			>

				<TouchableWithoutFeedback
					onPress={this.props.onCancel}
				>
					<View style={styles.background}></View>
				</TouchableWithoutFeedback>

				<View style={styles.container}>
					<Text style={styles.header}>Nova Tarefa</Text>
					
					<TextInput style={styles.input}
						placeholder='Informe sua tarefa...'
						value={this.state.desc} 
						onChangeText={desc => this.setState({ desc })}
						/>
					<View style={styles.dateContainer}>
						<Text>Selecione a data:</Text>
						{ this.getDatePicker() }
					</View>

					<View style={styles.buttons}>

						<TouchableOpacity onPress={this.props.onCancel}>
							<Text style={styles.button}>Cancelar</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={this.save}>
							<Text style={styles.button}>Salvar</Text>
						</TouchableOpacity>

					</View>
				</View>

				<TouchableWithoutFeedback
					onPress={this.props.onCancel}
				>
					<View style={styles.background}></View>
				</TouchableWithoutFeedback>

			</Modal>

		);
	}
}

import commonStyles from '../commonStyles'
const styles = StyleSheet.create({
	background: {
		flex:1, 
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},
	container: {
		backgroundColor: 'white'
	},
	header: {
		backgroundColor: commonStyles.colors.today,
		color: commonStyles.colors.secondary,
		textAlign: "center",
		fontSize: 18,
		padding: 15
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	button: {
		margin: 20,
		marginRight: 30,
		color: commonStyles.colors.today
	},
	input:{
		height: 40,
		margin: 15,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#e3e3e3',
		borderRadius: 6,
		padding: 5
	},

	date: {
		borderColor: commonStyles.colors.today,
		borderWidth: 1,
		borderRadius: 20,
		fontSize: 20,
		textAlign: "center",
		paddingHorizontal: 10
	},
	dateContainer: {
		alignItems: 'center'
	}
});