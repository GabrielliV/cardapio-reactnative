import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../context/AppContext';
import { produtos } from '../../services/Produtos';

const Cardapio = () => {
  const navigate = useNavigate();
  const appInfo = useContext(AppContext);
  const [listProdutos, setListProdutos] = useState([]);

  const listarProdutos = () => {
    produtos(3)
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
            <Text style={styles.buscar}>Buscar</Text>
            <TouchableOpacity style={styles.botaoBusca}>
            {/* Ícone de busca  */}
            </TouchableOpacity>
        </View>
        <View style={styles.barraCarrinho}>
            <Text style={styles.carrinho}>Pedidos</Text>
            <TouchableOpacity style={styles.botaoCarrinho}>
            {/* Ícone de carrinho  */}
            </TouchableOpacity>
        </View>
        <View style={styles.barraSair}>
          <TouchableOpacity
            onPress={() => {
                navigate("/")
            }}
          >
            <Text style={styles.botaoSair}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => listarProdutos()}>
          <Text style={styles.categoria}>Pratos</Text>
        </TouchableOpacity>
        <Text style={styles.categoria}>Bebidas Alcoólicas</Text>
        <Text style={styles.categoria}>Bebidas Não Alcoólicas</Text>
        <Text style={styles.categoria}>Sobremesas</Text>
        <Text style={styles.categoria}>Outros</Text>
      </View>
      <View style={styles.conteudo}>
        <FlatList
          data={listProdutos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.produtoContainer}>
              <Image source={{ uri: item.foto }} style={styles.imagemProduto} />
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.descricaoProduto}>{item.descricao}</Text>
              <Text style={styles.precoProduto}>{item.preco}</Text>
              <TouchableOpacity style={styles.botaoAdicionar}>
                <Text style={styles.textoBotao}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
  barraSuperior: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9', // Cor de fundo da barra superior
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
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
  },
  carrinho: {
    fontSize: 18,
    color: 'white',
  },
  botaoBusca: {
    // Estilo do botão de busca
    marginRight: 10,
  },
  barraCarrinho: {
    backgroundColor: '#CD0707',
    width: 280,
    height: 80,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  botaoCarrinho: {
    // Estilo do botão do carrinho
  },
  barraSair: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoSair: {
    textAlign: 'center',
    paddingLeft: 30,
  },
  menu: {
    width: 223, // Largura do menu lateral
    backgroundColor: 'black', // Cor de fundo preta do menu lateral
    padding: 20,
  },
  categoria: {
    color: 'white', // Cor do texto das categorias
    fontSize: 22,
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  conteudo: {
    flex: 1, // Para ocupar o restante do espaço disponível
    backgroundColor: 'white', // Cor de fundo branca do conteúdo
    padding: 20,
  },

// Produtos
  produtoContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  imagemProduto: {
    width: 100,
    height: 100,
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricaoProduto: {
    fontSize: 16,
  },
  precoProduto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    backgroundColor: '#3d9467',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Cardapio;