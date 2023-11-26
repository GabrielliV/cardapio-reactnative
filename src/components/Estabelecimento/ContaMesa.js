import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';
import { listarPedidoMesa } from '../../services/Pedidos';
import { finalizarConta } from '../../services/Conta';

const ContaMesa = () => {
    const navigate = useNavigate();
    const { id, mesa } = useParams();
    const [listConta, setListConta] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const listaConta = () => {
        listarPedidoMesa(id)
        .then((response) => {
            if (response.data) {
                setListConta(response.data);
            } else {
            console.error('Nenhuma conta foi encontrado');
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar conta:', error);
        });
    };

    const showAndHideMessage = (message) => {
        setShowSuccessMessage(message);
        setTimeout(() => {
          setShowSuccessMessage('');
        }, 3000); // 3000 milissegundos = 3 segundos
    };

    useEffect(() => {
        listaConta();
    }, []);
  
    return (   
      <Central>
        <View style={styles.containerMesa}>
            <Text style={styles.label}>Mesa: {mesa}</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.label}>PRODUTO</Text>
            <Text style={styles.labelQtde}>QTDE</Text>
            <Text style={styles.labelValor}>VALOR UNITÁRIO</Text>
        </View>
        <View style={styles.scrollContainer}>
            <FlatList
                data={listConta.itensDto}
                keyExtractor={(item) => item.itemId}
                renderItem={({ item }) => (
                <View style={styles.itens}>
                    <Text style={styles.itemNome}>{item.nome}</Text>              
                    <Text style={styles.itemQtde}>{item.qtde}</Text>   
                    <Text style={styles.itemValor}>R$ {typeof item.valor === 'number' ? item.valor.toFixed(2).replace('.', ',') : '0,00'}</Text>              
                </View>
                )}
            />            
        </View>
        <View style={styles.inferior}>
            <Text style={styles.label}>TOTAL:</Text>
            <View style={styles.barraInferior}>
            <Text style={styles.total}>R$ {typeof listConta.total === 'number' ? listConta.total.toFixed(2).replace('.', ',') : '0,00'}</Text>
                <TouchableOpacity style={styles.botaoCod}
                    onPress={() => {
                        navigate("/mesas")
                    }}
                >
                    <Text style={styles.textoBotao}>Ver por Cód.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoFinalizar}
                    onPress={() => {
                        finalizarConta(id).then(() => {
                            showAndHideMessage('Conta finalizada.');
                            setTimeout(() => {
                                navigate("/mesas")
                            }, 2000); 
                        })
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
    containerMesa: {
        flexDirection: 'row',
        paddingStart: 23,
        paddingTop: 23,
        justifyContent: 'space-between',
    },
    container: {
        flexDirection: 'row',
        padding: 23,
        justifyContent: 'space-between',
        marginEnd: 200,
    },
    itens: {
        paddingStart: 23,
        paddingTop: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    scrollContainer: {
        maxHeight: 400,
        flex: 0,
    },
    label: {    
        fontSize: 18,
        fontWeight: 'bold',
    },
    labelQtde: {
        fontSize: 18,
        fontWeight: 'bold',
        marginStart: 210,
    },
    labelValor: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemNome: {
        flex: 2,
        fontSize: 18,
    },
    itemQtde: {
        flex: 1,
        fontSize: 18,
        marginStart: 150,
    },
    itemValor: {
        flex: 1,
        fontSize: 18,
        marginEnd: 200,
    },
    botaoFinalizar: {
        backgroundColor: '#CD0707',
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 5,
    },
    botaoCod: {
        backgroundColor: 'black',
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
    total: {
        width: 410,
        fontSize: 18,
    },
    barraInferior: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginEnd: 200,
    },
    successMessage: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        backgroundColor: '#3d9467',
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

  export default ContaMesa;
  