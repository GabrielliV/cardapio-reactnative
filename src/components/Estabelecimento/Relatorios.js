import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { pratosSolicitados } from '../../services/Relatorios';
import Central from './Central';

const Relatorios = () => {
  const navigate = useNavigate();

  return (   
    <Central>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Pratos mais solicitados</Text>
          <Text style={styles.text}>Pratos menos solicitados</Text>
        </View>

        <View style={styles.botoes}>
          <TouchableOpacity style={styles.botaoAdicionar}
            onPress={() => {
              navigate(`/relatorio/MAIS`); 
            }}
          >
              <Text style={styles.textoBotao}>Visualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoAdicionar}
            onPress={() => {
              navigate(`/relatorio/MENOS`); 
            }}
          >
              <Text style={styles.textoBotao}>Visualizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Central> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  botoes: {
    marginStart: 400,
  },
  botaoAdicionar: {
    backgroundColor: '#3d9467',
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 55,
  },
  textoBotao: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Relatorios;
