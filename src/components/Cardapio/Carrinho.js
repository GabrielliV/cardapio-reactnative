import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Cardapio from './Cardapio';
import { CarrinhoContext } from '../../context/CarrinhoContext';
import { AppContext } from '../../context/AppContext';
import { solicitarPedido } from '../../services/Pedidos';

const Carrinho = () => {
    const { carrinho, incrementarItem, decrementarItem } = useContext(CarrinhoContext);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const appInfo = useContext(AppContext);
    const [inputCod, setInputCod] = useState("");
    const [inputObs, setInputObs] = useState("");
    const [total, setTotal] = useState(0);

    const handlePedido = () => {
        if (inputCod.trim() == "") {
            return;
        }

        const itensParaPedido = carrinho.map(item => ({
            produtoId: item.id,
            qtde: item.quantidade
        }));

        solicitarPedido(appInfo.mesaIdApp, inputCod, inputObs, itensParaPedido);
    };

    const showAndHideMessage = (message) => {
        setShowSuccessMessage(message);
        setTimeout(() => {
          setShowSuccessMessage('');
        }, 3000); // 3000 milissegundos = 3 segundos
    };

    const ItemQuantidade = ({ quantidade, incrementarItem, decrementarItem }) => {
        return (
          <View style={styles.containerQuantidade}>
            <TouchableOpacity style={styles.botaoQuantidade} onPress={decrementarItem}>
              <Text style={styles.textoQtde}>-</Text>
            </TouchableOpacity>
            <Text style={styles.textoQuantidade}>{quantidade}</Text>
            <TouchableOpacity style={styles.botaoQuantidade} onPress={incrementarItem}>
              <Text style={styles.textoQtde}>+</Text>
            </TouchableOpacity>
          </View>
        );
      };

    useEffect(() => {
        let novoTotal = 0;
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            novoTotal += subtotal;
        });
        setTotal(novoTotal);
    }, [carrinho]);

    return (   
        <Cardapio>
            <View style={styles.container}>
                 <View style={styles.cabecalho}>
                    <Text style={styles.labelDireita}>PRODUTO</Text>
                    <Text style={styles.label}>VALOR UNITÁRIO</Text>
                    <Text style={styles.label}>QTDE</Text>
                </View>
            </View>
            <View style={styles.scrollContainer}>
                <FlatList
                    data={carrinho}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemCarrinho}>
                            <Text style={styles.itemNome}>{item.nome}</Text>                             
                                <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
                                <ItemQuantidade
                                    quantidade={item.quantidade}
                                    incrementarItem={() => incrementarItem(item.id)}
                                    decrementarItem={() => decrementarItem(item.id)}
                                /> 
                        </View>
                    )}
                />
            </View>
            
            <View style={styles.containerInferior}>
                <View style={styles.containerInferiorE}>
                    <View style={styles.containerCod}>
                        <Text style={styles.cod}>Cód.</Text>
                        <TextInput
                            style={styles.codInput}
                            value={inputCod}
                            onChangeText={setInputCod}
                        />                
                    </View>
                    <View style={styles.containerObs}>
                        <Text>* Inclua seu código de acesso da comanda</Text>
                        <Text style={styles.obs}>Observação</Text>
                        <TextInput
                            style={styles.obsInput}
                            value={inputObs}
                            onChangeText={setInputObs}
                        />
                    </View>
                </View>
                <View style={styles.containerInferiorD}>
                    <Text style={styles.total}>Total: R$ {total.toFixed(2).replace('.', ',')}</Text>
                    <TouchableOpacity style={styles.botaoPedir} onPress={handlePedido}>
                        <Text style={styles.textoBotao}>PEDIR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Cardapio>
    )
};

const styles = StyleSheet.create({
    container: {   
        backgroundColor: 'black', 
        borderRadius: 5,
    },
    cabecalho: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        marginLeft: 30,
    },
    labelDireita: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 380,
    },
    label: {    
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 150,
    },
    scrollContainer: {
        marginTop: 5,
        borderRadius: 5,
        height: 340,
        maxHeight: 340,
        backgroundColor: 'black',
    },
    itemCarrinho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: 38,
        paddingTop: 14,
        marginEnd: 50,
    },
    itemNome: {
        width: 480,
        fontSize: 18,
        color: 'white',
    },
    containerQuantidade: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemPreco: {
        flex: 1,
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        marginEnd: 45,
    },
    itemQuantidade: {
        marginHorizontal: 30,
        fontSize: 18,
        color: 'white',
        textAlign: 'center', 
    },
    botaoQuantidade: {
        backgroundColor: '#DCDCDC',
        paddingHorizontal: 20,
        borderRadius: 5,
        margin: 5,
    },
    textoQtde: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textoQuantidade: {
        color: 'white',
        fontSize: 18,
        marginHorizontal: 10,
    },
    containerInferior: {
        flex: 1,
        flexDirection: 'row',
    },
    containerInferiorE: {
        height: 500,
        width: 600,
    },
    containerInferiorD: {
        height: 500,
        width: 400,
        flexDirection: 'column',
    },
    containerCod: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    cod: {
        marginTop: 15,
        fontSize: 18,
        marginRight: 10,
        fontWeight: 'bold',
    },
    codInput: {
        marginTop: 10,
        width: 220,
        height: 38,
        fontSize: 18,
        padding: 8,
        borderRadius: 5,    
        backgroundColor: 'black',
        marginEnd: 8,
        color: 'white',
    },
    containerObs: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    obs: {
        marginTop: 25,
        fontSize: 18,
        marginRight: 10,
        fontWeight: 'bold',
    },
    obsInput: {
        marginTop: 10,
        width: 450,
        height: 100,
        fontSize: 16,
        padding: 8,
        borderRadius: 5,    
        backgroundColor: 'black',
        marginEnd: 8,
        color: 'white',
    },
    total: {
        fontSize: 18,
        marginLeft: 30,
        marginTop: 140,
        fontWeight: 'bold',
    },
    botaoPedir: {
        backgroundColor: '#3d9467',
        marginLeft: 30,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 240,
        
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}); 


export default Carrinho;