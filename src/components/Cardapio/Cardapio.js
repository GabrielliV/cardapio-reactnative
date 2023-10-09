import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../context/AppContext';
import { listaProdutos } from '../../services/Produtos';


const Cardapio = () => {
  const navigate = useNavigate();
  const appInfo = useContext(AppContext);
  const [listProdutos, setListProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (id, nome, preco) => {
    const itemNoCarrinho = carrinho.find((item) => item.id === id);

    if (itemNoCarrinho) {
      const novoCarrinho = carrinho.map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { id, nome, preco, quantidade: 1 }]);
    }
  };

  const listarProdutos = (categoriaId) => {
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
    listarProdutos(1);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
        <View style={styles.barraMesa}>
            <Text style={styles.mesa}>Mesa {appInfo.mesaApp}</Text>
        </View>
        <View >
            <Text style={styles.nomeEstabelecimento}>{appInfo.nomeEstabelecimentoApp}</Text>
        </View>
        <View style={styles.barraBusca}>            
          <TouchableOpacity style={styles.botaoBusca}>   
            <Icon name="search" size={25} color="white"/>         
          </TouchableOpacity>
        </View>
        <View style={styles.barraCarrinho}>                      
          <TouchableOpacity style={styles.botaoCarrinho}> 
            <Icon name="shopping-cart" size={30} color="white"/>           
          </TouchableOpacity>
        </View>
        <View style={styles.barraSair}>
          <TouchableOpacity
            onPress={() => {
                navigate("/")
            }}
          >
            <Icon name="close" size={25} color="black"/>    
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itens}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => listarProdutos(1)}>
            <Text style={styles.categoria}>Pratos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => listarProdutos(2)}>
          <Text style={styles.categoria}>Bebidas Alcoólicas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => listarProdutos(3)}>
            <Text style={styles.categoria}>Bebidas Não Alcoólicas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => listarProdutos(4)}>
            <Text style={styles.categoria}>Sobremesas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => listarProdutos(5)}>
            <Text style={styles.categoria}>Outros</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.conteudo}>
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
                  <Text style={styles.precoProduto}>R$ {item.preco}</Text>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Alterado para "column" para organizar os elementos verticalmente
    width: 1280,
    height: 800,
  },
  itens: {
    flex: 1, 
    flexDirection: 'row',
  },
  barraSuperior: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    height: 80,
  },
  barraMesa: {
    backgroundColor: '#CD0707',
    width: 223,
    height: 80,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  mesa: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  barraEstabelecimento: {
    width: 200,
  },
  nomeEstabelecimento: {
    paddingLeft: 14,
    paddingRight:300,
    fontSize: 18,
  },
  buscar: {
    fontSize: 18,
    color: 'white',
  },
  barraBusca: {
    backgroundColor: 'black',
    width: 280,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrinho: {
    fontSize: 18,
    color: 'white',
  },
  barraCarrinho: {
    backgroundColor: '#CD0707',
    width: 280,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barraSair: {
    alignSelf: 'flex',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 223,
    backgroundColor: 'black',
    padding: 20,
  },
  categoria: {
    color: 'white',
    fontSize: 22,
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  conteudo: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

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

export default Cardapio;