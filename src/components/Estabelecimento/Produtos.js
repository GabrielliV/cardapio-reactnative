import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useParams } from 'react-router-native';
import { listaTodosProdutos } from '../../services/Produtos';
import Central from './Central';

const Produtos = () => {
  const navigate = useNavigate();
  const { categoriaId, nome } = useParams();
  const [listProdutos, setListProdutos] = useState([]);

  const listarProdutos = () => {
    listaTodosProdutos(categoriaId)
    .then((response) => {
        if (response.data) {
          setListProdutos(response.data);
        } else {
        console.error('Nenhum produto foi encontrado');
        }
    })
    .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
    });
};

useEffect(() => {
  listarProdutos();
}, []);

return (   
  <Central>
    <View style={styles.scrollContainer}>
        <FlatList
            data={listProdutos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.column}>
                  <Text style={styles.texto}>{item.nome}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.textoAtivo}>{item.ativo ? "Ativo" : "Inativo"}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.texto}>R$ {typeof item.preco === 'number' ? item.preco.toFixed(2).replace('.', ',') : '0,00'}</Text>
                </View>
                <TouchableOpacity style={styles.botaoAbrir} 
                  onPress={() => {
                    navigate(`/produto/${item.id}`); 
                  }}
                >
                  <Text style={styles.textoBotao}>Abrir</Text>
                </TouchableOpacity>
              </View>
            )}
          />            
      </View>
      <View style={styles.barraAdicionar}>
        <View style={styles.containerInferior}>
          <Text style={styles.categoria}>Categoria: {nome}</Text>
          <TouchableOpacity style={styles.botaoAdicionar} 
            onPress={() => {
              navigate(`/novoProduto/${categoriaId}`); 
            }}
          >
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Central> 
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 23,
    borderColor: '#ccc',
  },
  column: {
    flex: 1,
  },
  scrollContainer: {
    maxHeight: 520,
    flex: 0,
  },
  texto: {
    fontSize: 18,
  },
  textoAtivo: {
    fontSize: 18,
    marginStart: 100,
  },
  botaoAbrir: {
    backgroundColor: '#3d9467',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
  },
  textoBotao: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  barraAdicionar: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 23,
  },
  containerInferior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  nome: {
    fontSize: 18,
  },
  categoria: {
    fontSize: 18,
    flex: 1,
  },
  botaoAdicionar: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default Produtos;