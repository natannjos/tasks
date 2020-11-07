import { Alert } from 'react-native'

// Alterar para o IP do server
const server = 'http://192.168.42.68:3000'

const showError = (err) => {
	Alert.alert('Ops! Ocorreu um erro!', `Mensagem: ${err}`)
}

const showSuccess = (msg) => {
	Alert.alert('Sucesso!', msg)
}

export {server, showError, showSuccess}