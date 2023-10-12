import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-native';
import Central from './Central';
import { produto, ativaInativa } from '../../services/Produtos';

const Produto = () => {
  const { id } = useParams();
  const [listProduto, setListProduto] = useState([]);

  const listaProduto = () => {
    produto(id)
      .then((response) => {
        if (response.data) {
            console.log(response.data);
          setListProduto(response.data);
        } else {
          console.error('Nenhum pedido foi encontrado');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar pedido:', error);
      });
  };

  useEffect(() => {
    listaProduto();
  }, []);

  return (
    <Central>
      <View>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Text style={styles.texto}>Nome:</Text>
            <Text style={styles.texto}>Descrição:</Text>
            <Text style={styles.texto}>Preço:</Text>
            <Text style={styles.texto}>Ativo:</Text>
            <Text style={styles.texto}>Categoria:</Text>
            <Text style={styles.texto}>Foto:</Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.textoItem}>{listProduto.nome}</Text>
            <Text style={styles.textoDescricao}>{listProduto.descricao}</Text>
            <Text style={styles.textoItem}>R$ {typeof listProduto.preco === 'number' ? listProduto.preco.toFixed(2).replace('.', ',') : '0,00'}</Text>
            <Text style={styles.textoItem}>{listProduto.ativo ? "Ativo" : "Inativo"}</Text>
            <Text style={styles.textoItem}>{listProduto.categoria?.nome || "Categoria não especificada"}</Text>
            <Text style={styles.textoItem}>{listProduto.foto ? "Com foto" : "Sem foto"}</Text>
          </View>
        </View>
        <View style={styles.containerInferior}>
            <TouchableOpacity style={styles.botaoInativar} >
                <Text style={styles.textoBotao}>{listProduto.ativo ? "Inativar" : "Ativar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoAlterar} >
                <Text style={styles.textoBotao}>Alterar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Central>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    height: 540,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
    marginEnd: 190,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 50,
  },
  textoItem: {
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'right',
  },
  containerInferior: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: 190,
  },
  textoDescricao: {
    textAlign: 'right',
    fontSize: 20,
    marginBottom: 25,
  },
  botaoInativar:{
    marginEnd: 40,
    backgroundColor: '#616161',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
  },
  botaoAlterar: {
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
});

export default Produto;
