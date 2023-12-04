import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { listarPedidos, tempoMedio, finalizar } from '../../services/Pedidos';
import Central from './Central';

const Pedidos = () => {
  const navigate = useNavigate();
  const estabelecimentoInfo = useContext(EstabelecimentoContext);
  const [listPedidos, setListPedidos] = useState([]);
  const [listTempoMedio, setListTempoMedio] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showEmptyView, setShowEmptyView] = useState(false);

  const handlePedidoFinalizado = (pedidoId) => {
    finalizar(pedidoId).then(() => {
      setReloadPage(true);
    });
  };

  const showAndHideMessage = (message) => {
    setShowSuccessMessage(message);
    setTimeout(() => {
      setShowSuccessMessage('');
    }, 3000); // 3000 milissegundos = 3 segundos
  };

  const listaPedidos = () => {
    listarPedidos(estabelecimentoInfo.id)
      .then((response) => {
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setShowEmptyView(false);
          setListPedidos(response.data);
          listaTempoMedio(estabelecimentoInfo.id);
        } else {
          setShowEmptyView(true);
          setListPedidos();
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar pedidos:', error);
      });
  };

  const listaTempoMedio = () => {
    tempoMedio(estabelecimentoInfo.id)
      .then((response) => {
        if (response.data) {
          setListTempoMedio(response.data);
        } else {
          console.error('Nenhum pedido pendente para calcular o tempo médio.');
        }
      });
  };

  useEffect(() => {
    listaPedidos();
    const intervalId = setInterval(() => {
      listaPedidos();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [reloadPage]);

  useEffect(() => {
    if (reloadPage) {
      setReloadPage(false);
    }
  }, [reloadPage]);

  return (   
    <Central>
      {showEmptyView && (
        <View style={styles.emptyPedidoContainer}>
          <Text style={styles.emptyPedidoText}>Nenhum pedido pendente 👍</Text>
        </View>
      )}
      <View style={styles.scrollContainer}>
          <FlatList
              data={listPedidos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.itens}>
                  <Text style={styles.texto}>Pedido {item.id}</Text>
                  <Text style={styles.texto}>{item.hora_pedido}</Text>
                  <Text style={styles.texto}>Mesa {item.mesa}</Text>
                  <TouchableOpacity style={styles.botaoVizualizar} 
                    onPress={() => {
                      navigate(`/pedido/${item.id}`); 
                    }}
                  >
                    <Text style={styles.textoBotao}>Visualizar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botaoFinalizar}
                    onPress={() => {
                      finalizar(item.id)
                        .then(() => {
                          showAndHideMessage('Pedido finalizado com sucesso!');
                          finalizar(item.id);                       
                        })
                        .catch((error) => {
                          console.error('Erro ao finalizar o pedido:', error);
                          showAndHideMessage('Erro ao finalizar o pedido');
                      });
                  }}
                  >
                    <Text style={styles.textoBotao}>Finalizar</Text>
                  </TouchableOpacity>
                </View>
              )}
              extraData={reloadPage}
            />          
      </View>
      <View style={styles.barraTempoMedio}>
        <Text style={styles.textoTempoMedio}>Tempo médio de hoje: {listTempoMedio}</Text>
      </View>
      {showSuccessMessage && (
      <View style={styles.successMessage}>
        <Text style={styles.successText}>{showSuccessMessage}</Text>
      </View>
      )}
    </Central> 
  );
};

const styles = StyleSheet.create({
  itens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 23,
    borderColor: '#ccc',
  },
  scrollContainer: {
    maxHeight: 495,
    flex: 0,
  },
  emptyPedidoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 180,
  },
  emptyPedidoText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  texto: {
    fontSize: 18,
  },
  botaoFinalizar: {
    backgroundColor: '#CD0707',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 5,
    marginEnd: 10,
    alignSelf: 'flex-end',
  },
  botaoVizualizar: {
    backgroundColor: '#3d9467',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 5,
  },
  textoBotao: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  barraTempoMedio: {    
    flex: 1,
    justifyContent: 'flex-end',
    padding: 23,
  },
  textoTempoMedio: {
    fontSize: 18,
  },
  successMessage: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'black',
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
 
export default Pedidos; 
