import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { loginFuncionario } from '../../services/LoginFuncionario';

function LoginFuncionario({setNome, setId}) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const showAndHideMessage = (message) => {
    setShowMessage(message);
    setTimeout(() => {
      setShowMessage('');
    }, 3000); // 3000 milissegundos = 3 segundos
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.loginTitle}>LOGIN DO CARDÁPIO</Text>
        <TextInput
          style={styles.field}
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
        />
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.field}
            placeholder="Identificador"
            value={identificador}
            onChangeText={setIdentificador}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inferior}>
        <TouchableOpacity onPress={() => navigate("/")}>
            <Text style={styles.logarNoCardapio}>Logar no cardápio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.customButton} 
            onPress={() => {
              loginFuncionario(login, identificador)
                .then((response) => {
                  setId(response.data.id)
                  setNome(response.data.nome) 
                  navigate("/pedidos")
                })
                .catch((error) => {
                  if (error.response && error.response.status === 500) {
                    showAndHideMessage('Login ou Identificador incorreto.');
                  } else {
                    showAndHideMessage('Todos os campos devem ser preenchidos.');
                  }
                });
            }}>
              <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
      </View>
      {showMessage && (
      <View style={styles.message}>
        <Text style={styles.messageText}>{showMessage}</Text>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 1280,
    height: 800,
  },
  inputContainer: {
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    marginBottom: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  field: {
    width: '100%',
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 310,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  customButton: {
    backgroundColor: '#3d9467',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inferior: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinha os elementos à esquerda e à direita
    alignItems: 'center', // Alinha verticalmente os elementos
    width: 310, // Ajuste o tamanho conforme necessário
    marginTop: 20, // Adicione margem superior conforme necessário
  },
  logarNoCardapio: {
    fontSize: 18,
  },
  message: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#CD0707',
    padding: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginFuncionario;
