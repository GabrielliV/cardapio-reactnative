import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useParams } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';
import { produto, ativaInativa } from '../../services/Produtos';

const Produto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listProduto, setListProduto] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const listaProduto = () => {
    produto(id)
      .then((response) => {
        if (response.data) {
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
  }, [refreshKey]);

  const handleInativar = () => {
    ativaInativa(listProduto.id, listProduto.ativo)
      .then(() => {
        setRefreshKey((prevKey) => prevKey + 1);
      });
  };

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
            <Text style={styles.textoItem}>{listProduto.descricao}</Text>
            <Text style={styles.textoItem}>R$ {typeof listProduto.preco === 'number' ? listProduto.preco.toFixed(2).replace('.', ',') : '0,00'}</Text>
            <Text style={styles.textoItem}>{listProduto.ativo ? "Ativo" : "Inativo"}</Text>
            <Text style={styles.textoItem}>{listProduto.categoria?.nome || "Categoria não especificada"}</Text>
            <Image source={{ uri: listProduto.foto }} style={styles.imagemProduto} />
          </View>
        </View>
        <View style={styles.containerInferior}>
            <TouchableOpacity style={styles.botaoInativar} 
                onPress={handleInativar}
              >
                <Text style={styles.textoBotao}>{listProduto.ativo ? "Inativar" : "Ativar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoAlterar} 
              onPress={() => {
                  navigate(`/novoProduto/${listProduto.categoria.id}/${listProduto.id}`); 
              }}
            >
                <Text style={styles.textoBotao}>Alterar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoVoltar} 
              onPress={() => {
                  navigate(`/produtos/${listProduto.categoria.id}/${listProduto.categoria.nome}`); 
              }}
            >
                <Text style={styles.textoBotao}>Voltar</Text>
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
    marginEnd: 40,
    alignItems: 'flex-end',
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 20,
    height: 80,
  },
  textoItem: {
    fontSize: 20,
    height: 80,
    textAlign: 'right',
  },
  imagemProduto: {
    width: 150,
    height: 150,
    borderRadius: 3,
  },
  containerInferior: {
    flexDirection: 'row',
    marginStart:20,
  },
  botaoInativar:{
    width: 130,
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
    marginEnd: 40,
    borderRadius: 5,
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  botaoVoltar: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 5,
  }
});

export default Produto;
