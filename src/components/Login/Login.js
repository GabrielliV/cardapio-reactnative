import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { loginCliente } from '../../services/Login';

function Login({setMesaApp, setNomeEstabelecimentoApp, setIdApp}) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [mesa, setMesa] = useState("");
  

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
                loginCliente(mesa, login, identificador).then((response) => {
                  setMesaApp(response.data.mesa)
                  setNomeEstabelecimentoApp(response.data.estabelecimento.nome)
                  setIdApp(response.data.id)
                  navigate("/listaProdutos/1")
                })
              }}
            >
              <Text style={styles.buttonText}>ENTRAR</Text>
            </TouchableOpacity>
          </View>
      </View>
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
    marginBottom: 80,
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
    justifyContent: 'space-between', // Alinha os elementos à esquerda e à direita
    alignItems: 'center', // Alinha verticalmente os elementos
    width: 310, // Ajuste o tamanho conforme necessário
    marginTop: 20, // Adicione margem superior conforme necessário
  },
  logarComoFuncionario: {
    fontSize: 18,
  },
});

export default Login;
