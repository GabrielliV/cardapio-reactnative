import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const produtosPratos = [
  {
    id: 1,
    nome: 'Prato 1',
    descricao: 'Descrição do Prato 1',
    preco: 'R$ 19.99',
    imagem: 'URL_DA_IMAGEM_1',
  },
  {
    id: 2,
    nome: 'Prato 2',
    descricao: 'Descrição do Prato 2',
    preco: 'R$ 15.99',
    imagem: 'URL_DA_IMAGEM_2',
  },
  // Adicione mais pratos aqui
];

const Pratos = () => {
  return (
    <View>
      <FlatList
        data={produtosPratos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.produtoContainer}>
            <Image source={{ uri: item.imagem }} style={styles.imagemProduto} />
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
  );
};

const styles = StyleSheet.create({
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

export default Pratos;
