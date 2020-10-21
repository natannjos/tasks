import React, { Component } from 'react'
import { 
	SafeAreaView, 
	View, 
	Text, 
	ImageBackground, 
	StyleSheet, 
	FlatList} from 'react-native'
import Task from '../components/Task'

// Assets
import todayImage from '../../assets/imgs/today.jpg'

// Libs
import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {

	state = {
		tasks: [
			{ id: Math.random(), desc: 'Comprar Café', doneAt: new Date(), estimatedAt: new Date() },
			{ id: Math.random(), desc: 'Estudar Livro', doneAt: null, estimatedAt: new Date() },
		]
	}

	toggleTask = (taskId) => {
		let tasks = [...this.state.tasks]
		tasks.forEach(task => {
			if(task.id === taskId){
				task.doneAt = task.doneAt ? null : new Date()
			}
		})

		this.setState({tasks})
	}

	render(){
		const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

		return (
			<SafeAreaView style={styles.container}>

				<ImageBackground 
					source={todayImage}
					style={styles.background}>

				<View style={styles.titleBar}>
					<Text style={styles.title}>Hoje</Text>
					<Text style={styles.subtitle}>{today}</Text>
				</View>

			</ImageBackground>

				<View style={styles.taskList}>
					<FlatList 
						data={this.state.tasks} 
						keyExtractor={item => `${item.id}`}
						renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}/>}
					/>
				</View>

			</SafeAreaView>
		)
	}
}


// Styles
import commonStyles from '../commonStyles'
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		flexGrow: 3
	},
	taskList: {
		flexGrow: 7
	},
	titleBar: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 50,
		marginLeft: 20,
		marginBottom: 20
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 30
	}
})