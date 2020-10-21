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
import Task from '../components/Task'
import { FontAwesome } from '@expo/vector-icons';
import AddTask from './AddTask'
// Assets
import todayImage from '../../assets/imgs/today.jpg'

// Libs
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'

export default class TaskList extends Component {

	componentDidMount() {
		commonStyles.loadFont()
	}

	state = {
		tasks: [
			{ id: Math.random(), desc: 'Comprar Café', doneAt: new Date(), estimatedAt: new Date() },
			{ id: Math.random(), desc: 'Estudar Livro', doneAt: null, estimatedAt: new Date() },
		],
		showDoneTasks: true,
		visibleTasks: [],
		showAddTask: false
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

	componentDidMount = () => {
		this.filterTasks()
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
					<FlatList 
						data={ this.state.visibleTasks } 
						keyExtractor={item => `${item.id}`}
						renderItem={ 
							({item}) => <Task {...item} toggleTask={this.toggleTask}/> 
						}
					/>
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
	}
})