import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { listaProdutos } from '../../services/Produtos';
import { useParams } from 'react-router-native';
import Cardapio from './Cardapio';
import { CarrinhoContext } from '../../context/CarrinhoContext';

const ListaProdutos = () => {
    const { categoriaId } = useParams();
    const [listProdutos, setListProdutos] = useState([]);
    const { carrinho, adicionarItem } = useContext(CarrinhoContext);

    const adicionarAoCarrinho = (id, nome, preco) => {
      const itemNoCarrinho = carrinho.find((item) => item.id === id);
    
      if (itemNoCarrinho) {
        const novoCarrinho = carrinho.map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
        adicionarItem({ carrinho: novoCarrinho });
      } else {     
        const novoItem = { id, nome, preco, quantidade: 1 };
        adicionarItem({ carrinho: [...carrinho, novoItem] });
      }
    };

    const listarProdutos = () => {
        setListProdutos([]);

        listaProdutos(categoriaId)
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
    
      useEffect(() => {
        listarProdutos(categoriaId);
      }, [categoriaId]);

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
                  <TouchableOpacity style={styles.botaoAdicionar} onPress={
                    () => adicionarAoCarrinho(item.id, item.nome, item.preco)}>
                    <Text style={styles.textoBotao}>Adicionar ao carrinho</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {/* <View style={styles.conteudoCarrinho}>
            <FlatList
              data={carrinho}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text>
                  Item ID: {item.id}, Nome: {item.nome}, Preço: {item.preco}, Quantidade: {item.quantidade}
                </Text>
              )}
            />
          </View> */}
        </View>
        </Cardapio>
    )
};

const styles = StyleSheet.create({
    
    
      // Produtos
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
});

export default ListaProdutos;