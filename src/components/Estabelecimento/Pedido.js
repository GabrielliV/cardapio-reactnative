import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';
import { listarPedido, finalizar } from '../../services/Pedidos';

const Pedido = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [listPedido, setListPedido] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const showAndHideMessage = (message) => {
        setShowSuccessMessage(message);
        setTimeout(() => {
          setShowSuccessMessage('');
        }, 3000); // 3000 milissegundos = 3 segundos
      };

    const listaPedido = () => {
        listarPedido(id)
        .then((response) => {
            if (response.data) {
            setListPedido(response.data);
            } else {
            console.error('Nenhum pedido foi encontrado');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar pedido:', error);
        });
    };

  useEffect(() => {
    listaPedido();
  }, []);

  return (   
    <Central>
        <View style={styles.container}>
            <Text style={styles.label}>PEDIDO {listPedido.id}</Text>
            <Text style={styles.label}>QTDE</Text>
        </View>
        <View style={styles.containerItens}>
            <FlatList
                data={listPedido.itemPedido}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.itens}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.nome}>{item.produto.nome}</Text>                
                        <Text style={styles.qtde}>{item.qtde}</Text>      
                    </View>          
                </View>
                )}
            />            
        </View>
        <View style={styles.inferior}>
            <Text style={styles.mesa}>MESA: {listPedido.mesa}</Text>
            <Text style={styles.label}>OBSERVAÇÃO:</Text>
            <View style={styles.barraInferior}>            
            <Text style={styles.observacao}>{listPedido.observacao}</Text>
                <TouchableOpacity style={styles.botaoFinalizar} 
                    onPress={() => {
                        finalizar(listPedido.id)
                        .then(() => {
                            showAndHideMessage('Pedido finalizado com sucesso!');
                            setTimeout(() => {
                                navigate("/pedidos");
                            }, 2000);               
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
    container: {
        flexDirection: 'row',
        padding: 23,
        justifyContent: 'space-between',
        marginEnd: 200,        
    },
    containerItens: {
        maxHeight: 420,
        flex: 0,
    },
    itens: {
        padding: 23,        
        justifyContent: 'space-between',
    },
    infoContainer: {
        marginEnd: 200,
        justifyContent: 'space-between',   
        flexDirection: 'row',
    },
    label: {    
        fontSize: 18,
        fontWeight: 'bold',
    },
    nome: {
        fontSize: 18,
    },
    qtde: {
        fontSize: 18,
        marginLeft: 100,
    },
    botaoFinalizar: {
        backgroundColor: '#CD0707',
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 5,
    },
    textoBotao: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    inferior: {
        padding: 23,
        flex: 1,
        justifyContent: 'flex-end',
    },
    observacao: {
        fontSize: 18,
    },
    mesa: {
        fontSize: 22,
        fontWeight: 'bold',
        bottom: 10,
        color: '#3d9467',
    },
    barraInferior: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginEnd: 200,
    },
    successMessage: {
        position: 'absolute',
        bottom: 30,
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
  

export default Pedido;
