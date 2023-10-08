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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.itens}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.itemTexto}>{item.nome}</Text>                
                        <Text style={styles.itemTexto}>{item.qtde}</Text>      
                        <Text style={styles.itemTexto}>R$ {typeof item.valor === 'number' ? item.valor.toFixed(2).replace('.', ',') : '0,00'}</Text>      
                    </View>          
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
                            navigate("/mesas")
                        })
                    }}
                    >
                    <Text style={styles.textoBotao}>Finalizar</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    itens: {
        padding: 23,
        justifyContent: 'space-between',
    },
    scrollContainer: {
        maxHeight: 400,
        flex: 0,
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
    labelQtde: {
        fontSize: 18,
        fontWeight: 'bold',
        marginStart: 150,
    },
    itemTexto: {
        fontSize: 18,
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
    }
  });

  export default ContaCod;
  