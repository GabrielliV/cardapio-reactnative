import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { listaProdutos, listaProdutosLupa } from '../../services/Produtos';
import { useParams } from 'react-router-native';
import Cardapio from './Cardapio';
import { CarrinhoContext } from '../../context/CarrinhoContext';

const ListaProdutos = () => {
    const { categoriaId, busca } = useParams();
    const [listProdutos, setListProdutos] = useState([]);
    const { adicionarAoCarrinho } = useContext(CarrinhoContext);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const listarProdutos = () => {    

      if (busca) {
        const buscaString = busca.toString();

        listaProdutosLupa(buscaString)
        .then((response) => {
          if (response.data && Array.isArray(response.data) && response.data != "") {
            setListProdutos(response.data);
          } else {
            showAndHideMessage('Nenhum produto encontrado na busca.');
            listarProdutosCategoria(1);
          }
        })
        .catch((error) => {
          console.error('Erro ao pesquisar produtos:', error);
        })
      } else {
        listarProdutosCategoria(categoriaId);
      }
    };

    const listarProdutosCategoria = (categoriaIdBusca) => {
      listaProdutos(categoriaIdBusca)
          .then((response) => {
            if (response.data && Array.isArray(response.data)) {
              setListProdutos(response.data);
            } else {
              console.error('Nenhum produto encontrado na categoria.');
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar produtos:', error);
          });
    };    

    const showAndHideMessage = (message) => {
      setShowSuccessMessage(message);

      setTimeout(() => {
        setShowSuccessMessage('');
      }, 3000); // 3000 milissegundos = 3 segundos
    };
    
    useEffect(() => {
      setListProdutos([]);
      listarProdutos();
    }, [categoriaId, busca]);

    return (   
      <Cardapio>
        <View>
          <FlatList
              data={listProdutos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.produtoContainer}>
                  <View style={styles.grupoEsquerdo}>
                    <Image source={{ uri: item.foto }} style={styles.imagemProduto} />
                  </View>
                  <View style={styles.grupoCentro}>
                    <Text style={styles.nomeProduto}>{item.nome}</Text>
                    <Text style={styles.descricaoProduto}>{item.descricao}</Text>
                  </View>
                  <View style={styles.grupoDireito}>
                    <Text style={styles.precoProduto}>R$ {typeof item.preco === 'number' ? item.preco.toFixed(2).replace('.', ',') : '0,00'}</Text>
                    <TouchableOpacity style={styles.botaoAdicionar} onPress={() => {
                      adicionarAoCarrinho(item.id, item.nome, item.preco);
                      showAndHideMessage(`Produto "${item.nome}" adicionado ao carrinho.`);
                    }}>
                      <Text style={styles.textoBotao}>Adicionar ao carrinho</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
        </View>
        {showSuccessMessage && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>{showSuccessMessage}</Text>
          </View>
        )}
      </Cardapio>
    )
};

const styles = StyleSheet.create({
  produtoContainer: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    color: 'white',
    flexDirection: 'row',
  },
  grupoEsquerdo: {
    flexDirection: 'column',
  },
  grupoCentro: {
    flex: 1,
    marginTop: 10,
  },
  grupoDireito: {
    marginRight: 20,
  },
  imagemProduto: {
    width: 170,
    height: 170,
    marginStart: 10,
    marginEnd: 20,
    borderRadius: 1,
  },
  nomeProduto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  descricaoProduto: {
    fontSize: 20,
    color: 'white',
  },
  precoProduto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  botaoAdicionar: {
    backgroundColor: '#3d9467',
    padding: 10,
    borderRadius: 5,
    marginTop: 45,
    alignSelf: 'flex-end',
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
  },
  successMessage: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: '#3d9467',
    padding: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ListaProdutos;