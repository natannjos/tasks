
import React, { Component } from 'react'
import { 
	SafeAreaView, 
	View, 
	Text, 
	ImageBackground, 
	StyleSheet, 
	FlatList,
	TouchableOpacity,
	Alert } from 'react-native'


import { FontAwesome } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'

// Registering component on expo
import { registerRootComponent } from 'expo'

// My components
import Task from '../components/Task'
import AddTask from './AddTask'


// Assets
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'

// External Libs
import moment from 'moment'
import 'moment/locale/pt-br'
import emoji from 'emoji-dictionary'

const initialState = {
		tasks: [],
		editingTask: {},
		showDoneTasks: true,
		visibleTasks: [],
		showAddTask: false,
		showEditTask: false
}

export default class TaskList extends Component {

	state = { ...initialState }

	componentDidMount = async () => {
		this.filterTasks()
		const stateString = await SecureStore.getItemAsync('tasksState')
		const state = JSON.parse(stateString) || initialState
		this.setState(state, this.filterTasks)
	}

	toggleTask = (taskId) => {
		let tasks = [...this.state.tasks]
		tasks.forEach(task => {
			if(task.id === taskId){
				task.doneAt = task.doneAt ? null : new Date()
			}
		})

		this.setState({tasks}, this.filterTasks)
	}

	toggleFilter = () => {
		this.setState({ showDoneTasks : !this.state.showDoneTasks  }, this.filterTasks)
	}

	filterTasks = () => {

		let visibleTasks = null

		if(this.state.showDoneTasks)
			visibleTasks = [...this.state.tasks]
		else
			visibleTasks = this.state.tasks.filter(task => task.doneAt === null )

		this.setState({ visibleTasks })
		SecureStore.setItemAsync('tasksState', JSON.stringify(this.state))
	}
	
	addTask = newTask => {
		if(!newTask.desc || !newTask.desc.trim()) {
			Alert.alert('Dados Inválidos', 'Descrição não informada!')
			return
		}

		let tasks = [ ...this.state.tasks ]
		tasks.push({
			id: Math.random(),
			desc: newTask.desc,
			estimatedAt: newTask.date,
			doneAt: null
		})
		this.setState({ tasks, showAddTask: false }, this.filterTasks)
	
	}

	deleteTask = taskId => {
		const tasks = this.state.tasks.filter(task=> task.id !== taskId)
		this.setState({ tasks }, this.filterTasks)
	}

	editTask = taskId => {
		let filterTask = task => task.id == taskId
		const tasks = [...this.state.tasks]

		const editingTask = tasks.filter(filterTask)[0]
		this.setState({ editingTask, showEditTask: true })

	}

	saveEditing = modifiedTask => {
		if(!modifiedTask.desc || !modifiedTask.desc.trim()) {
			Alert.alert('Dados Inválidos', 'Descrição não informada!')
			return
		}

		let editingTask = this.state.editingTask
		editingTask.desc = modifiedTask.desc
		editingTask.estimatedAt = modifiedTask.date

		let tasks = this.state.tasks.filter(task=> task.id !== editingTask.id)

		tasks.push(editingTask)
		
		this.setState({ tasks, showEditTask: false }, this.filterTasks)

	}

	render(){
		const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

		return (
			<SafeAreaView style={styles.container}>

				<AddTask 
					isVisible={this.state.showAddTask} 
					onCancel={ () => this.setState({showAddTask: false}) }
					onSave={ this.addTask }
				/>
				<AddTask 
					isVisible={this.state.showEditTask} 
					onCancel={ () => this.setState({showEditTask: false}) }
					onEdit={ this.saveEditing }
					editingTask={ this.state.editingTask  }
				/>

				<ImageBackground 
					source={todayImage}
					style={styles.background}>

					<View style={styles.iconBar}>
						<TouchableOpacity onPress={this.toggleFilter}>
							<FontAwesome size={20} color={commonStyles.colors.secondary} 
								name={
									this.state.showDoneTasks 
									? 'eye' 
									: 'eye-slash'} 
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.titleBar}>
						<Text style={styles.title}>Hoje</Text>
						<Text style={styles.subtitle}>{today}</Text>
					</View>
				</ImageBackground>

				<View style={styles.taskList}>
					{
						this.state.tasks == false
						? <View style={styles.noTasksView}>
								<Text style={styles.noTasksText}>
									Nada previsto para hoje {emoji.getUnicode('grinning')}
								</Text>
							</View>
						:	<FlatList 
								data={ this.state.visibleTasks } 
								keyExtractor={item => `${item.id}`}
								renderItem={ 
									({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} onEdit={this.editTask}/> 
								}
							/>
					}
				</View>

				<TouchableOpacity style={styles.addButton} 
					onPress={ () => this.setState({showAddTask: true}) }
					activeOpacity={0.7}
				>

					<FontAwesome name='plus' size={20} color={commonStyles.colors.secondary}/>

				</TouchableOpacity>
			</SafeAreaView>
		)
	}
}

// Styles

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
		color: commonStyles.colors.secondary,
		fontSize: 50,
		marginLeft: 20,
		marginBottom: 20
	},
	subtitle: {
		color: commonStyles.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 30
	},
	iconBar: {
		flexDirection: 'row',
		marginHorizontal: 20,
		justifyContent: 'flex-end',
		marginTop: 40
	},
	addButton: {
		position: 'absolute',
		right: 30,
		bottom: 30,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: commonStyles.colors.today,
		alignItems: 'center',
		justifyContent: 'center'
	},
	noTasksView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noTasksText: {
		fontSize: 20
	}
})

registerRootComponent(TaskList);
