import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, Keyboard } from 'react-native';
import Cardapio from './Cardapio';
import { CarrinhoContext } from '../../context/CarrinhoContext';
import { AppContext } from '../../context/AppContext';
import { solicitarPedido } from '../../services/Pedidos';
import { Button } from 'react-native-elements';
import { useNavigate } from 'react-router-native';

const Carrinho = () => {
    const { carrinho, incrementarItem, decrementarItem, limparCarrinho } = useContext(CarrinhoContext);
    const appInfo = useContext(AppContext);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");    
    const [inputCod, setInputCod] = useState("");
    const [inputObs, setInputObs] = useState("");
    const [total, setTotal] = useState(0);
    const [isPedidoEnabled, setIsPedidoEnabled] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (modalVisible) {
            setModalVisible(false);
            handlePedido();
        } else {
            setModalVisible(true);
        }
    };

    const handlePedido = async () => {
        if (inputCod.trim() === "") {
            setModalVisible(true);
            setErrorMessage('Informe o código.');
        } else {
            const itensParaPedido = carrinho.map(item => ({
                produtoId: item.id,
                qtde: item.quantidade
            }));
    
            try {
                await solicitarPedido(appInfo.mesaIdApp, inputCod, inputObs, itensParaPedido);
    
                limparCarrinho();
                setShowSuccessMessage('Pedido finalizado com sucesso 😎');
    
                setTimeout(() => {                
                    navigate("/listaProdutos/1");
                }, 3000);
            } catch (error) {
                console.error("Erro ao solicitar o pedido:", error);
            }
        }        
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

        setIsPedidoEnabled(carrinho.length > 0);        
    }, [carrinho]);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setIsKeyboardOpen(true);
          }
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setIsKeyboardOpen(false);
          }
        );
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []); 

    return (   
        <Cardapio>
            <View style={[styles.container, (modalVisible || showSuccessMessage.length > 0) && { backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}>
                <View style={styles.cabecalho}>
                    <Text style={styles.labelDireita}>PRODUTO</Text>
                    <Text style={styles.label}>VALOR UNITÁRIO</Text>
                    <Text style={styles.label}>QTDE</Text>
                </View>
            </View>
            <View style={[styles.scrollContainer, (modalVisible || showSuccessMessage.length > 0) && { backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}>
                <FlatList
                    data={carrinho}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyCartContainer}>
                            <Text style={styles.emptyCartText}>O carrinho está vazio &#128577;</Text>
                        </View>
                    )}
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Informe o código da comanda: </Text>
                        <TextInput
                            style={styles.codInput}
                            value={inputCod}
                            onChangeText={setInputCod}
                            placeholder={errorMessage}
                            placeholderTextColor="red"
                        />    
                        <View style={styles.modalContainerButton}>                    
                            <Button
                                title="Cancelar"
                                onPress={() => setModalVisible(false)}
                                buttonStyle={styles.modalButton}
                            />
                            <Button
                                title="Pedir"
                                onPress={handleNavigate}
                                buttonStyle={styles.modalButton}
                                disabled={!isPedidoEnabled}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            {isKeyboardOpen && (
            <View style={styles.obsTecladoAberto}>
                <TextInput
                style={styles.textoObsTecladoAberto}
                onChangeText={setInputObs}
                value={inputObs}
                />
            </View>
            )}
            <View style={styles.containerInferior}>
                <View style={styles.containerObs}>
                    <Text style={styles.obs}>Observação do pedido:</Text>
                    <TextInput
                        style={[styles.obsInput, (modalVisible || showSuccessMessage.length > 0) && { backgroundColor: 'rgba(0, 0, 0, 0.8)'}]}
                        value={inputObs}
                        onChangeText={setInputObs}
                        multiline={true} 
                        numberOfLines={4}
                        onPressIn={() => setIsKeyboardOpen(true)}
                    />
                </View>               
                <View style={styles.containerInferiorFinalizar}>
                    <Text style={styles.total}>Total: R$ {total.toFixed(2).replace('.', ',')}</Text>
                    <TouchableOpacity
                        style={styles.botaoPedir}
                        onPress={handleNavigate}
                        disabled={!isPedidoEnabled}
                    >
                        <Text style={styles.textoBotao}>PEDIR</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showSuccessMessage && (
                <View style={styles.successMessage}>
                    <Text style={styles.successText}>{showSuccessMessage}</Text>
                </View>
            )}
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
        height: 420,
        maxHeight: 420,
        backgroundColor: 'black',
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 180,
    },
    emptyCartText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
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
    obsTecladoAberto: {
        position: 'absolute',
        backgroundColor: '#DCDCDC',
        bottom: 2,
        left: 30,
        right: 30,
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoObsTecladoAberto: {
        color: 'black',
        fontSize: 18,
    },
    containerInferior: {
        flex: 1,
        flexDirection: 'row',
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
    containerInferiorFinalizar: {
        top: 50,
        start: 230,
    },
    total: {
        fontSize: 18,
        marginLeft: 30,
        marginTop: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },
    botaoPedir: {
        backgroundColor: '#3d9467',
        marginLeft: 30,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 240,
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContainerButton: {
        flexDirection: 'row',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButton: {
        marginTop: 10,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        backgroundColor: '#3d9467',
    },
    codInput: {
        width: 220,
        height: 38,
        fontSize: 18,
        padding: 8,
        borderRadius: 5,    
        backgroundColor: 'black',
        marginEnd: 8,
        color: 'white',
        marginBottom: 20,
    },
    successMessage: {
        position: 'absolute',
        backgroundColor: '#3d9467',
        bottom: 350,
        left: 200,
        right: 200,
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
}); 


export default Carrinho;