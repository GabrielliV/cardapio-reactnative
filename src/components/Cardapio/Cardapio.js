import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Pratos from './Pratos';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../context/AppContext';

const Cardapio = () => {
  const navigate = useNavigate();
  const appInfo = useContext(AppContext);

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
            <TouchableOpacity
            onPress={() => {
                navigate("/")
            }}
          >
            <Text style={styles.buttonText}>SAIR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menu}>
        <Text style={styles.categoria}>Pratos</Text>
        <Text style={styles.categoria}>Bebidas Alcoólicas</Text>
        <Text style={styles.categoria}>Bebidas Não Alcoólicas</Text>
        <Text style={styles.categoria}>Sobremesas</Text>
        <Text style={styles.categoria}>Outros</Text>
      </View>
      <View style={styles.conteudo}>
        <Pratos />
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
    width: 260,
    height: 80,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  botaoCarrinho: {
    // Estilo do botão do carrinho
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
});

export default Cardapio;