import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useParams } from 'react-router-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';
import { listarPedidoCod } from '../../services/Pedidos';
import { finalizarContaCod } from '../../services/Conta';

const ContaCod = () => {
    const navigate = useNavigate();
    const { cod } = useParams();
    const [listConta, setListConta] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const listaConta = () => {
        listarPedidoCod(cod)
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
        <View style={styles.containerCod}>
            <Text style={styles.label}>Cód. {listConta.cod}</Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.label}>PRODUTO</Text>
            <Text style={styles.labelQtde}>QTDE</Text>
            <Text style={styles.label}>VALOR UNITÁRIO</Text>
        </View>
        <View style={styles.scrollContainer}>
            <FlatList
                data={listConta.itensDto}
                keyExtractor={(item) => item.itemId}
                renderItem={({ item }) => (
                <View style={styles.itens}>
                    <Text style={styles.itemTexto}>{item.nome}</Text>                
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
                <TouchableOpacity style={styles.botaoFinalizar}
                    onPress={() => {
                        finalizarContaCod(cod).then(() => {
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
    containerCod: {
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
    scrollContainer: {
        maxHeight: 400,
        flex: 0,
    },
    itens: {
        paddingStart: 23,
        paddingTop: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    itemTexto: {
        fontSize: 18,
        flex: 2,
    },
    itemQtde: {
        fontSize: 18,
        flex: 1,
    },  
    itemValor: {
        fontSize: 18,
        flex: 1,
        marginEnd: 150,
    },  
    label: {    
        fontSize: 18,
        fontWeight: 'bold',
    },
    labelQtde: {
        fontSize: 18,
        fontWeight: 'bold',
        marginStart: 150,
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
    total: {
        fontSize: 18,
    },
    barraInferior: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginEnd: 200,
    },
    successMessage: {
        position: 'absolute',
        bottom: 10,
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

  export default ContaCod;
  