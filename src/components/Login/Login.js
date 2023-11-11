import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { loginCliente } from '../../services/Login';

function Login({setMesaApp, setNomeEstabelecimentoApp, setIdApp}) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [mesa, setMesa] = useState("");
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
          style={styles.loginField}
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
        />
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.identField}
            placeholder="Identificador"
            value={identificador}
            onChangeText={setIdentificador}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.mesaField}
            placeholder="Mesa"
            value={mesa}
            onChangeText={setMesa}
          />
        </View>
        <View style={styles.inferior}>
          <TouchableOpacity onPress={() => {
            navigate("/loginFuncionario")
          }}>
            <Text style={styles.logarComoFuncionario}>Logar como funcionário</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.customButton}
              onPress={() => {
                loginCliente(mesa, login, identificador)
                  .then((response) => {
                    if (!response.data || !response.data.mesa) {
                      showAndHideMessage('Mesa não encontrada.');
                    } else {
                      setMesaApp(response.data.mesa);
                      setNomeEstabelecimentoApp(response.data.estabelecimento.nome);
                      setIdApp(response.data.id);
                      navigate("/listaProdutos/1");
                    }
                  })
                  .catch((error) => {
                    if (error.response && error.response.status === 500) {
                      showAndHideMessage('Login ou Identificador incorreto.');
                    } else {
                      showAndHideMessage('Todos os campos devem ser preenchidos.');
                    }
                  });
              }}
            >
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

const sharedStyles = {
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
  },
};

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
  loginField: {
    ...sharedStyles.field,
    width: 310,
  },
  identField: {
    ...sharedStyles.field,
    width: 208,
  },
  mesaField: {
    ...sharedStyles.field,
    width: 65,
    marginLeft: 37,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 310,
    marginTop: 20,
  },
  logarComoFuncionario: {
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

export default Login;
