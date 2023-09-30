import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { loginCliente } from '../../services/Login';

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
    margin: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginTitle: {
    fontSize: 28,
    marginBottom: 80,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

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
          placeholder="LOGIN"
          value={login}
          onChangeText={setLogin}
        />
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.identField}
            placeholder="IDENTIFICADOR"
            value={identificador}
            onChangeText={setIdentificador}
          />
          <TextInput
            style={styles.mesaField}
            placeholder="MESA"
            value={mesa}
            onChangeText={setMesa}
          />
        </View>
        <TouchableOpacity
            style={styles.customButton}
            onPress={() => {
              loginCliente(mesa, login, identificador).then((response) => {
                debugger
                setMesaApp(response.data.mesa)
                setNomeEstabelecimentoApp(response.data.estabelecimento.nome)
                setIdApp(response.data.id)
                navigate("/cardapio")
              })
            }}
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
