import React, { Component} from 'react'
import { 
	ImageBackground, 
	Text, 
	StyleSheet,
	View,
	TouchableOpacity,
	Alert } from 'react-native'

// Assets
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess } from '../common'
import axios from 'axios'

export default class Auth extends Component{

	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		stageNew: false
	}

	signinOrSignup = () => {
		if(this.state.stageNew)
			this.signup()
		else
			this.signin()
	}

	signup = async () => {
		try {
			await axios.post(`${server}/signup`, {
				name: this.state.name.trim(),
				email: this.state.email.trim().toLowerCase(),
				password: this.state.password,
				confirmPassword: this.state.confirmPassword
			})

			showSuccess('usuário cadastrado!')
			this.setState({ stageNew: false })
		} catch (error) {
			showError(error)
		}
	}

	signin = async () => {
		try {
			const res = await axios.post(`${server}/signin`, {
				email: this.state.email.trim().toLowerCase(),
				password: this.state.password
			})

			axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`

			this.props.navigation.navigate('Home')
		} catch (error) {
			showError(error)
		}
	}

	render() {

		return (
				<ImageBackground 
					source={backgroundImage}
					style={styles.background}
				>

					<Text style={styles.title}>
						Tarefas
					</Text>

					<View style={styles.formContainer}>
						<Text style={styles.subtitle}>
							{
								this.state.stageNew 
								? 'Crie sua conta'
								: 'Informe seus dados'
							}
						</Text>

						{this.state.stageNew &&
							<AuthInput placeholder='Nome'
								icon='user'
								value={this.state.name} 
								style={styles.input}
								onChangeText={ name => this.setState({ name }) }
							/>
						}

						<AuthInput 
							placeholder='Email' 
							value={this.state.email} 
							style={styles.input}
							icon='at'
							onChangeText={ email => this.setState({ email }) }
						/>

						<AuthInput placeholder='Senha'
							icon='lock'
							value={this.state.password} 
							style={styles.input}
							secureTextEntry={true}
							onChangeText={ password => this.setState({ password }) }
						/>

						{ this.state.stageNew && 
							<AuthInput placeholder='Confirme a senha'
							icon='lock'
							value={this.state.confirmPassword} 
							style={styles.input}
							secureTextEntry={true}
							onChangeText={ confirmPassword => this.setState({ confirmPassword }) }
						/>
						}

						<TouchableOpacity onPress={this.signinOrSignup}>
							<View style={styles.button}>
								<Text style={styles.buttonText}>
									{
										this.state.stageNew 
										? 'Cadastrar'
										: 'Entrar'
									}
								</Text>
							</View>
						</TouchableOpacity>

					</View>
					<View  style={{
						borderTopColor: 'white',
						borderTopWidth: 2,
						marginTop: 15
						}}
					>
						<TouchableOpacity style={{padding: 10}}
						onPress={
							() => this.setState({ stageNew: !this.state.stageNew })
						}> 
							<Text style={styles.buttonText} >
								{
									this.state.stageNew 
										? 'Já possui conta?'
										: 'Ainda não possui conta?'
								}
							</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
		)

	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 27
	},
	title: {
		color: commonStyles.colors.secondary,
		fontSize: 70,
		marginBottom: 10
	},
	subtitle: {
		fontSize: 20,
		color: commonStyles.colors.secondary,
		textAlign: 'center',
		marginBottom: 10
	},
	input: {
		marginTop: 10,
		backgroundColor: 'white',
		borderRadius: 30,
	},
	formContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		padding: 20,
		width: '85%'
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		padding: 10,
		alignItems: 'center',
		borderRadius: 10
	},
	buttonText: {
		color: 'white',
		fontSize: 20
	}
})