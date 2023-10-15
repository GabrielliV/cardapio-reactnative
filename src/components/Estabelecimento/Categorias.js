import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { listaCategorias } from '../../services/Categoria';
import Central from './Central';

const Categorias = () => {
  const navigate = useNavigate();
  const [listCategoria, setListCategoria] = useState([]);

  const listaCategoria = () => {
    listaCategorias()
      .then((response) => {
        if (response.data) {
          setListCategoria(response.data);
        } else {
          console.error('Nenhuma categoria foi encontrada');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar categoria:', error);
      });
  };

  useEffect(() => {
    listaCategoria();
  }, []);

  return (
    <Central>
      <View style={styles.container}>
        <FlatList
          data={listCategoria}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <TouchableOpacity style={styles.botaoListar}
                onPress={() => {
                    navigate(`/produtos/${item.id}/${item.nome}`); 
                }}
                >
                <Text style={styles.textoBotao}>Listar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Central>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingEnd: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  botaoListar: {
    backgroundColor: '#3d9467',
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderRadius: 5,
  },
  textoBotao: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Categorias;
