import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { registerRootComponent } from 'expo'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Auth from './screens/Auth'
import TaskList from './screens/TaskList'

import todayImage from '../assets/imgs/today.jpg'
import tomorrowImage from '../assets/imgs/tomorrow.jpg'
import weekImage from '../assets/imgs/week.jpg'
import monthImage from '../assets/imgs/month.jpg'

import Menu from './screens/Menu'
import AuthOrApp from './screens/AuthOrApp'

const menuConfig = {
	initialRouteName: 'Today',
	contentComponent: Menu,
	contentOptions: {
		labelStyle: {
			fontWeight: 'normal',
			fontSize: 20
		},
		activeLabelStyle: {
			color: '#080',
			fontWeight: 'bold'
		}
	}
}

const menuRoutes = {
	Today: {
		name: 'Today',
		screen: props => <TaskList title='Hoje' daysAhead={0} image={todayImage} {...props}/>,
		navigationOptions: {
			title: 'Hoje'
		}
	},
	Tomorrow: {
		name: 'Tomorrow',
		screen: props => <TaskList title='Amanhã' daysAhead={1} image={tomorrowImage} {...props}/>,
		navigationOptions: {
			title: 'Amanhã'
		}
	},
	Week: {
		name: 'Week',
		screen: props => <TaskList title='Semana' image={weekImage} daysAhead={7} {...props}/>,
		navigationOptions: {
			title: 'Semana'
		}
	},
	Month: {
		name: 'Month',
		screen: props => <TaskList title='Mês' image={monthImage} daysAhead={30} {...props}/>,
		navigationOptions: {
			title: 'Mês'
		}
	}
}


const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
	AuthOrApp: {
		name: 'AuthOrApp',
		screen: AuthOrApp
	},

	Auth: {
		name: 'Auth',
		screen: Auth
	},
	Home: {
		name: 'Home',
		screen: menuNavigator
	}
}

const RootSwitch = createSwitchNavigator(mainRoutes, {
	initialRouteName: 'AuthOrApp'
})


const AppContainer = createAppContainer(RootSwitch)
registerRootComponent(AppContainer)

export default AppContainer