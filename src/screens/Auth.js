import React, { Component} from 'react'
import { 
	ImageBackground, 
	Text, 
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Platform,
	SafeAreaView } from 'react-native'

// Assets
import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import { registerRootComponent } from 'expo'


export default class Auth extends Component{

	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		stageNew: true
	}

	render() {

		return (
				<ImageBackground 
					source={backgroundImage}
					style={styles.background}
				>
					<Text style={styles.title}>
						Tasks
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
							<TextInput placeholder='Nome' 
								value={this.state.name} 
								style={styles.input}
								onChangeText={ name => this.setState({ name }) }
							/>
						}
						<TextInput placeholder='Email' 
							value={this.state.email} 
							style={styles.input}
							onChangeText={ email => this.setState({ email }) }
						/>
						
						<TextInput placeholder='Senha' 
							value={this.state.password} 
							style={styles.input}
							secureTextEntry={true}
							onChangeText={ password => this.setState({ password }) }
						/>

						{ this.state.stageNew && 
							<TextInput placeholder='Confirme a senha' 
							value={this.state.confirmPassword} 
							style={styles.input}
							secureTextEntry={true}
							onChangeText={ confirmPassword => this.setState({ confirmPassword }) }
						/>
						}

						<TouchableOpacity>
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
		padding: Platform.OS == 'ios' ? 15 : 10
	},
	formContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		padding: 20,
		width: '90%'
	},
	button: {
		backgroundColor: '#080',
		marginTop: 10,
		padding: 10,
		alignItems: 'center'
	},
	buttonText: {
		color: 'white',
		fontSize: 20
	}
})

registerRootComponent(Auth)