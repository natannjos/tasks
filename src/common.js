import { Alert } from 'react-native'

// Alterar para o IP do server
const server = 'https://lit-gorge-45462.herokuapp.com'

const showError = (err) => {
	Alert.alert('Ops! Ocorreu um erro!', `${err}`)
}

const showSuccess = (msg) => {
	Alert.alert('Sucesso!', msg)
}

export {server, showError, showSuccess}