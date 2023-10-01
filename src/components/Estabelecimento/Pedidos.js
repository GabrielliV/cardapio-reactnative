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

  const handlePedidoFinalizado = (pedidoId) => {
    finalizar(pedidoId).then(() => {
      setReloadPage(true);
    });
  };

  const listaPedidos = () => {
    listarPedidos(estabelecimentoInfo.id)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setListPedidos(response.data);
          listaTempoMedio(estabelecimentoInfo.id);
        } else {
          console.error('Nenhum pedido pendente.');
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
      <View>
        <FlatList
            data={listPedidos}
            keyExtractor={(item) => item.id}
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
                    finalizar(item.id).then(() => {
                      handlePedidoFinalizado(item.id);
                    })
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
        <Text style={styles.textoTempoMedio}>Tempo Médio: {listTempoMedio}</Text>
      </View>
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
});
 
export default Pedidos; 
